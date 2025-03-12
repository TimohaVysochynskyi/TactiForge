import { motion } from "framer-motion";
import css from "./Features.module.css";

export default function Features() {
  return (
    <>
      <div className={css.container}>
        <ul className={css.list}>
          <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={css.item}
          >
            <p className={css.number}>01</p>
            <div className={css.col}>
              <p className={css.title}>Інтерактивні 3D-моделі зброї</p>
              <p className={css.text}>
                У DigitalArmsLab ти можеш детально вивчати зброю у тривимірному
                просторі. Кожна модель ретельно відтворена з урахуванням
                реальних характеристик. Досліджуй зброю з усіх ракурсів, змінюй
                режими огляду та порівнюй радянські та натівські аналоги.
              </p>
            </div>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className={css.item}
          >
            <p className={css.number}>02</p>
            <div className={css.col}>
              <p className={css.title}>Анімація збірки та розбірки</p>
              <p className={css.text}>
                Від теорії – до практики! Наші інтерактивні анімації покажуть
                покроковий процес розбирання та збирання зброї. Дивись, вивчай
                та відточуй знання, щоб бути впевненим у своїх навичках.
              </p>
            </div>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className={css.item}
          >
            <p className={css.number}>03</p>
            <div className={css.col}>
              <p className={css.title}>Теоретичний матеріал</p>
              <p className={css.text}>
                Отримуй глибокі знання про кожну одиницю зброї: її конструкцію,
                технічні характеристики та бойове застосування. Голосовий
                провідник допоможе краще зрозуміти матеріал, а інтерактивний
                формат зробить навчання захопливим.
              </p>
            </div>
          </motion.li>
        </ul>
      </div>
    </>
  );
}
