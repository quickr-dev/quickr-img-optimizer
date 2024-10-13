import { Box, Card, Center, Code, Container, Flex, List, ListItem, Slider, Tabs, Text } from "@mantine/core"
import { MetaFunction, useNavigate, useParams } from "@remix-run/react"
import { useState } from "react"

import { CodeHighlightTabs } from "@mantine/code-highlight"
import "@mantine/code-highlight/styles.css"
import { IconBrandJavascript, IconBrandTypescript, IconFileTypeHtml } from "@tabler/icons-react"
import { A } from "~/components/ui/A"
import { pageTitle } from "~/lib/pageTitle"

export const meta: MetaFunction = () => {
  return [pageTitle("Docs")]
}

export default function Index() {
  const navigate = useNavigate()
  const { tab } = useParams()

  return (
    <Tabs
      orientation="vertical"
      variant="pills"
      defaultValue="intro"
      mih="60vh"
      value={tab}
      onChange={(value) => navigate(`/docs/${value}`)}
    >
      <Tabs.List mr={60} w={200}>
        <Tabs.Tab py="md" px="lg" value="intro">
          Introduction
        </Tabs.Tab>
        <Tabs.Tab py="md" px="lg" value="transformations">
          Transformations
        </Tabs.Tab>
        <Text fw={600} fz="sm" c="gray.9" mt="md" ml="md">
          Quickstart
        </Text>
        <Tabs.Tab py="md" px="lg" value="next-image">
          next/image
        </Tabs.Tab>
        {/* <Tabs.Tab py="md" px="lg" value="react">
          React component
        </Tabs.Tab> */}
        <Tabs.Tab py="md" px="lg" value="vanilla">
          Vanilla JS
        </Tabs.Tab>
      </Tabs.List>

      <Container size="sm" ml={0} w="100%">
        <IntroTabPanel />
        <TransformationsTabPanel />
        <NextImageTabPanel />
        <ReactTabPanel />
        <VanillaTabPanel />
      </Container>
    </Tabs>
  )
}

const IntroTabPanel = () => {
  return (
    <Tabs.Panel value="intro">
      <Text>
        Simply load images via <Code>https://quickr-cdn.quickr.dev/TRANSFORMATIONS/IMAGE_URL</Code>
      </Text>

      <Text mt="lg" fw={500}>
        Without transformations
      </Text>
      <Code>
        https://quickr-cdn.quickr.dev//<Code c="blue">IMAGE_URL</Code>
      </Code>

      <Text fw={500} mt="md">
        With transformations
      </Text>
      <Code>
        https://quickr-cdn.quickr.dev/<Code c="green">width=400</Code>/
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
      Quickr uses Cloudflare and thus support the same transformations.
      <br />
      <br />
      Please refer to the{" "}
      <A to="https://developers.cloudflare.com/images/transform-images/transform-via-url/#options">
        Cloudflare docs
      </A>
      .
    </Tabs.Panel>
  )
}

