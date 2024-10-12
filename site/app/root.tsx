import "@mantine/core/styles.css"
import "@mantine/nprogress/styles.css"

import { ClerkApp } from "@clerk/remix"
import { rootAuthLoader } from "@clerk/remix/ssr.server"
import {
  ColorSchemeScript,
  createTheme,
  DEFAULT_THEME,
  MantineProvider,
  Modal,
  TableTd,
  TableTh,
} from "@mantine/core"
import { usePrevious } from "@mantine/hooks"
import { NavigationProgress, nprogress } from "@mantine/nprogress"
import { LinksFunction, LoaderFunction } from "@remix-run/cloudflare"
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from "@remix-run/react"
import { useEffect, useState } from "react"

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
]

export const loader: LoaderFunction = rootAuthLoader

const theme = createTheme({
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
  spacing: {
    xs: `calc(${4 / 16}rem * var(--mantine-scale))`,
    sm: `calc(${8 / 16}rem * var(--mantine-scale))`,
    md: `calc(${12 / 16}rem * var(--mantine-scale))`,
    lg: `calc(${16 / 16}rem * var(--mantine-scale))`,
    xl: `calc(${24 / 16}rem * var(--mantine-scale))`,
  },
  fontFamily: `Inter, sans-serif`,
  fontFamilyMonospace: `Monaco, Courier, monospace`,
  headings: {
    fontFamily: `Inter, ${DEFAULT_THEME.fontFamily}`,
  },
  defaultRadius: "md",
  primaryColor: "gray",
  primaryShade: 9,
  components: {
    Modal: Modal.extend({
      defaultProps: {
        padding: "xl",
      },
    }),
    TableTh: TableTh.extend({
      defaultProps: {
        px: "md",
        bg: "gray.1",
        fw: 600,
        fz: "xs",
        c: "gray.7",
      },
    }),
    TableTd: TableTd.extend({
      defaultProps: {
        p: "md",
      },
    }),
  },
})

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>

      <body>
        <MantineProvider theme={theme}>
          <Progress />

          {children}
        </MantineProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

function App() {
  return <Outlet />
}

export default ClerkApp(App, {
  signInUrl: "/sign-in",
  signUpUrl: "/sign-up",
  signInFallbackRedirectUrl: "/dashboard",
  signUpFallbackRedirectUrl: "/sign-up-success",
})

const Progress = () => {
  const navigation = useNavigation()
  const prevState = usePrevious(navigation.state)
  const [timeout, setTimeoutVar] = useState<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (prevState === "idle" && navigation.state !== "idle") {
      setTimeoutVar(
        setTimeout(() => {
          nprogress.start()
        }, 800)
      )
    } else if (prevState !== "idle" && navigation.state === "idle") {
      if (timeout) {
        nprogress.complete()
        clearTimeout(timeout)
      }
    }
  }, [navigation.state])

  return <NavigationProgress />
}
