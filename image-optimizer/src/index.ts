/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		console.log('>>>', request.url);
		const parts = url.pathname.split('/');
		const imageURL = parts.slice(2).join('/');

		if (!imageURL) {
			return new Response('Malformed URL. Check the documentation', { status: 200 });
		} else if (imageURL.includes('img.quickr.dev')) {
			return new Response('Malformed URL. Check the documentation', { status: 200 });
		}

		const opts = parts[1] === '' ? {} : formatOpts(parts[1]);

		const options: any = {
			cf: { image: opts },
		};

		const accept = request.headers.get('Accept');
		if (!accept) {
		} else if (/image\/avif/.test(accept)) {
			options.cf.image.format = 'avif';
		} else if (/image\/webp/.test(accept)) {
			options.cf.image.format = 'webp';
		}

		// try {
		// TODO: Customize validation logic
		// const { hostname, pathname } = new URL(imageURL)

		// Demo: Only accept "example.com" images
		// if (hostname !== 'example.com') {
		//   return new Response('Must use "example.com" source images', { status: 403 })
		// }
		// } catch (err) {
		//   return new Response('Invalid "image" value', { status: 400 })
		// }

		// Build a request that passes through request headers
		const imageRequest = new Request(imageURL, {
			headers: request.headers,
		});

		// Returning fetch() with resizing options will pass through response with the resized image.
		return fetch(imageRequest, options);
	},
} satisfies ExportedHandler<Env>;

function formatOpts(str: string) {
	const obj = str.split(',').reduce<Record<string, string>>((acc, pair) => {
		const [key, value] = pair.split('=').map((part) => decodeURIComponent(part).trim());
		acc[key] = value;

		return acc;
	}, {});
	return obj;
}
