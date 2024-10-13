import { SignedIn, SignedOut, UserButton } from "@clerk/remix"
import { Box, Button, Card, Container, Divider, Flex } from "@mantine/core"
import { Outlet } from "@remix-run/react"
import { A } from "~/components/ui/A"

const Links = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
]

export default function Layout() {
  return (
    <>
      <Container component="header" mt="md" mb={60}>
        <Flex align="center">
          <Box w="20vw">
            <A to="/" underline="never" c="black" fw={600} fz="xl">
              Quickr
            </A>
          </Box>

          <Flex w="60vw" justify="center">
            <Card component="nav" w="fit-content" px="xl" withBorder shadow="xs" radius="xl" p={0}>
              <Flex py="sm" align="center" justify="center" gap="xl">
                {Links.map((link) => (
                  <A key={link.href} to={link.href} size="sm">
                    {link.label}
                  </A>
                ))}
              </Flex>
            </Card>
          </Flex>

          <Flex justify="end" align="center" gap="md" w="20vw">
            <SignedIn>
              <Button radius="xl" size="sm" component={A} to="/dashboard">
                Dashboard
              </Button>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <A to="/sign-in" size="sm" fw={500}>
                Log in
              </A>
              <Button radius="xl" size="sm" component={A} to="/sign-up">
                Sign up
              </Button>
            </SignedOut>
          </Flex>
        </Flex>
      </Container>

      <Container component="main" mih={"60vh"}>
        <Outlet />
      </Container>

      <Divider mt={60} />

      <Container component="footer" my="lg" ta="center">
        <Flex gap="xl" justify="center">
          {Links.map((link) => (
            <A key={link.href} to={link.href} size="sm">
              {link.label}
            </A>
          ))}
        </Flex>
      </Container>
    </>
  )
}
