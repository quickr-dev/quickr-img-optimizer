import { Container } from "@mantine/core"
import { MetaFunction } from "@remix-run/cloudflare"
import { pageTitle } from "~/lib/pageTitle"

export const meta: MetaFunction = () => {
  return [pageTitle("Pricing")]
}

export default function Index() {
  return <Container size="md">Pricing</Container>
}
