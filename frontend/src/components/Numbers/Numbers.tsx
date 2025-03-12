import { motion } from "framer-motion";
import css from "./Numbers.module.css";

export default function Numbers() {
  return (
    <>
      <div className={css.container}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className={css.item}
        >
          <p className={css.number}>8</p>
          <p className={css.text}>зразків озброєння</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className={css.item}
        >
          <p className={css.number}>24</p>
          <p className={css.text}>блоки з теорією</p>
        </motion.div>
      </div>
    </>
  );
}
