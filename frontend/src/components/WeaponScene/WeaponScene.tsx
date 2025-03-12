import { useRef, useEffect, useState } from "react";
import {
  Engine,
  Scene,
  ArcRotateCamera,
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
  animation: string;
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
        model.position = new Vector3(-1, 0, 0);
        model.rotation = new Vector3(0, 1.5, 0);

        setAnimationGroups(loadedAnimationGroups);
        setLoading(false);
      }
    );

    // Камера з можливістю обертання навколо моделі
    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 2.5,
      12,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);
    camera.wheelPrecision = 50; // Налаштування чутливості зуму
    camera.lowerRadiusLimit = 2; // Мінімальне приближення
    camera.upperRadiusLimit = 20; // Максимальне віддалення

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
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, [media]);

  useEffect(() => {
    if (!animationGroups || animationGroups.length === 0) return;

    if (currentAnimation) {
      currentAnimation.stop();
    }

    const newAnimation = animationGroups.find(
      (group) => group.name === animation
    );
    if (newAnimation) {
      newAnimation.reset();
      newAnimation.loopAnimation = false;
      newAnimation.play(false);

      newAnimation.onAnimationEndObservable.addOnce(() => {
        const lastFrame = newAnimation.to;
        newAnimation.goToFrame(lastFrame);
      });

      setCurrentAnimation(newAnimation);
    }
  }, [animation, animationGroups]);

  return (
    <>
      {loading && <Loader position="fixed" size="80" />}
      <canvas ref={canvasRef} className={css.canvas} />
    </>
  );
}
