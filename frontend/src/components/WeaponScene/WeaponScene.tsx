import { useRef, useEffect } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  DirectionalLight,
  PointLight,
  Vector3,
  Color4,
  Color3,
  SceneLoader,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

import css from "./WeaponScene.module.css";

export default function WeaponScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cameraRef = useRef<ArcRotateCamera | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.094, 0.094, 0.094, 1); // Темно-сірий фон (#181818)

    SceneLoader.ImportMesh(
      "",
      "/assets/",
      "ar15_detailed.glb",
      scene,
      (meshes) => {
        const model = meshes[0];
        model.scaling = new Vector3(0.2, 0.2, 0.2);
        model.position = new Vector3(0, 0, 0);
      }
    );

    // Налаштування камери
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 1.1,
      Math.PI / 2,
      10,
      new Vector3(0, 0.5, 1.6),
      scene
    );
    cameraRef.current = camera;
    camera.attachControl(scene.getEngine().getRenderingCanvas(), false);

    // Основне освітлення
    const ambientLight = new HemisphericLight(
      "ambientLight",
      new Vector3(0, 1, 0),
      scene
    );
    ambientLight.intensity = 1;

    // Спрямоване світло для підкреслення текстур
    const directionalLightFront = new DirectionalLight(
      "directionalLightFront",
      new Vector3(1, 1, 0),
      scene
    );
    directionalLightFront.intensity = 2;
    directionalLightFront.diffuse = new Color3(1, 0.9, 0.8); // Теплий відтінок

    // Спрямоване світло для підкреслення текстур
    const directionalLightBack = new DirectionalLight(
      "directionalLightBack",
      new Vector3(-1, 1, 0),
      scene
    );
    directionalLightBack.intensity = 2;
    directionalLightBack.diffuse = new Color3(1, 0.9, 0.8); // Теплий відтінок

    // Кольорове підсвічування ззаду
    const blueLight = new PointLight("blueLight", new Vector3(0, 2, -5), scene);
    blueLight.intensity = 5;
    blueLight.diffuse = new Color3(0.4, 0.4, 0.8); // Блакитний відтінок

    // Рендеринг сцени
    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={css.canvas} />
    </>
  );
}
