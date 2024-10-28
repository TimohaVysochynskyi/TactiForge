import { useEffect, useRef } from "react";
import { Engine, Scene, Color4 } from "@babylonjs/core";

interface CanvasComponentProps {
  onSceneReady: (scene: Scene) => void;
  clearColor?: [number, number, number, number];
}

const CanvasComponent: React.FC<CanvasComponentProps> = ({
  onSceneReady,
  clearColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);

    if (clearColor) {
      scene.clearColor = new Color4(...clearColor);
    }

    onSceneReady(scene);

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => engine.resize());

    return () => {
      engine.dispose();
      window.removeEventListener("resize", () => engine.resize());
    };
  }, [onSceneReady, clearColor]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default CanvasComponent;
