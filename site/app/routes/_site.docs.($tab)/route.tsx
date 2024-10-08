import { Box, Card, Center, Code, Container, Flex, List, ListItem, Slider, Tabs, Text } from "@mantine/core"
import { MetaFunction, useNavigate, useParams } from "@remix-run/react"
import { useState } from "react"

import { CodeHighlightTabs } from "@mantine/code-highlight"
import "@mantine/code-highlight/styles.css"
import { IconBrandTypescript, IconFileTypeHtml } from "@tabler/icons-react"

export const meta: MetaFunction = () => {
  return [{ title: "Docs | Quickr" }]
}

export default function Index() {
  const navigate = useNavigate()
  const { tab } = useParams()

  return (
    <main>
      <Container size="md" mt={60}>
        <Tabs
          orientation="vertical"
          variant="pills"
          defaultValue="intro"
          mih="60vh"
          value={tab}
          onChange={(value) => navigate(`/docs/${value}`)}
        >
          <Tabs.List mr={60}>
            <Tabs.Tab py="sm" value="intro">
              Introduction
            </Tabs.Tab>
            <Tabs.Tab py="sm" value="transformations">
              Transformations
            </Tabs.Tab>
            <Text fw={600} fz="sm" c="gray.9" mt="md" ml="md">
              Quickstart
            </Text>
            <Tabs.Tab py="sm" value="next-image">
              next/image
            </Tabs.Tab>
            <Tabs.Tab py="sm" value="react">
              React component
            </Tabs.Tab>
            <Tabs.Tab py="sm" value="vanilla">
              Vanilla JS
            </Tabs.Tab>
          </Tabs.List>

          <Container size="sm" ml={0}>
            <IntroTabPanel />
            <TransformationsTabPanel />
            <NextImageTabPanel />
            <ReactTabPanel />
            <VanillaTabPanel />
          </Container>
        </Tabs>
      </Container>
    </main>
  )
}

const IntroTabPanel = () => {
  return (
    <Tabs.Panel value="intro">
      <Text>
        Simply load images via <Code>https://img.quickr.dev/TRANSFORMATIONS/IMAGE_URL</Code>
      </Text>

      <Text mt="lg" fw={500}>
        Without transformations
      </Text>
      <Code>
        https://img.quickr.dev//<Code c="blue">IMAGE_URL</Code>
      </Code>

      <Text fw={500} mt="md">
        With transformations
      </Text>
      <Code>
        https://img.quickr.dev/<Code c="green">width=400</Code>/
        <Code c="blue">https://example.com/image.png</Code>
      </Code>

      <Box w={500} mt={"xl"} mih={"60vh"}>
        <ImageWithTransformations src="https://assets.quickr.dev/example3.jpg" />
      </Box>
    </Tabs.Panel>
  )
}

const TransformationsTabPanel = () => {
  return (
    <Tabs.Panel value="transformations">
      We support the same transformations as Cloudflare.
      <br />
      <br />
      Please refer to the{" "}
      <a href="https://developers.cloudflare.com/images/transform-images/transform-via-url/#options">
        Cloudflare docs
      </a>
      .
    </Tabs.Panel>
  )
}

const NextImageTabPanel = () => {
  const imageLoaderJS = `
// Update variables below as necessary
const optimizeOnlyInProduction = true
const isProduction = process.env.VERCEL_ENV === 'production'
const origin = process.env.VERCEL_PROJECT_PRODUCTION_URL ? \`https://\${process.env.VERCEL_PROJECT_PRODUCTION_URL}\` : null

export default function loader({ src, width, quality }) {
  if (optimizeOnlyInProduction && !isProduction) {
    return src
  }
  if (src.startsWith('http')) {
    return optimizedSrc(src, width, quality)
  }
  if (origin) {
    return optimizedSrc(\`\${origin}\${src}\`, width, quality)
  }

  // Do not optimize relative URLs
  return src
}

function optimizedSrc(src, width, quality) {
  const params = [\`width=\${width}\`, \`quality=\${quality || 75}\`]
  return \`https://img.quickr.dev/\${params.join(",")}/\${src}\`
}`

  const nextConfigMjs = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./imageLoader.js",
  },
};

