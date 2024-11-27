import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import overrides from "./styles";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={overrides}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
