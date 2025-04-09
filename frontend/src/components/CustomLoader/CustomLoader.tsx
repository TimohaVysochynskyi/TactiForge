import { useState } from "react";
import Loader from "../Loader/Loader";
import css from "./CustomLoader.module.css";

export default function CustomLoader() {
  const messages = [
    "Готуємо зброю...",
    "Підготовлюємо розмітку...",
    "Завантажуємо теорію...",
    "Робимо запит на базу даних...",
  ];

  const [currentMessage, setCurrentMessage] = useState<number>(0);

  function handleMessageChange() {
    if (currentMessage >= 3) setCurrentMessage(0);
    setCurrentMessage(currentMessage + 1);
  }
  setInterval(handleMessageChange, 3500);

  return (
    <>
      <div className={css.container}>
        <div className={css.contentWrapper}>{messages[currentMessage]}</div>
        <Loader size="80" position="absolute" />
      </div>
    </>
  );
}
