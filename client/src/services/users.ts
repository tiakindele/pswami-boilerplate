import { api } from "@/services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type User = {
  id: number;
  active: boolean;
  name: string;
  email: string;
  plan: string;
  friendly_plan_name: string;
  stripe_customer_id: string;
  onboarding_completed_at: string;
};

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation(async (data: { email: string; password: string }) => {
    const res = await api.post("/users/sign_in", { user: data });

    if (res.status >= 200) {
      queryClient.invalidateQueries(["user"]);
    }

    return res;
  });
}

export function useGoogleLogin() {
  const queryClient = useQueryClient();

  return useMutation(async () => {
    const rest = await fetch("/users/auth/google_oauth2", {
      method: "POST",
      mode: "no-cors",
      redirect: "manual",
    }).then((res) => {
      if (res.type === "opaqueredirect") {
        window.location.href = res.url;
      }
    });
  });
}

export function useLogout() {
  return useMutation(async () => {
    const res = await api.delete("/users/sign_out");

    return res;
  });
}

export function useUser() {
  return useQuery(["user"], async () => {
    try {
      const res = await api.get<User>("/api/users");

      return res.data;
    } catch (error) {
      return null;
    }
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation(async (data: { id: number; payload: Partial<User> }) => {
    const res = await api.patch(`/api/users/${data.id}`, {
      user: data.payload,
    });

    if (res.status >= 200) {
      queryClient.invalidateQueries(["user"]);
    }

    return res;
  });
}
