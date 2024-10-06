import { Button, Card, Container, Flex, SimpleGrid } from "@mantine/core"
import { Outlet } from "@remix-run/react"
import { A } from "~/components/ui/A"

export default function Layout() {
  return (
    <>
      <Container component="header">
        <SimpleGrid cols={3} py="sm">
          <A to="/" underline="never" c="black" fw={600} fz="lg">
            Quickr
          </A>

          <Card component="nav" withBorder shadow="xs" p={0}>
            <Flex py="xs" align="center" justify="center" gap="xl">
              <A size="sm" to="/" c="gray.7">
                Home
              </A>
              <A size="sm" to="/" c="gray.7">
                Pricing
              </A>
              <A size="sm" to="/dashboard" c="gray.7">
                Dashboard
              </A>
            </Flex>
          </Card>

          <Flex justify="end">
            <Button variant="default" size="xs">
              Feedback
            </Button>
          </Flex>
        </SimpleGrid>
      </Container>

      <Container component="main" size="sm">
        <Outlet />
      </Container>
    </>
  )
}
