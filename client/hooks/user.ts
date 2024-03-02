import { User } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import api from "../lib/api"

export function useCurrentUser() {
  const queryFn = async () => {
    const { data } = await api.get<User>("/api/users")
    return data
  }
  return useQuery({
    queryKey: ["user"],
    queryFn: queryFn,
    staleTime: 1000 * 60 * 5 // Look into if we want to set a stale time
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { id: number; payload: Partial<User> }) => {
      const res = await api.patch(`/api/users/${data.id}`, {
        user: data.payload,
      })

      return res
    },
    onError: (error) => {
      console.error(error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    }
  })
}
