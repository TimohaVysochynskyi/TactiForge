import { Link } from "react-router-dom";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <div className={css.container}>
        <p className={css.title}>
          Лабораторія <span>безпечного</span> майбутнього
        </p>
        <p className={css.subtitle}>
          Занурся у світ сучасних та історичних зразків озброєння! Вивчай
          характеристики, взаємодій із 3D-моделями та досліджуй процеси
          розбирання та збирання. Голосовий провідник – український військовий –
          допоможе краще зрозуміти особливості кожної одиниці зброї.
        </p>
        <Link to="/laboratory" className={css.button}>
          Розпочати
        </Link>
      </div>
    </>
  );
}
