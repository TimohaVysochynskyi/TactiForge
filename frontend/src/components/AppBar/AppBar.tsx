import Navigation from "../Navigation/Navigation";
import css from "./AppBar.module.css";

export default function AppBar() {
  return (
    <>
      <header className={css.header}>
        <Navigation />
        <img src="/assets/logo.svg" alt="Логотип" className={css.logo} />
        <h2 className={css.subtitle}>Куємо безпечне майбутнє</h2>
      </header>
    </>
  );
}
