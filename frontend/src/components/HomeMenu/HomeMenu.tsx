import { GrPlayFill } from "react-icons/gr";
import Navigation from "../Navigation/Navigation";
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
        <img src="/assets/logo.svg" alt="Логотип" className={css.logo} />
        <h2 className={css.subtitle}>Куємо безпечне майбутнє</h2>
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
