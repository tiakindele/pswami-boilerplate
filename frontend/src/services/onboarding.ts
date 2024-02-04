import { api } from "@/services";
import { useMutation } from "@tanstack/react-query";

export function useOnboarding() {
  return useMutation(async (data: { name: string, plan: string }) => {
    const res = await api.post('/api/onboarding', { onboarding: data });

    window.location.href = res.data.session_url;

    return res;
  });
}
