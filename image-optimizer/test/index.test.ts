// test/index.spec.ts
import { describe, expect, it } from "vitest"
import { getImageURL, getTransformations } from "../src/index"

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
// const IncomingRequest = Request<unknown, IncomingRequestCfProperties>

const URL_WITH_TRANSFORM = "https://customer.quickr.dev/width=400/https://example.com/image.png"
const URL_WITHOUT_TRANSFORM = "https://customer.quickr.dev//https://example.com/image.png"
const URL_WITH_TRANSFORM_COMPLEX =
	"https://customer.quickr.dev/width=400,fit=scale-down , format=avif,height%20=300/https://example.com/image.png"
const INVALID_IMAGE_URL = "https://customer.quickr.dev//image.png"
const INVALID_PARAMS_URL = "https://customer.quickr.dev/https://example.com/image.png"
const DOMAIN_URL = "https://customer.quickr.dev"

const url = (url: string) => new URL(url)

describe("getTransformations", () => {
	it("gets transformations", async () => {
		expect(getTransformations(url(URL_WITH_TRANSFORM), "")).toEqual({ width: "400" })
	})

	it("gets complex edge cased transformations", async () => {
		const u = url(URL_WITH_TRANSFORM_COMPLEX)
		expect(getTransformations(u, "")).toEqual({ fit: "scale-down", format: "avif", height: "300", width: "400" })
	})

	it("handles empty transformations", async () => {
		expect(getTransformations(url(URL_WITHOUT_TRANSFORM), "")).toEqual({})
	})

	it("handles edge cases", async () => {
		expect(getTransformations(url(INVALID_IMAGE_URL), "")).toEqual({})
		expect(getTransformations(url(INVALID_PARAMS_URL), "")).toEqual({})
		expect(getTransformations(url(DOMAIN_URL), "")).toEqual({})
	})

	it("formats as avif/webp if accepted, prioritises avif", async () => {
		expect(getTransformations(url(URL_WITHOUT_TRANSFORM), "image/avif")).toEqual({ format: "avif" })
		expect(getTransformations(url(URL_WITHOUT_TRANSFORM), "image/webp")).toEqual({ format: "webp" })
		expect(getTransformations(url(URL_WITHOUT_TRANSFORM), "image/webp,image/avif")).toEqual({ format: "avif" })
	})
})

describe("getImageURL", () => {
	it("gets", async () => {
		expect(getImageURL(url(URL_WITH_TRANSFORM))).toEqual("https://example.com/image.png")
		expect(getImageURL(url(URL_WITHOUT_TRANSFORM))).toEqual("https://example.com/image.png")
		expect(getImageURL(url(URL_WITH_TRANSFORM_COMPLEX))).toEqual("https://example.com/image.png")
		expect(getImageURL(url(INVALID_IMAGE_URL))).toEqual(null)
		expect(getImageURL(url(INVALID_PARAMS_URL))).toEqual(null)
		expect(getImageURL(url(DOMAIN_URL))).toEqual(null)
	})
})

// describe("Hello World worker", () => {
// 	it("responds with Hello World! (unit style)", async () => {
// 		const request = new IncomingRequest("http://example.com")
// 		// Create an empty context to pass to `worker.fetch()`.
// 		const ctx = createExecutionContext()
// 		const response = await worker.fetch(request, env, ctx)
// 		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
// 		await waitOnExecutionContext(ctx)
// 		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`)
// 	})

// 	it("responds with Hello World! (integration style)", async () => {
// 		const response = await SELF.fetch("https://example.com")
// 		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`)
// 	})
// })
