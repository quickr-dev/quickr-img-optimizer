import { SignIn } from "@clerk/remix"
import { Stack } from "@mantine/core"
import { MetaFunction } from "@remix-run/cloudflare"
import { pageTitle } from "~/lib/pageTitle"

export const meta: MetaFunction = () => {
  return [pageTitle("Sign in")]
}

export default function Page() {
  return (
    <Stack align={"center"} justify={"center"}>
      <SignIn />
    </Stack>
  )
}
