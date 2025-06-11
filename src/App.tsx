import { RouterProvider } from "react-router";
import { router } from "./router/router";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
