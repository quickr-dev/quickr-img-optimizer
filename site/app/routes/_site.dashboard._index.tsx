import type { MetaFunction } from "@remix-run/cloudflare"

export const meta: MetaFunction = () => {
  return [{ title: "Dashboard | Quickr" }]
}

export default function Page() {
  return (
    <>
      <div>Dashboard</div>
    </>
  )
}
