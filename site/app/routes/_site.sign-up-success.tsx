import { getAuth } from "@clerk/remix/ssr.server"
import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare"

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args)
  if (!userId) {
    return redirect("/sign-in")
  }

  const { DB } = args.context.cloudflare.env
  await DB.prepare(`INSERT OR IGNORE INTO Customer(userId) VALUES(?)`).bind(userId).run()

  return redirect("/dashboard")
}