const NextImageTabPanel = () => {
  const imageLoaderJS = `
const productionUrl = 'https://next-image.quickr.dev'; // For Vercel use \`https://\${process.env.VERCEL_PROJECT_PRODUCTION_URL}\`
const quickrUrl = 'https://quickr-cdn.quickr.dev'; // Replace with your subdomain

export default function loader({ src, width, quality }) {
  if (!shouldOptimize(src)) {
    return src;
  }

  if (src.startsWith("http")) {
    return quickrSrc(src, width, quality);
  }

  return quickrSrc(\`\${productionUrl}\${src}\`, width, quality);
}

function shouldOptimize() {
  const isProduction =
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production";

  return isProduction;
}

function quickrSrc(src, width, quality) {
  const params = [\`width=\${width}\`];
  if (quality) params.push(\`quality=\${quality}\`);

  return [quickrUrl, params.join(","), src].join("/");
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
import ExampleImg from "./image.jpeg";

export default function Page() {
  return (
    <>
      <Image src="https://assets.quickr.dev/example2.jpeg" width={180} height={200} alt="Image loaded via URL"  />
      <br />
      <br />
      <Image src={ExampleImg} alt="Image loaded via import" width={400} />
    </>
  );
}
`

  return (
    <Tabs.Panel value="next-image">
      <Text>Use the loader prop of loader file to update the URL.</Text>
      <List>
        <ListItem>
          <A to="https://nextjs.org/docs/pages/api-reference/components/image#loader">
            <Code>loader</Code> prop docs
          </A>
        </ListItem>
        <ListItem>
          <A to="https://nextjs.org/docs/pages/api-reference/components/image#loaderfile">Loader file docs</A>
        </ListItem>
      </List>

      <Text mt="md">Live demo and code:</Text>
      <List>
        <ListItem>
          <A to="https://next-image.quickr.dev">https://next-image.quickr.dev</A>
        </ListItem>
        <ListItem>
          <A to="https://github.com/quickr-dev/quickr-nextjs">https://github.com/quickr-dev/quickr-nextjs</A>
        </ListItem>
      </List>

      <CodeHighlightTabs
        mt="xl"
        code={[
          {
            fileName: "app/page.tsx",
            code: pageTsx,
            language: "tsx",
            icon: <IconBrandTypescript size={18} />,
          },
          {
            fileName: "next.config.mjs",
            code: nextConfigMjs,
            language: "mjs",
            icon: <IconBrandJavascript size={18} />,
          },
          {
            fileName: "imageLoader.js",
            code: imageLoaderJS,
            language: "js",
            icon: <IconBrandJavascript size={18} />,
          },
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
(() => {
  const productionUrl = "https://vanilla-js.quickr.dev"; // Replace with your domain
  const quickrUrl = "https://quickr-cdn.quickr.dev"; // "quickr-cdn" is available to use during beta

  document.querySelectorAll("img[data-src]").forEach((img) => {
    const { src } = img.dataset;
    const transformationsObject = transformationsAsObject(img);

    img.loading = "lazy";
    img.decoding = "async";

    if (!shouldOptimize()) {
      img.src = src;
    } else if (src.startsWith("http")) {
      img.src = getSrc(src, transformationsObject);
      img.srcset = getSrcSet(src, transformationsObject);
    } else {
      const absoluteSrc =
        productionUrl + (src.startsWith("/") ? src : \`/\${src}\`);

      img.src = getSrc(absoluteSrc, transformationsObject);
      img.srcset = getSrcSet(absoluteSrc, transformationsObject);
    }
  });

  function shouldOptimize() {
    const isProduction = location.href.startsWith(productionUrl);

    return isProduction;
  }

  function getSrc(src, transformationsObject) {
    return [
      quickrUrl,
      transformationsAsString(transformationsObject),
      src,
    ].join("/");
  }

  function getSrcSet(src, transformationsObject) {
    transformationsObject.fit ||= "scale-down";

    if (transformationsObject.width) {
      return \`
        \${getSrc(src, transformationsObject)} 1x,
        \${getSrc(src, {
          ...transformationsObject,
          width: Math.min(transformationsObject.width * 2, 1920),
        })} 2x
      \`;
    } else {
      return \`
        \${getSrc(src, { ...transformationsObject, width: 640 })} 640w,
        \${getSrc(src, { ...transformationsObject, width: 960 })} 960w,
        \${getSrc(src, { ...transformationsObject, width: 1200 })} 1200w,
        \${getSrc(src, { ...transformationsObject, width: 1600 })} 1600w,
        \${getSrc(src, { ...transformationsObject, width: 1920 })} 1920w
      \`;
    }
  }

  /**
   * @param {String} transformations e.g. 'width=800,fit=scale-down'
   * @return {Object} e.g. {width: 800, fit: 'scale-down'}
   */
  function transformationsAsObject(img) {
    const { transformations = "" } = img.dataset;
    const transformationsObject = {};

    if (img.width) transformationsObject.width = img.width;
    if (img.height) transformationsObject.height = img.height;

    return Object.fromEntries(
      transformations
        .split(",")
        .filter(Boolean)
        .map((pair) => {
          const [key, value] = pair.split("=");
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
      .join(",");
  }
})();
`

  const indexHtml = `
<div style="width: 400px;">
  <img data-src="image.jpeg" width="100%" />
</div>

<img
  data-src="https://assets.quickr.dev/example.jpeg"
  width="300"
  data-transformations="sharpen=2,brightness=1,contrast=1"
/>

<script src="./quickr.js" defer></script>
`

  return (
    <Tabs.Panel value="vanilla">
      <Text>Optimize images using data attributes.</Text>

      <Text mt="md">Live demo and code:</Text>
      <List>
        <ListItem>
          <A to="https://vanilla-js.quickr.dev">https://vanilla-js.quickr.dev</A>
        </ListItem>
        <ListItem>
          <A to="https://github.com/quickr-dev/quickr-vanilla-js">
            https://github.com/quickr-dev/quickr-vanilla-js
          </A>
        </ListItem>
      </List>

      <CodeHighlightTabs
        mt="xl"
        code={[
          { fileName: "index.html", code: indexHtml, language: "html", icon: <IconFileTypeHtml size={18} /> },
          { fileName: "quickr.js", code: scriptJs, language: "js", icon: <IconBrandTypescript size={18} /> },
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
            src={`https://quickr-cdn.quickr.dev/width=${width},quality=${quality},blur=${blur}/${src}`}
            alt="transformed image"
            style={{ objectFit: "contain", maxWidth: "100%" }}
          />
        </Card>
      </Center>

      <Code block mt="md">
        {`<img src="https://quickr-cdn.quickr.dev/width=${width},quality=${quality},blur=${blur}/${src}" />`}
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
