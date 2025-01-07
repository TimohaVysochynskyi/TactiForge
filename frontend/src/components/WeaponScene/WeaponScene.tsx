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
  Color3,
  SceneLoader,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

import css from "./WeaponScene.module.css";
import Loader from "../Loader/Loader";

type Props = {
  media: string;
  rotationEnabled: boolean;
};

export default function WeaponScene({ media, rotationEnabled }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0);

    let model: any = null;

    SceneLoader.ImportMesh(
      "",
      "/assets/models/",
      `${media}.glb`,
      scene,
      (meshes) => {
        model = meshes[0];
        model.scaling = new Vector3(1, 1, -1);
        model.position = new Vector3(0, 0, 5);
        model.rotation = new Vector3(0, 1.5, 0);

        setLoading(false);
      }
    );

    // Створюємо FreeCamera
    const camera = new FreeCamera(
      "camera",
      new Vector3(0, 0, -5), // Початкова позиція камери
      scene
    );
    camera.setTarget(Vector3.Zero()); // Камера дивиться на центр сцени
    camera.attachControl(canvasRef.current, true);

    // Налаштування швидкості переміщення та обертання
    camera.speed = 0.4; // Швидкість переміщення (менше значення = повільніше)
    camera.angularSensibility = 4000; // Швидкість обертання (більше значення = повільніше)

    // Налаштовуємо клавіші для руху
    camera.keysUp.push(87); // W
    camera.keysDown.push(83); // S
    camera.keysLeft.push(65); // A
    camera.keysRight.push(68); // D

    // Основне освітлення
    const ambientLight = new HemisphericLight(
      "ambientLight",
      new Vector3(0, 1, 0),
      scene
    );
    ambientLight.intensity = 2;

    // Спрямоване світло для підкреслення текстур
    const directionalLightFront = new DirectionalLight(
      "directionalLightFront",
      new Vector3(1, 1, 0),
      scene
    );
    directionalLightFront.intensity = 3;
    directionalLightFront.diffuse = new Color3(1, 0.9, 0.8);

    const directionalLightBack = new DirectionalLight(
      "directionalLightBack",
      new Vector3(-1, 1, 0),
      scene
    );
    directionalLightBack.intensity = 3;
    directionalLightBack.diffuse = new Color3(1, 0.9, 0.8);

    const blueLight = new PointLight("blueLight", new Vector3(0, 2, -5), scene);
    blueLight.intensity = 5;
    blueLight.diffuse = new Color3(0.4, 0.4, 0.8);

    // Рендеринг сцени
    engine.runRenderLoop(() => {
      if (model && rotationEnabled) {
        // Обертання моделі
        model.rotation.y += 0.0025; // Регулюйте швидкість обертання
      }

      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, [rotationEnabled]);

  return (
    <>
      {loading && <Loader position="fixed" size="80" />}
      <canvas ref={canvasRef} className={css.canvas} />
    </>
  );
}
