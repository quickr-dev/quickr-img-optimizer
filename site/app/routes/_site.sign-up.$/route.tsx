import { SignUp } from "@clerk/remix"
import { Stack } from "@mantine/core"

export default function Page() {
  return (
    <Stack align={"center"} justify={"center"}>
      <SignUp />
    </Stack>
  )
}
