import { getAuth } from "@clerk/remix/ssr.server"
import {
  Breadcrumbs,
  Button,
  Container,
  Flex,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core"
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/cloudflare"
import { Form, json, redirect, useActionData, useNavigation } from "@remix-run/react"
import { useState } from "react"
import { A } from "~/components/ui/A"
import { getCustomer } from "~/db/getCustomer"

export const meta: MetaFunction = () => {
  return [{ title: "Add Subdomain | Quickr" }]
}

export const action = async (args: ActionFunctionArgs) => {
  const { userId } = await getAuth(args)
  const formData = await args.request.formData()
  const values = Object.fromEntries(formData)

  const { DB } = args.context.cloudflare.env
  const customer = await getCustomer(DB, userId!)
  try {
    await DB.prepare(`INSERT INTO Subdomain(customerId, slug, imageDomains) VALUES (?, ?, ?)`)
      .bind(customer.id, values.subdomain, values.imageDomains)
      .run()
  } catch (e: any) {
    if (e?.message.includes("UNIQUE constraint failed: Subdomain.slug")) {
      return json({ errors: { subdomain: "Subdomain already exists" }, values })
    }
  }

  return redirect("/dashboard")
}

export default function Page() {
  const [subdomain, setSubdomain] = useState("")
  const { errors, values } = useActionData<typeof action>() || {}
  const navigation = useNavigation()

  return (
    <Container size="sm">
      <Breadcrumbs separator="/" fz="xs" mb="md">
        <A fz="xs" to="/dashboard">
          Dashboard
        </A>
        <Text fz="xs">Add Subdomain</Text>
      </Breadcrumbs>

      <Flex align="center" gap="md" mb="xl">
        <Title order={2}>Add Subdomain</Title>
      </Flex>

      <Form method="post">
        <Stack gap="xl">
          <TextInput
            name="subdomain"
            label="Choose your subdomain"
            placeholder={"e.g. quickr"}
            defaultValue={values?.subdomain.toString() || ""}
            error={errors?.subdomain}
            description={
              <>
                Your URL will be <strong>https://{subdomain || "______"}-cdn.quickr.dev</strong>
              </>
            }
            onChange={(e) => setSubdomain(e.target.value)}
            value={subdomain}
            autoFocus
          />

          <Textarea
            name="imageDomains"
            label="Image domains whitelist (one per line)"
            defaultValue={values?.imageDomains.toString() || ""}
            description="List the domains where your images are stored."
            placeholder="your-company.blob.core.windows.net
your-company.s3.amazonaws.com
your-domain.com"
            minRows={3}
            autosize
          />

          <Group gap="sm">
            <Button type="submit" loading={navigation.state === "submitting"}>
              Save
            </Button>
            <Button variant="subtle" component={A} to="/dashboard">
              Cancel
            </Button>
          </Group>
        </Stack>
      </Form>
    </Container>
  )
}
