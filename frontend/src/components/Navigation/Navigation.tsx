import { NavLink } from "react-router-dom";

import css from "./Navigation.module.css";

export default function Navigation() {
  return (
    <>
      <ul className={css.list}>
        <li className={css.item}>
          <NavLink className={css.link} to="/">
            Головна
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink className={css.link} to="/">
            Про проєкт
          </NavLink>
        </li>
        <li className={css.item}>
          <NavLink className={css.link} to="/">
            Допомогти
          </NavLink>
        </li>
      </ul>
    </>
  );
}