export default nextConfig;`

  const pageTsx = `
import Image from "next/image";
import Next from "./next.svg"

export default function Page() {
  return (
    <div>
      <Image src="https://nextjs.org/icons/next.svg" alt="Next.js logo" width={180} height={38} />

      <Image src={Next} alt="Next" width={180} />
    </div>
  );
}`
  return (
    <Tabs.Panel value="next-image">
      <Text>Use the loader prop of loader file to update the URL.</Text>
      <List>
        <ListItem>
          <a href="https://nextjs.org/docs/pages/api-reference/components/image#loader">
            <Code>loader</Code> prop docs
          </a>
        </ListItem>
        <ListItem>
          <a href="https://nextjs.org/docs/pages/api-reference/components/image#loaderfile">
            Loader file docs
          </a>
        </ListItem>
      </List>

      <Text mt="md">Live demo and code:</Text>
      <List>
        <ListItem>
          <a href="https://nextjs-image-loader-example.vercel.app/">
            https://nextjs-image-loader-example.vercel.app/
          </a>
        </ListItem>
        <ListItem>
          <a href="https://github.com/rafbgarcia/nextjs-image-loader-example">
            https://github.com/rafbgarcia/nextjs-image-loader-example
          </a>
        </ListItem>
      </List>

      <CodeHighlightTabs
        mt="xl"
        getFileIcon={() => <IconBrandTypescript size={18} />}
        code={[
          { fileName: "imageLoader.js", code: imageLoaderJS, language: "tsx" },
          { fileName: "next.config.mjs", code: nextConfigMjs, language: "tsx" },
          { fileName: "app/page.tsx", code: pageTsx, language: "tsx" },
        ]}
      />
    </Tabs.Panel>
  )
}

const ReactTabPanel = () => {
  return (
    <Tabs.Panel value="react">
      <Text>React</Text>
    </Tabs.Panel>
  )
}

const VanillaTabPanel = () => {
  const scriptJs = `
