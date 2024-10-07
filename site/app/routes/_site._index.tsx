import {
  Anchor,
  Box,
  Button,
  Code,
  Container,
  FileButton,
  Flex,
  Input,
  Progress,
  SimpleGrid,
  Slider,
  Space,
  Text,
  Title,
} from "@mantine/core"
import type { MetaFunction } from "@remix-run/cloudflare"
import { useEffect, useState } from "react"

export const meta: MetaFunction = () => {
  return [{ title: "Quickr" }, { name: "description", content: "Dev tools" }]
}

export default function Index() {
  return (
    <main>
      <Box role="hero" my={60} ta="center">
        <Title fz={60} fw={700} lh={1.1}>
          Image Optimization
          <br />
          <span
            style={{
              background:
                "-webkit-linear-gradient(45deg, var(--mantine-color-violet-3), var(--mantine-color-violet-9),var(--mantine-color-violet-3) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "90%",
            }}
          >
            Quicker & Cheaper
          </span>
        </Title>

        <Text fz={"xl"} c="gray.6" mt="lg">
          Global CDN, image transformations and <Code fz="md">next/image</Code>-like optimization. <br />
          5x cheaper than Vercel image.
        </Text>

        <Button mt={60}>Start for free</Button>
        <Text fz="xs" c="gray.6" mt="xs">
          999 free images per month
        </Text>
      </Box>

      <Container>
        <SimpleGrid cols={{ md: 2, sm: 1 }}>
          <Flex align="center" direction="column">
            <Text fw={500} ta="center" fz="lg" mb="xs">
              Original
            </Text>
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
            <Progress.Root size="xl" mb="md" w="100%" maw={400}>
              <Progress.Section value={2}></Progress.Section>
              <Progress.Section value={98} color="none">
                <Progress.Label c="black">50.3 KB</Progress.Label>
              </Progress.Section>
            </Progress.Root>
            <Box pos="relative">
              <img
                src={`https://img.quickr.dev/width=500,quality=75/https://weleverimages.blob.core.windows.net/app-images/9f28732a-6fd8-469f-ba43-407ceac92c39-12jpg`}
                width={400}
                height={400}
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Flex>
        </SimpleGrid>
      </Container>

      <Space h={60} />

      <Try />
    </main>
  )
}

const Try = () => {
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [width, setWidth] = useState(400)
  const [quality, setQuality] = useState(75)

  return (
    <>
      <Title order={3} ta="center" fz={32} id="try-it-out" mb="xl">
        Try
      </Title>

      <Container size="xs">
        <Input placeholder="Paste image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <Text fz="xs" ta="center">
          or{" "}
          <FileButton onChange={setFile} accept="image/*">
            {(props) => (
              <Anchor fz="xs" underline="always" {...props}>
                upload from your computer
              </Anchor>
            )}
          </FileButton>
        </Text>
      </Container>

      <Container>
        <SimpleGrid cols={{ md: 2, sm: 1 }}>
          <Flex direction="column">
            <Text fw={500} fz="md" mb="sm">
              Original
            </Text>
            <Flex>
              <img src={"/images/example.jpeg"} width={200} height={200} style={{ objectFit: "cover" }} />
            </Flex>
          </Flex>

          <Flex direction="column">
            <Text fz="lg" fw={500} mb="sm">
              Optimized
            </Text>

            <Flex gap="md">
              <img
                src={`https://img.quickr.dev/width=${width},quality=${quality}/https://weleverimages.blob.core.windows.net/app-images/9f28732a-6fd8-469f-ba43-407ceac92c39-12jpg`}
                width={200}
                height={200}
                style={{ objectFit: "cover" }}
              />
              <Box>Size: 41.7 KB</Box>
            </Flex>

            <Flex w={400} mt="xl" direction="column" gap="xl">
              <Flex align="center" gap="lg" justify="space-between">
                <Text size="sm">Width</Text>
                <Slider
                  min={200}
                  max={800}
                  defaultValue={400}
                  step={10}
                  labelAlwaysOn
                  onChangeEnd={setWidth}
                  w={330}
                />
              </Flex>
              <Flex align="center" gap="lg">
                <Text size="sm">Quality</Text>
                <Slider
                  flex="1"
                  min={0}
                  max={100}
                  defaultValue={75}
                  step={5}
                  labelAlwaysOn
                  onChangeEnd={setQuality}
                />
              </Flex>
            </Flex>
          </Flex>
        </SimpleGrid>
      </Container>
    </>
  )
}

const ImageFetcher = (imageUrl: string) => {
  const [image, setImage] = useState<string | null>(null)
  const [sizeKb, setSizeKb] = useState<string | null>(null)
  const [fetchTime, setFetchTime] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImage = async () => {
      const startTime = performance.now()
      try {
        const res = await fetch(imageUrl)
        if (!res.ok) {
          throw new Error("Network response was not ok")
        }
        const contentLength = res.headers.get("content-length")
        const sizeInKB = (parseInt(contentLength!, 10) / 1024).toFixed(2)
        setSizeKb(sizeInKB)

        const blob = await res.blob()
        const objectUrl = URL.createObjectURL(blob)
        setImage(objectUrl)

        const endTime = performance.now()
        setFetchTime(endTime - startTime)
      } catch (error) {
        setError("Error fetching image")
        console.error("There was a problem with the fetch operation:", error)
      }
    }

    fetchImage()

    // Cleanup function to revoke the object URL
    return () => {
      if (image) {
        URL.revokeObjectURL(image)
      }
    }
  }, [imageUrl])

  return (
    <div>
      {image && (
        <>
          <img src={image} alt="Fetched" style={{ maxWidth: "100%" }} />
          <p>Fetch time: {fetchTime ? `${fetchTime.toFixed(2)} ms` : "Calculating..."}</p>
        </>
      )}
      {!image && <p>Loading...</p>}
    </div>
  )
}
