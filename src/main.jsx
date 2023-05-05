import { Canvas } from "@react-three/fiber";
import React from "react";
import ReactDOM from "react-dom/client";
import { default as Scene } from "./Scene";
import "./index.css";
import { Physics } from "@react-three/cannon";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <div
      style={{
        bottom: "2%",
        fontSize: "28px",
        position: "absolute",
        cursor: "default",
        zIndex: 10,
        color: "white",
        marginLeft: "25px",
        display: "flex",
        backgroundColor: "transparent",
        textShadow: "1px 1px 5px black",
        backdropFilter: "blur(8px)",
      }}
    >
      Controls: <br />
      A, W, D, S Move Car <br />
      K Change Camera <br />R Reset Car
    </div>
    <Canvas>
      <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
        <Scene />
      </Physics>
    </Canvas>
  </>
);
