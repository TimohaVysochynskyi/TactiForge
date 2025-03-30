import { useRef, useEffect, useState } from "react";
import {
  Engine,
  Scene,
  FreeCamera,
  HemisphericLight,
  DirectionalLight,
  PointLight,
  Vector3,
  Color4,
  SceneLoader,
  AbstractMesh,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

import css from "./LandingModelScene.module.css";
import Loader from "../Loader/Loader";

type Props = {
  media: string;
};

export default function LandingModelScene({ media }: Props) {
  const viewPortWidthPercent = window.innerWidth / 100;
  const scrollKoef = viewPortWidthPercent * 0.045;

  const [loading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modelRef = useRef<AbstractMesh | null>(null);
  const cameraRef = useRef<FreeCamera | null>(null);
  const targetPosition = useRef<Vector3>(
    new Vector3(viewPortWidthPercent * 0.3, 0, 5)
  );
  const smoothRotation = useRef(0);
  const rotationVelocity = useRef(0);
  const timeRef = useRef(0);
  const smoothZ = useRef(5);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0);
    scene.skipPointerMovePicking = true;
    scene.autoClear = false;

    SceneLoader.ImportMesh(
      "",
      "/assets/models/",
      `${media}.glb`,
      scene,
      (meshes) => {
        modelRef.current = meshes[0];
        modelRef.current.scaling = new Vector3(1, 1, -1);
        modelRef.current.position = targetPosition.current;
        modelRef.current.rotation = new Vector3(0, Math.PI / 1.5, 0);
        scene.freezeActiveMeshes();

        setLoading(false);
      }
    );

    const camera = new FreeCamera("camera", new Vector3(0, 0, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.inputs.clear();
    cameraRef.current = camera;

    new HemisphericLight(
      "ambientLight",
      new Vector3(0, 1, 0),
      scene
    ).intensity = 4;
    new DirectionalLight(
      "directionalLightFront",
      new Vector3(1, 1, 0),
      scene
    ).intensity = 6;
    new DirectionalLight(
      "directionalLightBack",
      new Vector3(-1, 1, 0),
      scene
    ).intensity = 6;
    new PointLight("blueLight", new Vector3(0, 2, -5), scene).intensity = 8;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollPercentage =
        scrollY / (document.documentElement.scrollHeight - viewportHeight);

      if (modelRef.current) {
        if (scrollY < viewportHeight) {
          targetPosition.current = new Vector3(
            viewPortWidthPercent * 0.3 - scrollPercentage * scrollKoef * 20,
            0,
            5
          );
          smoothZ.current = 5;
        } else if (scrollY < viewportHeight * 1.7) {
          targetPosition.current = new Vector3(
            viewPortWidthPercent * -0.52,
            0,
            5
          );
          smoothZ.current = 10;
        } else {
          targetPosition.current = new Vector3(0, -1, 5);
          smoothZ.current = 5;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    const handleWheel = (event: WheelEvent) => {
      rotationVelocity.current += event.deltaY * 0.00012;
    };

    window.addEventListener("wheel", handleWheel);

    const animate = () => {
      if (modelRef.current) {
        smoothRotation.current +=
          rotationVelocity.current - smoothRotation.current;
        modelRef.current.rotation.y += smoothRotation.current;
        rotationVelocity.current *= 0.98;

        timeRef.current += 0.016;

        const currentPosition = modelRef.current.position;
        const target = targetPosition.current;

        modelRef.current.position.x += (target.x - currentPosition.x) * 0.045;
        modelRef.current.position.y += (target.y - currentPosition.y) * 0.045; // Додаємо y
        modelRef.current.position.z +=
          (smoothZ.current - currentPosition.z) * 0.05;
      }
      requestAnimationFrame(animate);
    };

    animate();
    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      engine.dispose();
    };
  }, [media]);

  return (
    <>
      {loading && <Loader position="fixed" size="80" />}
      <canvas ref={canvasRef} className={css.canvas} />
    </>
  );
}
