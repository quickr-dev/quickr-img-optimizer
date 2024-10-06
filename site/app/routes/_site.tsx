import { Box, Button, Card, Container, Flex } from "@mantine/core"
import { Outlet } from "@remix-run/react"
import { A } from "~/components/ui/A"

export default function Layout() {
  return (
    <>
      <Container component="header" mt="md">
        <Flex align="center">
          <Box w="20vw">
            <A to="/" underline="never" c="black" fw={600} fz="lg">
              Quickr
            </A>
          </Box>

          <Flex w="60vw" justify="center">
            <Card component="nav" w="fit-content" px="xl" withBorder shadow="xs" p={0}>
              <Flex py="sm" align="center" justify="center" gap="xl">
                <A size="sm" to="/">
                  Home
                </A>
                <A size="sm" to="/">
                  Pricing
                </A>
                <A size="sm" to="/dashboard">
                  Dashboard
                </A>
              </Flex>
            </Card>
          </Flex>

          <Flex justify="end" align="center" gap="md" w="20vw">
            <A to="/login" size="sm" fw={500}>
              Log in
            </A>
            <Button size="sm">Sign up</Button>
          </Flex>
        </Flex>
      </Container>

      <Container component="main" size="sm">
        <Outlet />
      </Container>
    </>
  )
}
