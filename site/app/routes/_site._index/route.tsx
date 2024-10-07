import { Box, Button, Code, Container, Flex, Progress, SimpleGrid, Space, Text, Title } from "@mantine/core"
import { TrySection } from "./TrySection"

export default function Index() {
  return (
    <main>
      <Box role="hero" my={100} ta="center" w="fit-content" mx="auto">
        {/* <Text fz={"md"} c="gray.6" mt="lg">
          Quickr: fair-priced, productivity-focused dev tooling
        </Text> */}

        <Title fz={60} fw={700}>
          Quickr Images
          {/* <br />
          <span
            style={{
              background:
                "-webkit-linear-gradient(45deg, var(--mantine-color-violet-3), var(--mantine-color-violet-9),var(--mantine-color-violet-3) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Lightning fast
          </span> */}
        </Title>

        <Text fz={"xl"} c="gray.6" mt="lg">
          Lightning fast image optimization, transformation, and global CDN
          <br />
          for productivity-focused development teams.
        </Text>

        <Flex mt={"xl"} gap="lg" justify="center">
          <Button>Start for free</Button>
          <Button variant="outline">How it works</Button>
        </Flex>
        {/* <Text fz="xs" c="gray.6" mt="xs" mr={150}>
          999 free images per month
        </Text> */}
      </Box>

      <Container>
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

            <img src={"/images/example.jpeg"} width={400} height={400} style={{ objectFit: "cover" }} />
          </Flex>

          <Flex align="center" justify="center" direction="column">
            <Text fw={500} ta="center" fz="lg" mb="xs">
              Optimized
            </Text>
            <Code mb="xs">{'<img src="https://img.quickr.dev/width=400/img.jpg" />'}</Code>
            <Progress.Root size="xl" mb="md" w="100%" maw={400}>
              <Progress.Section value={2}></Progress.Section>
              <Progress.Section value={98} color="none">
                <Progress.Label c="black">50.3 KB</Progress.Label>
              </Progress.Section>
            </Progress.Root>
            <img
              src={`https://img.quickr.dev/width=500,quality=75/https://weleverimages.blob.core.windows.net/app-images/9f28732a-6fd8-469f-ba43-407ceac92c39-12jpg`}
              width={400}
              height={400}
              style={{ objectFit: "cover" }}
            />
          </Flex>
        </SimpleGrid>
      </Container>

      <Space h={60} />

      <TrySection />
    </main>
  )
}
