import { FC } from "react";
import styles from "../styles/Home.module.css";
import CircularProgress from "@mui/material/CircularProgress";

interface SendButtonProps {
  loading: boolean;
  onSubmit: () => void;
}

export const SendButton: FC<SendButtonProps> = ({ loading, onSubmit }) => {
  return (
    <>
      <button
        onKeyDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSubmit();
        }}
        disabled={loading}
        className={styles.generatebutton}
      >
        {loading ? (
          <div className={styles.loadingwheel}>
            <CircularProgress color="inherit" size={20} />{" "}
          </div>
        ) : (
          <svg viewBox="0 0 20 20" className={styles.svgicon} xmlns="http://www.w3.org/2000/svg">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        )}
      </button>
    </>
  );
};
