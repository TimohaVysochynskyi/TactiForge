import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import css from "./AppBar.module.css";

export default function AppBar() {
  return (
    <>
      <header className={css.header}>
        <div className={css.logoWrapper}>
          <Link to="/">
            <img src="/assets/logo.svg" alt="Логотип" className={css.logo} />
          </Link>
          <h2 className={css.subtitle}>Куємо безпечне майбутнє</h2>
        </div>
        <div className={css.navigation}>
          <Navigation />
        </div>
      </header>
    </>
  );
}
