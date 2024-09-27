import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { jsxRenderer } from "hono/jsx-renderer";

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props: { title: string }): Response;
  }
}

export const renderer = jsxRenderer(
  ({ children, title }) => {
    const fullTitle = ["Quickr", title].filter(Boolean).join(" ");

    return (
      <html>
        <head>
          <title>{fullTitle}</title>
          <link href="/static/style.css" rel="stylesheet" />
        </head>
        <body>
          <Theme>{children}</Theme>
        </body>
      </html>
    );
  },
  { stream: true }
);
