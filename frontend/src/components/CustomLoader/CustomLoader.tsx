import { useState } from "react";
import Loader from "../Loader/Loader";
import css from "./CustomLoader.module.css";

export default function CustomLoader() {
  const messages = [
    "Завантаження моделей...",
    "Підготовка 3D-сцени...",
    "Завантаження теорії...",
    "Підключення анімацій...",
  ];

  const [currentMessage, setCurrentMessage] = useState<number>(0);

  function handleMessageChange() {
    if (currentMessage > 3) setCurrentMessage(0);
    setCurrentMessage(currentMessage + 1);
  }
  setInterval(handleMessageChange, 5500);

  return (
    <>
      <div className={css.container}>
        <div className={css.contentWrapper}>{messages[currentMessage]}</div>
        <Loader size="80" position="absolute" />
      </div>
    </>
  );
}
