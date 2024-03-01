import { User } from "@/types"
import { AvatarProps } from "@radix-ui/react-avatar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name">
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props} className="items-center justify-center border-2 rounded-full border-border">
      <span className="sr-only">{user.name}</span>
      <Icons.user className="size-5" />
    </Avatar>
  )
}
