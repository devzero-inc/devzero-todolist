import fetcher from "@/lib/fetcher";
import useSWR from "swr";

function useTodos(email: string) {
  const { data, error, mutate } = useSWR(`/api/get-todo/${email}`, fetcher, {
    revalidateOnFocus: false,
  });
  return {
    list: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export default useTodos;
