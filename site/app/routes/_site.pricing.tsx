import { Box, Card, Container, List, SimpleGrid, Text, Title } from "@mantine/core"
import { MetaFunction } from "@remix-run/cloudflare"
import { IconCheck } from "@tabler/icons-react"
import { pageTitle } from "~/lib/pageTitle"

export const meta: MetaFunction = () => {
  return [pageTitle("Pricing")]
}

export default function Index() {
  return (
    <>
      <Box ta="center" mb={60}>
        <Title>Pricing</Title>
        <Text mt="md">Start for free, then pay as you go</Text>
      </Box>

      <Container size="sm" mx="auto">
        <SimpleGrid cols={{ xs: 1, md: 2 }}>
          <Card withBorder p="xl">
            <Box ta="center">
              <Text fz="xl" mb="xl">
                Free
              </Text>
              <Text fz={32}>$0 / mo</Text>
              <Text mb="xl" fz="sm">
                100 transformations per month
              </Text>
              <Text>Get started in less than a minute</Text>
            </Box>
            <List>
              <List.Item icon={<IconCheck size={18} />}>E-mail support</List.Item>
            </List>
          </Card>
        </SimpleGrid>
      </Container>
    </>
  )
}
