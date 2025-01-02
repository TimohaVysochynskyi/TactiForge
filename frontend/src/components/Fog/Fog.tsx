import css from "./Fog.module.css";

export default function Fog() {
  return (
    <>
      <div className={css.fogWrapper}>
        <div className={css.fog}>
          <div className={css.image01}></div>
          <div className={css.image02}></div>
        </div>
        <div className={css.fog}>
          <div className={css.image01}></div>
          <div className={css.image02}></div>
        </div>
        <div className={css.fog}>
          <div className={css.image01}></div>
          <div className={css.image02}></div>
        </div>
      </div>
    </>
  );
}
