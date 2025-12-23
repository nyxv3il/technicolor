import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Galaxy from "./components/Galaxy.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div
      style={{ width: "100%", height: "100%", position: "fixed" }}
      className="background"
    >
      <Galaxy
        mouseRepulsion={true}
        mouseInteraction={true}
        density={1.5}
        glowIntensity={0.2}
        saturation={0.4}
        hueShift={240}
      />
    </div>
    <App />
  </StrictMode>
);
