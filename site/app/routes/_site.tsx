import { SignedIn, SignedOut, UserButton } from "@clerk/remix"
import { Box, Button, Card, Container, Divider, Flex, SimpleGrid } from "@mantine/core"
import { Outlet } from "@remix-run/react"
import { A } from "~/components/ui/A"

const Links = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/contact", label: "Contact" },
  // { href: "/pricing", label: "Pricing" },
]

export default function Layout() {
  return (
    <>
      <Container component="header" mt="md" mb={60}>
        <SimpleGrid cols={{ xs: 1, md: 3 }}>
          <Flex align="center" gap="md">
            <A to="/" underline="never" c="black" fw={600} fz="xl">
              Quickr
            </A>
          </Flex>

          <Flex justify="center">
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

          <Flex justify="end" align="center" gap="md">
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
        </SimpleGrid>

        <Flex align="center" gap="sm" w={"fit-content"} mx="auto" mt="lg" fz="sm" c="gray.7">
          Want to use quickr on your project?
          <Button
            component={A}
            to="mailto:hello@quickr.dev"
            size="compact-xs"
            radius="xl"
            style={{
              background:
                "linear-gradient(45deg, var(--mantine-color-violet-9) 50%, var(--mantine-color-violet-3) 100%)",
            }}
          >
            Reach out
          </Button>
        </Flex>
      </Container>

      <Container component="main" mih={"72vh"}>
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

        <Box ta="center" mt="lg">
          <A to="/legal" size="xs" c="dimmed">
            Terms of Use and Privacy Policy
          </A>
        </Box>
      </Container>
    </>
  )
}
