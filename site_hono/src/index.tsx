import { Button } from "@radix-ui/themes";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { renderer } from "./renderer";

const app = new Hono();

app.use(logger());
app.use(renderer);

app.get("/", (c) => {
  return c.render(
    <h1>
      Hello!
      <Button>asd</Button>
    </h1>,
    { title: "Dashboard" }
  );
});

export default app;
