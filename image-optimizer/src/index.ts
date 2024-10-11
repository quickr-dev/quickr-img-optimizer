export const INVALID_URL = "Invalid URL. Please, check the documentation."
export const INVALID_CUSTOMER = "Invalid subdomain. Please, check the documentation."
export const DOMAIN_NOT_ALLOWED = "The image domain is not whitelisted."

export default {
	async fetch(req, env, ctx): Promise<Response> {
		const url = new URL(req.url)
		const imageURL = getImageURL(url)
		if (!imageURL) return new Response(INVALID_URL, { status: 400 })

		const customerSlug = getCustomerSlug(url)

		if (customerSlug !== "quickr-cdn") {
			const customer = await env.DB.prepare("SELECT id, allowedDomains, remainingQuota FROM Customer WHERE slug = ?")
				.bind(customerSlug)
				.first<{ allowedDomains: string; quota: number; id: string }>()

			if (!customer) {
				return new Response(INVALID_CUSTOMER, { status: 404 })
			}

			if (!isImgFromAllowedDomain(imageURL, customer.allowedDomains)) {
				return new Response(DOMAIN_NOT_ALLOWED, { status: 403 })
			}

			ctx.waitUntil(
				new Promise(async (resolve) => {
					const existingTransformation = await env.DB.prepare(
						"SELECT id FROM Transformation WHERE customerId = ? AND pathname = ? AND billablePeriod = strftime('%Y-%m', 'now')"
					)
						.bind(customer.id, url.pathname)
						.first<{ id: string }>()

					if (existingTransformation) {
						return resolve(null)
					}

					await Promise.all([
						env.DB.prepare("INSERT OR IGNORE INTO Transformation(customerId, pathname) VALUES(?, ?)")
							.bind(customer.id, url.pathname)
							.run(),
						env.DB.prepare("UPDATE Customer SET remainingQuota = remainingQuota - 1 WHERE id = ?")
							.bind(customer.id)
							.run(),
					])

					resolve(null)
				})
			)
		}

		const options = { cf: { image: getTransformations(url, req.headers.get("Accept")) } }

		return fetch(new Request(imageURL, { headers: req.headers }), options)
	},
} satisfies ExportedHandler<Env>

export function getTransformations(url: URL, accept?: string | null) {
	const [, transfString] = url.pathname.split("/")

	const transf: RequestInitCfPropertiesImage = transfString.split(",").reduce<Record<string, string>>((acc, pair) => {
		const [key, value] = pair.split("=").map((part) => decodeURIComponent(part).trim())
		if (!key || !value) return acc

		acc[key] = value
		return acc
	}, {})

	if (accept?.includes("avif")) transf.format = "avif"
	else if (accept?.includes("webp")) transf.format = "webp"

	return transf
}

export function getImageURL(url: URL) {
	const parts = url.pathname.split("/")
	const imageURL = parts.slice(2).join("/")

	if (imageURL.startsWith("http")) return imageURL

	return null
}

export function getCustomerSlug(url: URL) {
	return url.hostname.split(".")[0]
}

export function isImgFromAllowedDomain(imageURL: string, allowedDomains?: string): boolean {
	if (!allowedDomains) return false

	const imgDomain = new URL(imageURL).hostname

	return allowedDomains.includes(imgDomain)
}
