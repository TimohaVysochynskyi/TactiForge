import { useRef, useState, useEffect } from "react";
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
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import Loader from "../Loader/Loader";
import css from "./SoldierScene.module.css";

export default function SoldierScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationGroupsRef = useRef<AnimationGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);

    scene.clearColor = new Color4(0); // Прозоре тло сцени

    const onSceneReady = (scene: Scene) => {
      // Налаштування камери
      const camera = new ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 2.4,
        5,
        new Vector3(0, 1.8, 0),
        scene
      );
      camera.attachControl(scene.getEngine().getRenderingCanvas(), false);
      camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
      camera.lowerAlphaLimit = camera.upperAlphaLimit = camera.alpha;
      camera.lowerBetaLimit = camera.upperBetaLimit = camera.beta;

      // Додаткове освітлення
      const ambientLight = new HemisphericLight(
        "ambientLight",
        new Vector3(0, 1, 0),
        scene
      );
      ambientLight.intensity = 0.9;

      const directionalLight = new DirectionalLight(
        "directionalLight",
        new Vector3(-1, -2, -1),
        scene
      );
      directionalLight.intensity = 1;
      directionalLight.position = new Vector3(5, 10, 5);

      // Завантаження моделі з анімаціями
      SceneLoader.ImportMesh(
        "",
        "assets/", // Заміна на реальний шлях
        "soldier.glb",
        scene,
        (meshes, _, __, animationGroups) => {
          const soldier = meshes[0] as Mesh;
          soldier.position = new Vector3(0, 0, 0);
          animationGroupsRef.current = animationGroups;

          playAnimation("Talking1");

          // Убезпечення завершення лоадера тільки після появи моделі
          setLoading(false);
        }
      );
    };

    const playAnimation = (animationName: string) => {
      animationGroupsRef.current.forEach((group) => group.stop());
      const animationGroup = animationGroupsRef.current.find(
        (group) => group.name === animationName
      );
      animationGroup?.start(true);
    };

    onSceneReady(scene);

    // Запуск рендеру сцени
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Зміна розміру при зміні розміру вікна
    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return (
    <>
      {loading && (
        <div className={css.loader}>
          <Loader size="80" />
        </div>
      )}
      <div className={css.scene}>
        <canvas ref={canvasRef} className={css.canvas} />
        <div className={css.gradient}></div>
      </div>
    </>
  );
}
