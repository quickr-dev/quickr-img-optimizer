import { Container } from "@mantine/core"
import { MetaFunction } from "@remix-run/cloudflare"

export const meta: MetaFunction = () => {
  return [{ title: "Pricing | Quickr" }]
}

export default function Index() {
  return <Container size="md">Pricing</Container>
}
