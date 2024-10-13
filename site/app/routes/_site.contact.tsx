import { Anchor, Box, Text, Title } from "@mantine/core"
import { MetaFunction } from "@remix-run/cloudflare"
import { pageTitle } from "~/lib/pageTitle"

export const meta: MetaFunction = () => {
  return [pageTitle("Pricing")]
}

export default function Index() {
  return (
    <>
      <Box mb={"xl"}>
        <Title>Contact</Title>
      </Box>

      <Text>
        E-mail{" "}
        <Anchor href="mailto:support@quickr.dev" underline="always">
          support@quickr.dev
        </Anchor>{" "}
        for any inquiries.
      </Text>
    </>
  )
}
