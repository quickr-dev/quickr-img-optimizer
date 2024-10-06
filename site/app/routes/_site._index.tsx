import type { MetaFunction } from "@remix-run/cloudflare"

export const meta: MetaFunction = () => {
  return [{ title: "Quickr" }, { name: "description", content: "Dev tools" }]
}

export default function Index() {
  return (
    <>
      <div>Home</div>
    </>
  )
}
