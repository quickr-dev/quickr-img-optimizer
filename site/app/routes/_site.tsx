import { Box, Button, Card, Container, Divider, Flex } from "@mantine/core"
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
                  Top
                </A>
                <A size="sm" to="#try-it-out">
                  Try
                </A>
                <A size="sm" to="#pricing">
                  Pricing
                </A>
                <A size="sm" to="#about">
                  About
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

      <Outlet />

      <Divider mt={60} />

      <Container size="md" component="footer" my="lg" ta="center">
        <Flex gap="xl" justify="center">
          <A size="sm" to="/">
            Top
          </A>
          <A size="sm" to="#try-it-out">
            Try
          </A>
          <A size="sm" to="#pricing">
            Pricing
          </A>
          <A size="sm" to="#about">
            About
          </A>
        </Flex>
      </Container>
    </>
  )
}
