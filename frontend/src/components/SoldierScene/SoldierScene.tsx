import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  DirectionalLight,
  Vector3,
  Color4,
  AnimationGroup,
  SceneLoader,
  Mesh,
  Animation,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

import Loader from "../Loader/Loader";

import css from "./SoldierScene.module.css";

type Props = {
  animation: string;
  children: React.ReactNode;
};

export default function SoldierScene({ animation, children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cameraRef = useRef<ArcRotateCamera | null>(null); // Реф для камери
  const animationGroupsRef = useRef<AnimationGroup[]>([]);
  const [loading, setLoading] = useState(true);

  // Функція для відтворення анімації
  const playAnimation = (animationName: string) => {
    animationGroupsRef.current.forEach((group) => group.stop());
    const animationGroup = animationGroupsRef.current.find(
      (group) => group.name === animationName
    );
    animationGroup?.start(true);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0);

    // Завантаження моделі
    SceneLoader.ImportMesh(
      "",
      "assets/", // Заміна на реальний шлях
      "soldier.glb",
      scene,
      (meshes, _, __, animationGroups) => {
        const soldier = meshes[0] as Mesh;
        soldier.position = new Vector3(0, 0.1, 0);
        animationGroupsRef.current = animationGroups;

        // Запуск початкової анімації
        playAnimation(animation);

        setLoading(false);
      }
    );

    // Налаштування камери
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 2.2,
      4.65,
      new Vector3(-0.3, 1.82, 0),
      scene
    );
    cameraRef.current = camera; // Збереження камери у реф
    camera.attachControl(scene.getEngine().getRenderingCanvas(), false);
    camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
    camera.lowerAlphaLimit = camera.upperAlphaLimit = camera.alpha;
    camera.lowerBetaLimit = camera.upperBetaLimit = camera.beta;

    // Налаштування освітлення
    const ambientLight = new HemisphericLight(
      "ambientLight",
      new Vector3(0, 1, 0),
      scene
    );
    ambientLight.intensity = 1;

    const directionalLight = new DirectionalLight(
      "directionalLight",
      new Vector3(-1, -2, -1),
      scene
    );
    directionalLight.intensity = 1.2;
    directionalLight.position = new Vector3(5, 10, 5);

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

  useEffect(() => {
    // Відтворення анімації при зміні пропсу animation
    setLoading(true);
    setTimeout(() => {
      if (animationGroupsRef.current.length > 0) {
        playAnimation(animation);
      }
      setLoading(false);
    }, 250);
  }, [animation]);

  // Ефект для анімації зміни позиції камери при зміні `chat`
  useEffect(() => {
    if (cameraRef.current) {
      const targetPosition = new Vector3(0, 1.82, 0);
      const targetRadius = 5;

      // Анімація переміщення камери
      Animation.CreateAndStartAnimation(
        "cameraMove",
        cameraRef.current,
        "target",
        30, // частота кадрів
        0, // тривалість
        cameraRef.current.target,
        targetPosition,
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );

      Animation.CreateAndStartAnimation(
        "cameraZoom",
        cameraRef.current,
        "radius",
        30,
        0,
        cameraRef.current.radius,
        targetRadius,
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );
    }
  }, []);

  return (
    <>
      <div className={clsx(css.scene, css.sceneBordered)}>
        <canvas
          ref={canvasRef}
          className={clsx(css.canvas, css.canvasZoomed)}
        />
        {loading && <Loader position="absolute" size="80" />}
        {<>{children}</>}
      </div>
    </>
  );
}
