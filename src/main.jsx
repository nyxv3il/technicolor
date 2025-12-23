import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LightPillar from "./components/LightPillar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div
      style={{ width: "100%", height: "100%", position: "fixed" }}
      className="background"
    >
      <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={1.0}
        rotationSpeed={0.3}
        glowAmount={0.005}
        pillarWidth={3.0}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        pillarRotation={0}
        interactive={false}
        mixBlendMode="normal"
      />
    </div>
    <App />
  </StrictMode>
);
