import { Container } from "@mantine/core"
import { MetaFunction } from "@remix-run/cloudflare"
import React from "react"

export const meta: MetaFunction = () => {
  return [{ title: "Pricing | Quickr" }]
}

export default function Index() {
  return (
    <main>
      <Container size="md" mt={60}>
        Pricing
      </Container>
    </main>
  )
}
