import { api } from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useCustomerPortal() {
  return useQuery(['customer_portal'], async () => {
    const res = await api.get('/api/stripe/customer_portal');

    window.location.href = res.data.url;

    return res.data;
  }, { enabled: false, retry: false });
}
