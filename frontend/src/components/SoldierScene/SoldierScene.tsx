import { useRef, useState } from "react";
import {
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  DirectionalLight,
  Vector3,
  AnimationGroup,
  SceneLoader,
  Mesh,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import CanvasComponent from "../CanvasComponent/CanvasComponent";
import Loader from "../Loader/Loader";
import css from "./SoldierScene.module.css";

export default function SoldierScene() {
  const animationGroupsRef = useRef<AnimationGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const onSceneReady = (scene: Scene) => {
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

    SceneLoader.ImportMesh(
      "",
      "assets/",
      "soldier.glb",
      scene,
      (meshes, _, __, animationGroups) => {
        const soldier = meshes[0] as Mesh;
        soldier.position = new Vector3(0, 0, 0);

        animationGroupsRef.current = animationGroups;
        playAnimation("Talking1");

        setLoading(false); // Знімаємо екран завантаження після завершення
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

  return (
    <>
      {loading && <Loader size="80" />}
      <div className={css.scene}>
        <CanvasComponent
          onSceneReady={onSceneReady}
          clearColor={[0.1, 0.1, 0.1, 1]}
        />
        <div className={css.gradient}></div>
      </div>
    </>
  );
}
