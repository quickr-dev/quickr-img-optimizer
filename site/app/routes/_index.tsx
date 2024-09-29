import type { MetaFunction } from "@remix-run/cloudflare"

export const meta: MetaFunction = () => {
  return [{ title: "Quickr" }, { name: "description", content: "Dev tools" }]
}

export default function Index() {
  const url700kb =
    "https://weleverimages.blob.core.windows.net/app-images/8718ba8f-1b2b-4485-92c9-a039bccf4b84-WallpaperFruki100Anos4png"
  const url2mb =
    "https://weleverimages.blob.core.windows.net/app-images/9f28732a-6fd8-469f-ba43-407ceac92c39-12jpg"

  return (
    <>
      <div>
        <Image src={url2mb} />
      </div>
    </>
  )
}

type Rec = Record<string, string | undefined>
type ImageProps = JSX.IntrinsicElements["img"]

const Image = ({ src, ...props }: ImageProps) => {
  if (!src) return <img {...props} />

  const opts: Rec = {
    width: props.width?.toString(),
    height: props.height?.toString(),
  }

  let srcSet, sizes

  if (props.width) {
    srcSet = [ensureInt(props.width), ensureInt(props.width) * 2]
      .map((width, i) => `${getUrl(src, opts, { width: width.toString() })} ${i + 1}x`)
      .join(", ")
  } else {
    srcSet = [640, 1200, 2048, 3840]
      .map((width) => `${getUrl(src, opts, { width: width.toString() })} ${width}w`)
      .join(", ")
    sizes = "100vw"
  }

  return (
    <img
      src={getUrl(src, opts, {})}
      srcSet={srcSet}
      sizes={sizes}
      decoding="async"
      loading="lazy"
      {...props}
    />
  )
}

const ensureInt = (v: string | number) => {
  return typeof v === "string" ? parseInt(v, 10) : v
}

const getUrl = (src: string, opts: Rec, replacements: Rec) => {
  const optsStr = Object.entries({ ...opts, ...replacements })
    .filter(([_, v]) => !!v)
    .map(([k, v]) => `${k}=${v}`)
    .join(",")

  return `https://img.quickr.dev/${optsStr}/${src}`
}
