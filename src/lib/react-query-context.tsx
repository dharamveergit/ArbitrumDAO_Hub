import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
  },
});

const ReactQueryContext = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <>{children}</>
      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom"
        buttonPosition="bottom-left"
      />
    </QueryClientProvider>
  );
};

export default ReactQueryContext;
