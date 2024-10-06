import "@mantine/core/styles.css"

import { ColorSchemeScript, createTheme, DEFAULT_THEME, MantineProvider } from "@mantine/core"
import { LinksFunction } from "@remix-run/cloudflare"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
]

const theme = createTheme({
  fontFamily: `Inter, sans-serif`,
  fontFamilyMonospace: `Monaco, Courier, monospace`,
  headings: {
    fontFamily: `Inter, ${DEFAULT_THEME.fontFamily}`,
  },
  defaultRadius: "xl",
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
        <MantineProvider theme={theme}>{children}</MantineProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
