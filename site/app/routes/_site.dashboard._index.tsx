import { getAuth } from "@clerk/remix/ssr.server"
import { ActionIcon, Button, Card, Container, Flex, Menu, Stack, Table, Text, Title } from "@mantine/core"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare"
import { json, useLoaderData } from "@remix-run/react"
import { IconDots, IconPlus, IconTrash } from "@tabler/icons-react"
import { A } from "~/components/ui/A"

export const meta: MetaFunction = () => {
  return [{ title: "Dashboard | Quickr" }]
}

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await getAuth(args)
  const { DB } = args.context.cloudflare.env

  const subdomains = await DB.prepare(
    `SELECT Subdomain.* FROM Subdomain
    INNER JOIN Customer ON Subdomain.customerId = Customer.id
    WHERE Customer.userId = ?
    ORDER BY Subdomain.slug ASC`
  )
    .bind(userId)
    .all<Subdomain>()

  return json({ subdomains: subdomains.results })
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

        <Button
          size="xs"
          ml="auto"
          leftSection={<IconPlus size={14} />}
          component={A}
          to="/dashboard/subdomains/new"
        >
          Add Subdomain
        </Button>
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
              <Table.Th>Created</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {subdomains.map((subdomain) => (
              <Table.Tr key={subdomain.id}>
                <Table.Td>{subdomain.slug}</Table.Td>
                <Table.Td>{subdomain.imageDomains}</Table.Td>
                <Table.Td>{subdomain.createdAt}</Table.Td>
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
