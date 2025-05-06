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
  Nullable,
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
  const cameraRef = useRef<ArcRotateCamera | null>(null);
  const animationGroupsRef = useRef<AnimationGroup[]>([]);
  const sceneRef = useRef<Nullable<Scene>>(null);
  const engineRef = useRef<Nullable<Engine>>(null);
  const [loading, setLoading] = useState(true);

  // Анімація
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
    engineRef.current = engine;

    const scene = new Scene(engine);
    sceneRef.current = scene;
    scene.clearColor = new Color4(0, 0, 0, 0);

    SceneLoader.ImportMesh(
      "",
      "assets/",
      "soldier.glb",
      scene,
      (meshes, _, __, animationGroups) => {
        const soldier = meshes[0] as Mesh;
        soldier.position = new Vector3(0, 0.1, 0);
        animationGroupsRef.current = animationGroups;

        playAnimation(animation);
        setLoading(false);
      }
    );

    const camera = new ArcRotateCamera(
      "camera",
      Math.PI / 2,
      Math.PI / 2.2,
      4.65,
      new Vector3(-0.3, 1.82, 0),
      scene
    );
    cameraRef.current = camera;
    camera.attachControl(canvasRef.current, false);
    camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
    camera.lowerAlphaLimit = camera.upperAlphaLimit = camera.alpha;
    camera.lowerBetaLimit = camera.upperBetaLimit = camera.beta;

    new HemisphericLight(
      "ambientLight",
      new Vector3(0, 1, 0),
      scene
    ).intensity = 1;
    const dirLight = new DirectionalLight(
      "directionalLight",
      new Vector3(-1, -2, -1),
      scene
    );
    dirLight.intensity = 1.2;
    dirLight.position = new Vector3(5, 10, 5);

    engine.runRenderLoop(() => {
      scene.render();
    });

    const handleResize = () => engine.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      // Очищення анімацій
      animationGroupsRef.current.forEach((group) => group.dispose());

      // Зупинити все, диспознути все
      scene.stopAllAnimations();
      scene.meshes.forEach((mesh) => mesh.dispose());
      scene.materials.forEach((mat) => mat.dispose());
      scene.textures.forEach((tex) => tex.dispose());
      scene.lights.forEach((light) => light.dispose());
      scene.cameras.forEach((cam) => cam.dispose());

      scene.dispose();
      engine.dispose();

      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Відтворення анімації при зміні пропсу
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (animationGroupsRef.current.length > 0) {
        playAnimation(animation);
      }
      setLoading(false);
    }, 250);
  }, [animation]);

  // Анімація камери один раз
  useEffect(() => {
    if (cameraRef.current) {
      Animation.CreateAndStartAnimation(
        "cameraMove",
        cameraRef.current,
        "target",
        30,
        0,
        cameraRef.current.target,
        new Vector3(0, 1.82, 0),
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );

      Animation.CreateAndStartAnimation(
        "cameraZoom",
        cameraRef.current,
        "radius",
        30,
        0,
        cameraRef.current.radius,
        5,
        Animation.ANIMATIONLOOPMODE_CONSTANT
      );
    }
  }, []);

  return (
    <div className={clsx(css.scene, css.sceneBordered)}>
      <canvas ref={canvasRef} className={clsx(css.canvas, css.canvasZoomed)} />
      {loading && <Loader position="absolute" size="80" />}
      {children}
    </div>
  );
}
