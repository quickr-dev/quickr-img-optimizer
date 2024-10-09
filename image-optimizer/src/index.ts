export const ERROR_MSG = "Invalid URL. Please, check the documentation."

export default {
	async fetch(req, env, ctx): Promise<Response> {
		console.log(await env.DB.prepare("SELECT 1").all())
		ctx.waitUntil(
			// Logs, analytics, img size reduction, etc.

			new Promise((resolve) => {
				resolve(0)
			})
		)

		const url = new URL(req.url)
		const imageURL = getImageURL(url)
		if (!imageURL) return new Response(ERROR_MSG, { status: 442 })

		const transformations = getTransformations(url, req.headers.get("Accept"))
		const options = { cf: { image: transformations } }

		const imageRequest = new Request(imageURL, { headers: req.headers })
		return fetch(imageRequest, options)
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
