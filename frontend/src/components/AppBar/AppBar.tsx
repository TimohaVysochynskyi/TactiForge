import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import { IoTriangleSharp } from "react-icons/io5";
import css from "./AppBar.module.css";

export default function AppBar() {
  return (
    <>
      <header className={css.header}>
        <div className={css.logoWrapper}>
          <Link to="/" className={css.link}>
            <div className={css.titleWrapper}>
              <IoTriangleSharp className={css.icon} />
              <h1 className={css.title}>DigitalArmsLab</h1>
            </div>
          </Link>
          <h2 className={css.subtitle}>Лабораторія безпечного майбутнього</h2>
        </div>
        <div className={css.navigation}>
          <Navigation />
        </div>
      </header>
    </>
  );
}
