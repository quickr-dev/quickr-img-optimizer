import { getAuth } from "@clerk/remix/ssr.server"
import {
  ActionIcon,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Menu,
  Modal,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare"
import { Form, json, redirect, useLoaderData } from "@remix-run/react"
import { IconDots, IconPlus, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import { getCustomer } from "~/db/getCustomer"

export const meta: MetaFunction = () => {
  return [{ title: "Dashboard | Quickr" }]
}

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args)
  const { DB } = args.context.cloudflare.env

  const subdomains = await DB.prepare(
    `SELECT Subdomain.* FROM Subdomain
    INNER JOIN Customer ON Subdomain.customerId = Customer.id
    WHERE Customer.userId = ?`
  )
    .bind(userId)
    .all<Subdomain>()

  return json({ subdomains: subdomains.results })
}

export const action = async (args: ActionFunctionArgs) => {
  const { userId } = await getAuth(args)
  const formData = await args.request.formData()

  const { DB } = args.context.cloudflare.env
  const customer = await getCustomer(DB, userId!)
  await DB.prepare(`INSERT OR IGNORE INTO Subdomain(customerId, slug, imageDomains) VALUES (?, ?, ?)`)
    .bind(customer.id, formData.get("subdomain"), formData.get("imageDomains"))
    .run()

  return redirect("/dashboard")
}

const EmptyTable = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <Card withBorder py={100}>
    <Stack align="center" gap="xs">
      <Title order={4}>{title}</Title>
      <Text fz="sm">{subtitle}</Text>
    </Stack>
  </Card>
)

export default function Page() {
  const { subdomains } = useLoaderData<typeof loader>()

  return (
    <Container size="sm">
      <Flex align="center" gap="md" mb="xl">
        <Title order={2}>Subdomains</Title>
        <AddSubdomainButton />
      </Flex>

      {subdomains.length === 0 ? (
        <EmptyTable
          title="No subdomains yet"
          subtitle="Add your first subdomain to start optimizing your images"
        />
      ) : (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Subdomain</Table.Th>
              <Table.Th>Image domains</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {subdomains.map((subdomain) => (
              <Table.Tr key={subdomain.id}>
                <Table.Td>{subdomain.slug}</Table.Td>
                <Table.Td>{subdomain.imageDomains}</Table.Td>
                <Table.Td>
                  <Menu>
                    <Menu.Target>
                      <ActionIcon variant="transparent" size="xs">
                        <IconDots />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
                        Remove
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Container>
  )
}

const AddSubdomainButton = () => {
  const [opened, { open, close }] = useDisclosure()
  const [subdomain, setSubdomain] = useState("")

  return (
    <>
      <Button size="xs" ml="auto" leftSection={<IconPlus size={14} />} onClick={open}>
        Add Subdomain
      </Button>

      <Modal opened={opened} padding="xl" onClose={close} title="Add Subdomain">
        <Form method="post">
          <Stack>
            <TextInput
              name="subdomain"
              label="Choose your subdomain"
              placeholder={"e.g. quickr"}
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
              label="Image domains (one per line)"
              description="Whitelist the hostnames where your images are stored."
              placeholder="your-company.blob.core.windows.net
your-company.s3.amazonaws.com
your-domain.com"
              minRows={3}
              autosize
            />

            <Group gap="sm">
              <Button type="submit">Save</Button>
              <Button variant="subtle" onClick={close}>
                Cancel
              </Button>
            </Group>
          </Stack>
        </Form>
      </Modal>
    </>
  )
}
