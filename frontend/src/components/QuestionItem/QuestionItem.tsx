import css from "./QuestionItem.module.css";

type Props = {
  children: React.ReactNode;
};

export default function QuestionItem({ children }: Props) {
  return (
    <>
      <button type="button" className={css.button}>
        {children}
      </button>
    </>
  );
}
