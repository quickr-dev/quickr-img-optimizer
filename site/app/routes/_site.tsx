import { Button, Card, Container, Flex, SimpleGrid } from "@mantine/core"
import { Link, Outlet } from "@remix-run/react"

export default function Layout() {
  return (
    <>
      <Container component="header">
        <SimpleGrid cols={3} py="sm">
          <Link to="/" style={{ fontWeight: 400 }}>
            quickr
          </Link>

          <Card withBorder shadow="xs" p={0}>
            <Flex component="nav" align="center" justify="center" gap="md">
              <Link to="/">home</Link>
              <Link to="/dashboard">dashboard</Link>
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
