import css from "./WeaponLabel.module.css";

export default function WeaponLabel() {
  return (
    <>
      <div className={css.container}>
        <h2 className={css.title}>АК-74</h2>
        <div className={css.description}>
          <p className={css.text}>1974</p>
          <p className={css.text}>СРСР</p>
        </div>
      </div>
    </>
  );
}
