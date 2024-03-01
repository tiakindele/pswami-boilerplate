"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

import { useSignIn, useSignUp } from "../_hooks/auth"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

type AuthPath = "/login" | "/register"

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname() as AuthPath
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const [isFacebookLoading, setIsFacebookLoading] =
    React.useState<boolean>(false)

  const buttonText = {
    "/login": "Sign In",
    "/register": "Create Account",
  }

  const { mutate: login, isPending: isLoggingIn } = useSignIn()
  const { mutate: register, isPending: isRegistering } = useSignUp()

  const form = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: FormData) {
    switch (pathname) {
      case "/login": {
        await login(values, {
          onSuccess: (data) => {
            form.reset()
            return toast("Welcome back!", {
              description: "You are now signed in.",
            })
          },
          onError: (error) => {
            return toast("Something went wrong.", {
              description: "Your sign in request failed. Please try again.",
            })
          },
        })
        break
      }
      case "/register": {
        await register(values, {
          onSuccess: (data) => {
            form.reset()
            return toast("Welcome!", {
              description: "You are now signed up.",
            })
          },
          onError: (error) => {
            return toast("Something went wrong.", {
              description: "Your sign up request failed. Please try again.",
            })
          },
        })
        break
      }
      default: {
        return toast("Something went wrong.", {
          description: "Your request failed. Please try again.",
        })
      }
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="name@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            {(isLoggingIn || isRegistering) && (
              <Icons.spinner className="mr-2 size-4 animate-spin" />
            )}
            {buttonText[pathname]}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setIsGoogleLoading(true)
            // signIn("google")
          }}
          disabled={isLoggingIn || isRegistering || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Icons.spinner className="mr-2 size-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 size-4" />
          )}{" "}
          Google
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setIsFacebookLoading(true)
            // signIn("facebook")
          }}
          disabled={isLoggingIn || isRegistering || isFacebookLoading}
        >
          {isFacebookLoading ? (
            <Icons.spinner className="mr-2 size-4 animate-spin" />
          ) : (
            <Icons.facebook className="mr-2 size-4" />
          )}{" "}
          Facebook
        </Button>
      </div>
    </div>
  )
}
