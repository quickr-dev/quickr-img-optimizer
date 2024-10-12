import { getAuth } from "@clerk/remix/ssr.server"
import { LoaderFunction } from "@remix-run/cloudflare"
import { Outlet, redirect, useLocation, useNavigate } from "@remix-run/react"

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args)

  if (!userId) return redirect("/sign-in")

  return { yourData: "here" }
}

export default function Layout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <>
      <Outlet />
    </>
  )
}

{
  /* <Tabs
    orientation="vertical"
    variant="pills"
    defaultValue="home"
    mih="60vh"
    value={pathname}
    onChange={(value) => navigate(value!)}
  >
    <Tabs.List mr={60} w={200}>
      <Tabs.Tab py="md" px="lg" value="/dashboard">
        Home
      </Tabs.Tab>
      <Tabs.Tab py="md" px="lg" value="/dashboard/analytics">
        Analytics
      </Tabs.Tab>
    </Tabs.List>

    <Container size="sm" ml={0}>
      <Outlet />
    </Container>
  </Tabs> */
}