;(() => {
  // Update variables below as necessary
  const PROD_HOSTNAME = 'YOUR_PRODUCTION_HOSTNAME';
  const optimizeOnlyInProduction = true;

  const origin = new URL(location.href).origin;
  const isProduction = origin.includes(PROD_HOSTNAME) || !origin.includes('localhost') && !origin.includes('127.0.0.1');

  document.querySelectorAll('img[data-src]').forEach((img) => {
    const { width, height } = img;
    const { src, transformations = "" } = img.dataset;
    const transformationsObject = transformationsAsObject(transformations);
    transformationsObject.width ||= width === 0 ? undefined : width;
    transformationsObject.height ||= height === 0 ? undefined : height;

    img.loading = 'lazy';
    img.decoding = 'async';

    if (optimizeOnlyInProduction && !isProduction) {
      img.src = img.dataset.src;
    } else if (src.startsWith('http')) {
      img.src = optimizedSrc(src, transformationsObject);
      img.srcset = optimizedSrcSet(src, transformationsObject);
    } else if (isProduction) {
      // 'src' is a relative path, e.g. "/images/example.jpg"
      img.src = optimizedSrc(\`\${origin}\${src}\`, transformationsObject);
      img.srcset = optimizedSrcSet(src, transformationsObject);
    } else {
      img.src = img.dataset.src;
    }
  });


  function optimizedSrc(src, transformationsObject) {
    return \`https://img.quickr.dev/\${transformationsAsString(transformationsObject)}/\${src}\`
  }

  function optimizedSrcSet(src, transformationsObject) {
    transformationsObject.fit ||= "scale-down";

    if (transformationsObject.width) {
      return \`
        \${optimizedSrc(src, transformationsObject)} 1x,
        \${optimizedSrc(src, {...transformationsObject, width: Math.min(transformationsObject.width * 2, 1920)})} 2x
      \`;
    } else {
      return \`
        \${optimizedSrc(src, {...transformationsObject, width: 640})} 640w,
        \${optimizedSrc(src, {...transformationsObject, width: 960})} 960w,
        \${optimizedSrc(src, {...transformationsObject, width: 1200})} 1200w,
        \${optimizedSrc(src, {...transformationsObject, width: 1600})} 1600w,
        \${optimizedSrc(src, {...transformationsObject, width: 1920})} 1920w
      \`;
    }
  }

  /**
   * @param {String} transformations e.g. 'width=800,fit=scale-down'
   * @return {Object} e.g. {width: 800, fit: 'scale-down'}
   */
  function transformationsAsObject(transformations) {
    return Object.fromEntries(
      transformations.split(',').filter(Boolean).map(pair => {
        const [key, value] = pair.split('=');
        return [key, isNaN(value) ? value : Number(value)];
      })
    );
  }

  /**
   * @param {Object} transformations e.g. {width: 800, fit: 'scale-down'}
   * @return {String} e.g. 'width=800,fit=scale-down'
   */
  function transformationsAsString(transformationsObject) {
    return Object.entries(transformationsObject)
      .filter(([_key, value]) => Boolean(value))
      .map(([key, value]) => \`\${key}=\${value}\`)
      .join(',');
  }
})();
`
  const indexHtml = `
<div style="display: flex; gap: 10px;">
  <img data-src="https://assets.quickr.dev/example.jpeg" width="300" />
  <img data-src="https://assets.quickr.dev/example.jpeg" data-transformations="width=300" />
</div>

<div style="display: flex; gap: 10px; margin-top: 10px; align-items: start;">
  <div style="width: 400px">
    <img data-src="https://assets.quickr.dev/example2.jpeg" width="100%" />
  </div>

  <img data-src="https://assets.quickr.dev/example2.jpeg" width="400" data-transformations="blur=30,rotate=180" />
</div>

<script src="./quickr.js" defer></script>
`

  return (
    <Tabs.Panel value="vanilla">
      <Text>Optimize images using data attributes</Text>

      <Text mt="md">Live demo and code:</Text>
      <List>
        <ListItem>
          <a href="https://quickr-vanilla-js.vercel.app/">https://quickr-vanilla-js.vercel.app/</a>
        </ListItem>
        <ListItem>
          <a href="https://github.com/rafbgarcia/vanilla-example">
            https://github.com/rafbgarcia/vanilla-example
          </a>
        </ListItem>
      </List>

      <CodeHighlightTabs
        mt="xl"
        code={[
          { fileName: "quickr.js", code: scriptJs, language: "js", icon: <IconBrandTypescript size={18} /> },
          { fileName: "index.html", code: indexHtml, language: "html", icon: <IconFileTypeHtml size={18} /> },
        ]}
      />
    </Tabs.Panel>
  )
}

const ImageWithTransformations = ({ src }: { src: string }) => {
  const [width, setWidth] = useState(500)
  const [quality, setQuality] = useState(75)
  const [blur, setBlur] = useState(0)

  return (
    <Box>
      <Center h={281}>
        <Card p={0} withBorder bg="gray.0">
          <img
            src={`https://img.quickr.dev/width=${width},quality=${quality},blur=${blur}/${src}`}
            alt="transformed image"
            style={{ objectFit: "contain", maxWidth: "100%" }}
          />
        </Card>
      </Center>

      <Code block mt="md">
        {`<img src="https://img.quickr.dev/width=${width},quality=${quality},blur=${blur}/${src}" />`}
      </Code>

      <Flex flex="1" direction="column" gap="xl" mt="xl" ta="left">
        <Flex align="center" gap="lg" justify="space-between">
          <Text w={50} size="sm">
            Width
          </Text>
          <Slider
            flex="1"
            min={200}
            max={800}
            defaultValue={width}
            label={(value) => `${value}px`}
            step={100}
            onChangeEnd={setWidth}
          />
        </Flex>
        <Flex align="center" gap="lg">
          <Text w={50} size="sm">
            Quality
          </Text>
          <Slider
            flex="1"
            min={1}
            max={100}
            label={(value) => `${value}%`}
            defaultValue={quality}
            onChangeEnd={setQuality}
          />
        </Flex>
        <Flex align="center" gap="lg">
          <Text w={50} size="sm">
            Blur
          </Text>
          <Slider flex="1" min={0} max={100} defaultValue={blur} step={1} onChangeEnd={setBlur} />
        </Flex>
      </Flex>
    </Box>
  )
}
