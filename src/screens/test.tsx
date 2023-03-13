/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useRef } from "react";

import { useSmudgeBox } from "hooks/draw";

/*****************************************************************************
 * Default Component
 *****************************************************************************/

export default function Test() {
  const canvasRef = useRef(null);
  useSmudgeBox(canvasRef, 500, 200);
  
  return (
    <div className="split" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} id="canvas"></canvas>
    </div>

  );
}
