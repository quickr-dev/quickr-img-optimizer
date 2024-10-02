import type { MetaFunction } from "@remix-run/cloudflare"
import { Img } from "./Img"

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
        <Img src={url2mb} />
      </div>
    </>
  )
}
