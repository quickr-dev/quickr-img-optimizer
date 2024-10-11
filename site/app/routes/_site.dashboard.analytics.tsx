import type { MetaFunction } from "@remix-run/cloudflare"

export const meta: MetaFunction = () => {
  return [{ title: "Analytics | Quickr" }]
}

export default function Page() {
  return (
    <>
      <div>Analytics</div>
    </>
  )
}
