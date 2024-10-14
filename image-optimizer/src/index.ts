const INVALID_URL = "Invalid URL, please check the documentation at https://quickr.dev/docs";
const SUBDOMAIN_NOT_FOUND = "Subdomain not found";
const DOMAIN_NOT_ALLOWED = "The image domain is not whitelisted";

export default {
	async fetch(req, env, ctx): Promise<Response> {
		const url = new URL(req.url);
		const imageURL = getImageURL(url);
		if (!imageURL) return new Response(INVALID_URL, { status: 400 });

		// const getSubdomainBySlug = async (slug: string) => {
		// 	return env.DB.prepare("SELECT * FROM Subdomain WHERE slug = ?").bind(slug).first<Subdomain>()
		// }

		// if (slug !== "quickr") {
		// 	const subdomain = await getSubdomainBySlug(slug)

		// 	if (!subdomain) {
		// 		return new Response(SUBDOMAIN_NOT_FOUND, { status: 404 })
		// 	}

		// 	if (!isImgFromAllowedDomain(imageURL, subdomain.imageDomains)) {
		// 		return new Response(DOMAIN_NOT_ALLOWED, { status: 403 })
		// 	}

		// 	ctx.waitUntil(
		// 		new Promise(async (resolve) => {
		// 			const existingTransformation = await env.DB.prepare(
		// 				"SELECT id FROM Transformation WHERE customerId = ? AND pathname = ? AND billablePeriod = strftime('%Y-%m', 'now')"
		// 			)
		// 				.bind(subdomain.id, url.pathname)
		// 				.first<{ id: string }>()

		// 			if (existingTransformation) {
		// 				return resolve(null)
		// 			}

		// 			await Promise.all([
		// 				env.DB.prepare("INSERT OR IGNORE INTO Transformation(customerId, pathname) VALUES(?, ?)")
		// 					.bind(subdomain.id, url.pathname)
		// 					.run(),
		// 				env.DB.prepare("UPDATE Customer SET remainingQuota = remainingQuota - 1 WHERE id = ?")
		// 					.bind(subdomain.id)
		// 					.run(),
		// 			])

		// 			resolve(null)
		// 		})
		// 	)
		// }

		const options = { cf: { image: getTransformations(url, req.headers.get("Accept")) } };

		return fetch(new Request(imageURL, { headers: req.headers }), options);
	},
} satisfies ExportedHandler<Env>;

export function getTransformations(url: URL, accept?: string | null) {
	const [, transfString] = url.pathname.split("/");

	const transf: RequestInitCfPropertiesImage = transfString.split(",").reduce<Record<string, string>>((acc, pair) => {
		const [key, value] = pair.split("=").map((part) => decodeURIComponent(part).trim());
		if (!key || !value) return acc;

		acc[key] = value;
		return acc;
	}, {});

	if (transf.format) transf.format = transf.format;
	else if (accept?.includes("avif")) transf.format = "avif";
	else if (accept?.includes("webp")) transf.format = "webp";

	return transf;
}

export function getImageURL(url: URL) {
	const parts = url.pathname.split("/");
	const imageURL = parts.slice(2).join("/");

	if (imageURL.startsWith("http")) return imageURL;

	return null;
}

export function getSlug(url: URL) {
	const subdomain = url.hostname.split(".")[0];
	const slug = subdomain.split("-")[0];
	return slug;
}

export function isImgFromAllowedDomain(imageURL: string, imageDomains?: string): boolean {
	const domains = (imageDomains || "").split(/\s+/).filter(Boolean);
	if (domains.length === 0) return false;

	const imgDomain = new URL(imageURL).hostname;

	return domains.some((domain) => imgDomain.endsWith(domain));
}
