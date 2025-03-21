import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styling/index.scss";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./helpers";
import { StyledEngineProvider } from "@mui/material/styles";
// Default styles that can be overridden by your app

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </StrictMode>
);
