import { Box, Button, Code, SimpleGrid, Text, Title } from "@mantine/core"
import type { MetaFunction } from "@remix-run/cloudflare"
import { useEffect, useState } from "react"

export const meta: MetaFunction = () => {
  return [{ title: "quickr.home" }, { name: "description", content: "Dev tools" }]
}

export default function Index() {
  const [fileSize, setFileSize] = useState<string | null>(null)
  const [fileSize2, setFileSize2] = useState<string | null>(null)

  useEffect(() => {
    async function fetchImageSize(url: string) {
      return fetch(url).then((res) => {
        const contentLength = res.headers.get("content-length")
        const sizeInKB = (parseInt(contentLength!, 10) / 1024).toFixed(2)
        return sizeInKB
      })
    }

    fetchImageSize(`/images/example.jpeg`).then(setFileSize)
    fetchImageSize(
      `https://img.quickr.dev/width=500/https://weleverimages.blob.core.windows.net/app-images/9f28732a-6fd8-469f-ba43-407ceac92c39-12jpg`
    ).then(setFileSize2)
  }, [])

  return (
    <>
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

        <Text fz={"xl"} c="gray.6" my="lg">
          Optimize and transform your images in seconds.
        </Text>

        <Button>Start for free</Button>
        <Text fz="xs" c="gray.6" mt="xs">
          999 free images per month
        </Text>
      </Box>
      <Title order={3}>Try it out</Title>
      <SimpleGrid cols={2}>
        <div>
          {fileSize && <p>{fileSize} KB</p>}
          <img src={"/images/example.jpeg"} width="100%" />
        </div>

        <div>
          {fileSize2 && <p>{fileSize2} KB</p>}
          <img
            src={`https://img.quickr.dev/width=500/https://weleverimages.blob.core.windows.net/app-images/9f28732a-6fd8-469f-ba43-407ceac92c39-12jpg`}
            width="100%"
          />
        </div>
      </SimpleGrid>

      <Title order={3}>Get started</Title>
      <Code></Code>
    </>
  )
}
