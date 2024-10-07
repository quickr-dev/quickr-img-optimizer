import { Container, Tabs, Title } from "@mantine/core"

export const DocsSection = () => {
  return (
    <>
      <Title order={3} ta="center" fz={32} id="docs" mb="xl">
        Docs
      </Title>

      <Container size="xs" mb="xl">
        <Tabs variant="outline" defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab value="gallery" leftSection={<IconPhoto style={iconStyle} />}>
              Gallery
            </Tabs.Tab>
            <Tabs.Tab value="messages" leftSection={<IconMessageCircle style={iconStyle} />}>
              Messages
            </Tabs.Tab>
            <Tabs.Tab value="settings" leftSection={<IconSettings style={iconStyle} />}>
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>

          <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

          <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
        </Tabs>
      </Container>
    </>
  )
}
