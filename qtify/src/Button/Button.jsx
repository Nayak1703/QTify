import React from "react";
import styles from "./Button.module.css";

const Button = ({ handleOpen, children }) => {
  return (
    <button onClick={handleOpen} className={styles.btn}>
      {children}
    </button>
  );
};

export default Button;
