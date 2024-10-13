import { SignedIn, SignedOut } from "@clerk/remix"
import { getAuth } from "@clerk/remix/ssr.server"
import { Box, Tabs, Text } from "@mantine/core"
import { LoaderFunction, redirect } from "@remix-run/cloudflare"
import { Outlet, useLocation, useNavigate } from "@remix-run/react"

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args)

  if (!userId) return redirect("/sign-in")

  return null
}

export default function Layout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Tabs
      orientation="vertical"
      variant="pills"
      defaultValue="home"
      mih="60vh"
      value={pathname}
      onChange={(value) => navigate(value!)}
    >
      <Tabs.List mr={60} w={200}>
        <Tabs.Tab py="md" px="lg" value="/dashboard">
          Subdomains
        </Tabs.Tab>
      </Tabs.List>

      <Box w="100%">
        <SignedIn>
          <Outlet />
        </SignedIn>
        <SignedOut>
          <Text>You are signed out</Text>
        </SignedOut>
      </Box>
    </Tabs>
  )
}
