import { Container, Tabs, Text } from "@mantine/core"
import { MetaFunction } from "@remix-run/react"

export const meta: MetaFunction = () => {
  return [{ title: "Docs | Quickr" }]
}

export default function Index() {
  return (
    <main>
      <Container size="md" mt={60}>
        <Tabs orientation="vertical" variant="pills" defaultValue="intro" mih="60vh">
          <Tabs.List>
            <Tabs.Tab py="sm" value="intro">
              Introduction
            </Tabs.Tab>
            <Tabs.Tab py="sm" value="nextjs">
              NextJS
            </Tabs.Tab>
            <Tabs.Tab py="sm" value="react">
              React
            </Tabs.Tab>
            <Tabs.Tab py="sm" value="vanilla">
              Vanilla JS
            </Tabs.Tab>
          </Tabs.List>

          <Container size="xs">
            <Tabs.Panel value="intro">
              <Text>
                All you need to do is to load images via https://img.quickr.dev/TRANSFORMATIONS/IMAGE_URL.
              </Text>
              <Text>Examples</Text>
              <Text>Without transformations https://img.quickr.dev//IMAGE_URL</Text>
              <Text>
                With transformations
                https://img.quickr.dev/width=400,quality=75,blur=10/https://example.com/image.png
              </Text>
            </Tabs.Panel>
            <Tabs.Panel value="nextjs">
              Gallery tab contentGallery tab contentGallery tab contentGallery tab contentGallery tab
            </Tabs.Panel>

            <Tabs.Panel value="react">Messages tab content</Tabs.Panel>

            <Tabs.Panel value="vanilla">Settings tab content</Tabs.Panel>
          </Container>
        </Tabs>
      </Container>
    </main>
  )
}
