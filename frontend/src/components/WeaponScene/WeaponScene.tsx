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
  Mesh,
  Nullable,
  Observer,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

import css from "./WeaponScene.module.css";

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
  const [animationGroups, setAnimationGroups] = useState<
    AnimationGroup[] | null
  >(null);
  const [currentAnimation, setCurrentAnimation] =
    useState<AnimationGroup | null>(null);
  const [, setModel] = useState<Mesh | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0, 0, 0, 0);

    SceneLoader.ImportMesh(
      "",
      "/assets/models/",
      `${media}.glb`,
      scene,
      (meshes, _particleSystems, _skeletons, loadedAnimationGroups) => {
        const loadedModel = meshes[0] as Mesh;
        loadedModel.scaling = new Vector3(1, 1, -1);
        loadedModel.position = new Vector3(0, 0, -1);
        loadedModel.rotation = new Vector3(0, 0, 0);
        setModel(loadedModel);

        setAnimationGroups(loadedAnimationGroups);
      }
    );

    const camera = new ArcRotateCamera(
      "camera",
      0,
      Math.PI / 2.25,
      12,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);
    camera.wheelPrecision = 50;
    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 20;

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

    // Додаємо зміну кута камери
    let rotationObserver: Nullable<Observer<Scene>> = null;

    if (rotationEnabled) {
      rotationObserver = scene.onBeforeRenderObservable.add(() => {
        camera.alpha += 0.003; // Повільне обертання камери
      });
    }

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      if (rotationObserver) {
        scene.onBeforeRenderObservable.remove(rotationObserver);
      }
      engine.dispose();
    };
  }, [media, rotationEnabled]);

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
  }, [animation, animationGroups, currentAnimation]);

  return (
    <>
      <canvas ref={canvasRef} className={css.canvas} />
    </>
  );
}
