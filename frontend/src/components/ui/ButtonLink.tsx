// import { forwardRef } from 'react'
import { Button, type ButtonProps } from '@mantine/core'
import { createLink } from '@tanstack/react-router'

// const ButtonWithLink = forwardRef<HTMLAnchorElement, ButtonProps>((props, ref) => (
//   <Button component='a' ref={ref} {...props} />
// ))

type ButtonLinkProps = ButtonProps & { ref?: React.Ref<HTMLAnchorElement> }

const ButtonWithLink = ({ ref, ...props }: ButtonLinkProps) => (
  <Button component='a' ref={ref} {...props} />
)

const ButtonLink = createLink(ButtonWithLink)

export default ButtonLink
