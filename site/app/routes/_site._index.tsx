import {
  Anchor,
  Box,
  Button,
  Container,
  FileButton,
  Flex,
  Input,
  LoadingOverlay,
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
            for the Serverless Era
          </span>
        </Title>

        <Text fz={"xl"} c="gray.6" mt="lg">
          Transform, optimize, and serve images near to your users.
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
  const [blur, setBlur] = useState(0)

  return (
    <>
      <Title order={3} ta="center" fz={32} id="try-it-out" mb="xl">
        Try
      </Title>

      <Container size="xs" mb="xl">
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
        <Flex
          wrap="wrap"
          align="center"
          direction={{ xs: "column", md: "row" }}
          justify={{ xs: "center", md: "space-around" }}
          gap="xl"
          ta={{ xs: "center", md: "left" }}
        >
          <Box flex="1" miw={200}>
            <Text fz="lg" fw={500} mb="sm">
              Original
            </Text>

            <ImageExample imageUrl="https://weleverimages.blob.core.windows.net/app-images/9f28732a-6fd8-469f-ba43-407ceac92c39-12jpg" />
          </Box>

          <Flex flex="1" direction="column" gap="xl" miw={400}>
            <Flex align="center" gap="lg" justify="space-between">
              <Text w={50} size="sm">
                Width
              </Text>
              <Slider
                flex="1"
                min={200}
                max={800}
                defaultValue={400}
                step={100}
                labelAlwaysOn
                onChangeEnd={setWidth}
              />
            </Flex>
            <Flex align="center" gap="lg">
              <Text w={50} size="sm">
                Quality
              </Text>
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
            <Flex align="center" gap="lg">
              <Text w={50} size="sm">
                Blur
              </Text>
              <Slider
                flex="1"
                min={0}
                max={100}
                defaultValue={0}
                step={1}
                labelAlwaysOn
                onChangeEnd={setBlur}
              />
            </Flex>
          </Flex>

          <Box flex="1" ta={{ md: "right" }} miw={200}>
            <Text fz="lg" fw={500} mb="sm">
              Optimized
            </Text>
            <ImageExample
              imageUrl={`https://img.quickr.dev/width=${width},quality=${quality},blur=${blur}/https://weleverimages.blob.core.windows.net/app-images/9f28732a-6fd8-469f-ba43-407ceac92c39-12jpg`}
            />
          </Box>
        </Flex>
      </Container>
    </>
  )
}

const ImageExample = ({ imageUrl }: { imageUrl: string }) => {
  const [image, setImage] = useState<string | null>(null)
  const [sizeKb, setSizeKb] = useState<string | null>(null)
  const [fetchTime, setFetchTime] = useState<string | null>(null)
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
        setFetchTime((endTime - startTime).toFixed(2))
      } catch (error) {
        setError("Error fetching image")
        console.error("There was a problem with the fetch operation:", error)
      }
    }

    fetchImage()

    return () => {
      if (image) {
        URL.revokeObjectURL(image)
      }
    }
  }, [imageUrl])

  return (
    <Box pos="relative" h={200}>
      {image && (
        <>
          <img src={image} alt="example image" width={200} height={200} style={{ objectFit: "cover" }} />
          <Text>
            {sizeKb} KB in {fetchTime}ms
          </Text>
        </>
      )}
      <LoadingOverlay visible={!image} />
    </Box>
  )
}
