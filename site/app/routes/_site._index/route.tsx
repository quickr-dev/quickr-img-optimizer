import { Box, Button, Code, Flex, Progress, SimpleGrid, Space, Text, Title } from "@mantine/core"
import { MetaFunction } from "@remix-run/cloudflare"
import { A } from "~/components/ui/A"
import { pageTitle } from "~/lib/pageTitle"
import { TrySection } from "./TrySection"

export const meta: MetaFunction = () => {
  return [pageTitle(false)]
}

export default function Index() {
  return (
    <>
      <Box role="hero" my={100} ta="center" w="fit-content" mx="auto">
        <Title fz={60} fw={700}>
          Quickr Images
        </Title>

        <Text fz={"xl"} c="gray.6" mt="lg">
          Lightning fast image optimization, transformation, and global CDN
          <br />
          for productivity-focused teams.
        </Text>

        <Flex mt={"xl"} gap="lg" justify="center">
          <Button radius="xl" component={A} to="/sign-up">
            Start for free *
          </Button>
          <Button radius="xl" variant="outline" component={A} to="/docs">
            How it works
          </Button>
        </Flex>

        <Text mt="xs" fz="sm">
          * Free during beta, then 2x cheaper than Vercel images
        </Text>
      </Box>

      <SimpleGrid cols={{ md: 2, sm: 1 }}>
        <Flex align="center" direction="column">
          <Text fw={500} ta="center" fz="lg" mb="xs">
            Original
          </Text>
          <Code mb="xs">{'<img src="img.jpg" />'}</Code>
          <Progress.Root size="xl" mb="md" w="100%" maw={400}>
            <Progress.Section value={100}>
              <Progress.Label>2.4 MB</Progress.Label>
            </Progress.Section>
          </Progress.Root>

          <img
            src="https://assets.quickr.dev/example.jpeg"
            width={400}
            height={400}
            style={{ objectFit: "cover" }}
          />
        </Flex>

        <Flex align="center" justify="center" direction="column">
          <Text fw={500} ta="center" fz="lg" mb="xs">
            Optimized
          </Text>
          <Code mb="xs">{'<img src="https://quickr-cdn.quickr.dev/width=500/img.jpg" />'}</Code>
          <Progress.Root size="xl" mb="md" w="100%" maw={400}>
            <Progress.Section value={2}></Progress.Section>
            <Progress.Section value={98} color="none">
              <Progress.Label c="black">59.1 KB</Progress.Label>
            </Progress.Section>
          </Progress.Root>
          <img
            src={`https://quickr-cdn.quickr.dev/width=500/https://assets.quickr.dev/example.jpeg`}
            width={400}
            height={400}
            style={{ objectFit: "cover" }}
          />
        </Flex>
      </SimpleGrid>

      <Space h={60} />

      <TrySection />
    </>
  )
}
