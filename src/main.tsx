import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from "react-router-dom";
// import { queryClientInstance } from '@/lib/query-client'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    {/* <QueryClientProvider client={queryClientInstance}> */}

    <StrictMode>
      <App />
    </StrictMode>
    {/* </QueryClientProvider> */}
  </BrowserRouter>
);
