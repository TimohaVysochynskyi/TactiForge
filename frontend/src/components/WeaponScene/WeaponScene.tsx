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
  AnimationGroup,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

import css from "./WeaponScene.module.css";
import Loader from "../Loader/Loader";

type Props = {
  media: string;
  rotationEnabled: boolean;
  animation: string; // Назва анімації, яка передається з батьківського компонента
};

export default function WeaponScene({
  media,
  rotationEnabled,
  animation,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [animationGroups, setAnimationGroups] = useState<
    AnimationGroup[] | null
  >(null);
  const [currentAnimation, setCurrentAnimation] =
    useState<AnimationGroup | null>(null);

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
      (meshes, _particleSystems, _skeletons, loadedAnimationGroups) => {
        model = meshes[0];
        model.scaling = new Vector3(1, 1, -1);
        model.position = new Vector3(0, 0, 5);
        model.rotation = new Vector3(0, 1.5, 0);

        setAnimationGroups(loadedAnimationGroups); // Зберігаємо тільки анімаційні групи
        setLoading(false);
      }
    );

    // Камера
    const camera = new FreeCamera("camera", new Vector3(0, 0, -5), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvasRef.current, true);
    camera.speed = 0.4;
    camera.angularSensibility = 4000;

    camera.keysUp.push(87); // W
    camera.keysDown.push(83); // S
    camera.keysLeft.push(65); // A
    camera.keysRight.push(68); // D

    // Освітлення
    const ambientLight = new HemisphericLight(
      "ambientLight",
      new Vector3(0, 1, 0),
      scene
    );
    ambientLight.intensity = 2;

    const directionalLightFront = new DirectionalLight(
      "directionalLightFront",
      new Vector3(1, 1, 0),
      scene
    );
    directionalLightFront.intensity = 3;

    const directionalLightBack = new DirectionalLight(
      "directionalLightBack",
      new Vector3(-1, 1, 0),
      scene
    );
    directionalLightBack.intensity = 3;

    const blueLight = new PointLight("blueLight", new Vector3(0, 2, -5), scene);
    blueLight.intensity = 5;

    // Рендеринг сцени
    engine.runRenderLoop(() => {
      if (model && rotationEnabled) {
        model.rotation.y += 0.0025;
      }
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, [rotationEnabled, media]);

  // Зміна анімації при зміні пропсу animation
  useEffect(() => {
    if (!animationGroups || animationGroups.length === 0) return;

    // Зупиняємо попередню анімацію
    if (currentAnimation) {
      currentAnimation.stop(); // Зупиняємо анімацію
    }

    // Знаходимо потрібну анімацію за назвою
    const newAnimation = animationGroups.find(
      (group) => group.name === animation
    );
    if (newAnimation) {
      newAnimation.reset(); // Скидаємо анімацію до початкового стану
      newAnimation.loopAnimation = false; // Вимикаємо зациклення
      newAnimation.play(false); // Програємо лише один раз

      // Слухаємо завершення анімації
      newAnimation.onAnimationEndObservable.addOnce(() => {
        const lastFrame = newAnimation.to; // Останній кадр анімації
        newAnimation.goToFrame(lastFrame); // Залишаємо модель на останньому кадрі
      });

      setCurrentAnimation(newAnimation); // Зберігаємо нову активну анімацію
    }
  }, [animation, animationGroups]);

  return (
    <>
      {loading && <Loader position="fixed" size="80" />}
      <canvas ref={canvasRef} className={css.canvas} />
    </>
  );
}
