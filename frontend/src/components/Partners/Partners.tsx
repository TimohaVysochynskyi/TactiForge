import { motion } from "framer-motion";
import css from "./Partners.module.css";

export default function Partners() {
  return (
    <>
      <div className={css.container}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={css.item}
        >
          <img
            className={css.image}
            src="/assets/partners/poklyk.jpg"
            alt="Фото партнера"
          />
          <p className={css.title}>ГО "Поклик Яру"</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={css.item}
        >
          <img
            className={css.image}
            src="/assets/partners/210.jpg"
            alt="Фото партнера"
          />
          <p className={css.title}>210 ОШП</p>
        </motion.div>
      </div>
    </>
  );
}
