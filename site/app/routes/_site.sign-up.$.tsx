import { SignUp } from "@clerk/remix"
import { getAuth } from "@clerk/remix/ssr.server"
import { Stack } from "@mantine/core"
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare"

export const meta: MetaFunction = () => {
  return [{ title: "Sign Up | Quickr" }]
}

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args)
  if (userId) {
    const { DB } = args.context.cloudflare.env
    await DB.prepare(`INSERT OR IGNORE INTO Customer(userId) VALUES(?)`).bind(userId).run()
  }

  return null
}

export default function Page() {
  return (
    <Stack align="center" justify="center">
      <SignUp />
    </Stack>
  )
}
