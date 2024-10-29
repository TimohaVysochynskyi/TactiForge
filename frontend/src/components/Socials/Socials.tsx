import { FaTelegram, FaInstagram, FaGithub } from "react-icons/fa";

import css from "./Socials.module.css";

export default function Socials() {
  return (
    <>
      <div className={css.container}>
        <p className={css.name}>Височинський Тимофій</p>
        <ul className={css.list}>
          <li className={css.item}>
            <a href="https://t.me/MR_DonKarleone" className={css.link}>
              <FaTelegram className={css.icon} />
            </a>
          </li>
          <li className={css.item}>
            <a
              href="https://www.instagram.com/timohavysach/"
              className={css.link}
            >
              <FaInstagram className={css.icon} />
            </a>
          </li>
          <li className={css.item}>
            <a
              href="https://github.com/TimohaVysochynskyi"
              className={css.link}
            >
              <FaGithub className={css.icon} />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
