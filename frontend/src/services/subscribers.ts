import { api } from "@/services";
import { useMutation } from "@tanstack/react-query";

export type Subscriber = {
  id: string;
  name: string;
  email: string;
};

export function useAddSubscriber() {
  return useMutation(async (data: { email: string }) => {
    const res = await api.post('/api/subscribers', { subscriber: data });

    return res;
  });
}
