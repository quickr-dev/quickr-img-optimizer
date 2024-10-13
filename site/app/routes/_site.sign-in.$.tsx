import { SignIn } from "@clerk/remix"
import { Stack } from "@mantine/core"
import { MetaFunction } from "@remix-run/cloudflare"

export const meta: MetaFunction = () => {
  return [{ title: "Sign In | Quickr" }]
}
export default function Page() {
  return (
    <Stack align={"center"} justify={"center"}>
      <SignIn />
    </Stack>
  )
}
