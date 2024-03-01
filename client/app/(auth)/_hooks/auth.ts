import { User } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import api from "@/lib/api"

export function useSignIn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return await api.post<User>("/users/sign_in", { user: data })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.data)
      return data
    },
    onError: (error) => {
      console.error(error)
    }
  })
}

export function useSignUp() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return await api.post<User>("/users", { user: data })
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.data)
      return data
    },
    onError: (error) => {
      console.error(error)
    }
  })
}

export function useSignOut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      return await api.delete("/users/sign_out")
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null)
    },
    onError: (error) => {
      console.error(error)
    }
  })
}
