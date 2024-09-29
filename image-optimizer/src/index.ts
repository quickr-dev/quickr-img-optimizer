export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url)
		const parts = url.pathname.split("/")
		const imageURL = parts.slice(2).join("/")
		const { hostname, pathname } = new URL(imageURL)

		if (!imageURL) {
			return new Response("Malformed URL. Check the documentation", { status: 200 })
		} else if (imageURL.includes("img.quickr.dev")) {
			return new Response("Malformed URL. Check the documentation", { status: 200 })
		}

		const opts = parts[1] === "" ? {} : formatOpts(parts[1])

		const options: any = {
			cf: { image: opts },
		}

		const accept = request.headers.get("Accept")
		if (!accept) {
		} else if (/image\/avif/.test(accept)) {
			options.cf.image.format = "avif"
		} else if (/image\/webp/.test(accept)) {
			options.cf.image.format = "webp"
		}
		const imageRequest = new Request(imageURL, {
			headers: request.headers,
		})

		return fetch(imageRequest, options)
	},
} satisfies ExportedHandler<Env>

function formatOpts(str: string) {
	const obj = str.split(",").reduce<Record<string, string>>((acc, pair) => {
		const [key, value] = pair.split("=").map((part) => decodeURIComponent(part).trim())
		acc[key] = value

		return acc
	}, {})
	return obj
}
