type ImageProps = JSX.IntrinsicElements["img"] & {
  fallbackSrc?: string
}

type Rec = Record<string, string | number | undefined>

export const Img = ({ src, fallbackSrc, ...props }: ImageProps) => {
  if (!src || isLocalhost(src)) {
    return <img src={src} {...props} />
  }

  const opts: Rec = {
    width: typeof props.width === "number" ? props.width : undefined,
    height: typeof props.height === "number" ? props.height : undefined,
  }

  let srcSet

  if (typeof props.width === "number") {
    srcSet = [props.width, props.width * 2]
      .map((width, i) => `${imgUrl(src, opts, { width: width.toString() })} ${i + 1}x`)
      .join(", ")
  } else {
    srcSet = [640, 960, 1200, 1600, 1920]
      .map((width) => `${imgUrl(src, opts, { width: width.toString() })} ${width}w`)
      .join(", ")
  }

  return (
    <img
      src={imgUrl(src, opts, {})}
      srcSet={props.srcSet || srcSet}
      decoding="async"
      loading="lazy"
      {...props}
    />
  )
}

const imgUrl = (src: string, opts: Rec, replacements: Rec) => {
  const optsStr = Object.entries({ ...opts, ...replacements })
    .filter(([_, v]) => !!v)
    .map(([k, v]) => `${k}=${v}`)
    .join(",")

  if (!src.startsWith("http")) {
    src = window.location.hostname + src
  }

  return `https://img.quickr.dev/${optsStr}/${src}`
}

const isLocalhost = (src: string) => {
  if (typeof window === "undefined") return false
  if (!src.startsWith("http")) return true

  return src.includes("localhost") || src.includes("127.0.0.1")
}
