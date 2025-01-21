import { GrPlayFill } from "react-icons/gr";
import Navigation from "../Navigation/Navigation";

import { IoTriangleSharp } from "react-icons/io5";

import css from "./HomeMenu.module.css";
import Socials from "../Socials/Socials";

type Props = {
  setStarted: () => void;
};

export default function HomeMenu({ setStarted }: Props) {
  return (
    <>
      <Navigation />
      <div className={css.colMiddle}>
        {/* <img src="/assets/logo.svg" alt="Логотип" className={css.logo} /> */}
        <div className={css.titleWrapper}>
          <IoTriangleSharp className={css.icon} />
          <h1 className={css.title}>DigitalArmsLab</h1>
        </div>
        <h2 className={css.subtitle}>Лабораторія безпечного майбутнього</h2>
        <button
          className={css.startButton}
          onClick={() => setStarted()}
          type="button"
        >
          <GrPlayFill className={css.startIcon} />
          Розпочати
        </button>
      </div>
      <Socials />
    </>
  );
}
