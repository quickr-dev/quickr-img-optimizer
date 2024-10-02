import { LinksFunction } from "@remix-run/cloudflare"
import styles from "./tailwind.css?url"

import { Link, Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import { Button } from "./components/ui/button"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },

  //   { rel: "preconnect", href: "https://fonts.googleapis.com" },
  //   { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  //   {
  //     rel: "stylesheet",
  //     href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  //   },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <div className="flex">
          <aside className="h-[100vh] w-64 p-4 pb-6 border-r">
            <Link to="/" className="font-bold text-xl text-black">
              Quickr
            </Link>

            <nav className="mt-8">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              </ul>
            </nav>
          </aside>

          <div className="flex-grow">
            <header className="border-b">
              <div className="flex items-center justify-end h-16 py-4 px-8">
                <Button variant="default">Feedback</Button>
              </div>
            </header>

            <main className="h-[calc(100vh_-_64px)] overflow-y-auto">
              <div className="max-w-4xl mx-auto py-6">{children}</div>
            </main>
          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
