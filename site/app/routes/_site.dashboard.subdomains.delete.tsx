import { getAuth } from "@clerk/remix/ssr.server"
import type { ActionFunctionArgs } from "@remix-run/cloudflare"
import { redirect } from "@remix-run/react"
import { getCustomer } from "~/db/getCustomer"

export const action = async (args: ActionFunctionArgs) => {
  const { userId } = await getAuth(args)
  const formData = await args.request.formData()

  const { DB } = args.context.cloudflare.env
  const customer = await getCustomer(DB, userId!)

  await DB.prepare(`DELETE FROM Subdomain WHERE customerId = ? and id = ?`)
    .bind(customer.id, formData.get("id"))
    .run()

  return redirect("/dashboard")
}
