import { Anchor, AnchorProps, ElementProps } from "@mantine/core"
import { Link } from "@remix-run/react"
import { RemixLinkProps } from "@remix-run/react/dist/components"

interface Props
  extends Omit<RemixLinkProps, "color" | "style">,
    AnchorProps,
    ElementProps<"a", keyof AnchorProps> {}

export function A(props: Props) {
  return <Anchor component={Link} {...props} />
}
