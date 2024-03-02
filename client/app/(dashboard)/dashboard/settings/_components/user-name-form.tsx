"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { User } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useCurrentUser, useUpdateUser } from "@/hooks/user"
import { cn } from "@/lib/utils"
import { userNameSchema } from "@/lib/validations/user"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Icons } from "@/components/icons"
import { deviseErrorToMessage } from "@/lib/utils"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {}

type FormData = z.infer<typeof userNameSchema>

export function UserNameForm({ className, ...props }: UserNameFormProps) {
  const { data: user } = useCurrentUser()
  const { mutate: updateUser, isPending: isSaving } = useUpdateUser()
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name || "",
    },
  })

  async function onSubmit(data: FormData) {
    updateUser({ id: user?.id as number, payload: data }, {
      onSuccess: () => {
        toast("Success", {
          description: "Your name has been updated.",
        })
        router.refresh()
      },
      onError: (error) => {
        toast("Something went wrong.", {
          description: deviseErrorToMessage(error) || "Your name was not updated. Please try again.",
        })
      },
    })
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px]"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  )
}
