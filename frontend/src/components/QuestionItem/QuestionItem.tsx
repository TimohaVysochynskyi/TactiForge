import css from "./QuestionItem.module.css";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function QuestionItem({ children, onClick }: Props) {
  return (
    <>
      <button type="button" className={css.button} onClick={onClick}>
        {children}
      </button>
    </>
  );
}
