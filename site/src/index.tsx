import { Hono } from 'hono'
import { Layout } from './Layout'

const app = new Hono()

app.use(Layout)

app.get('/', (c) => {
  return c.render(<h1>Hello!</h1>)
})

export default app
