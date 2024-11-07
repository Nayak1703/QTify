import React from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.parent}>
      <h1 className={styles.heading}>Oops! Page not found</h1>

      <Link to="/">
        <button className={styles.btn}>Go Back to Home Page</button>
      </Link>
    </div>
  );
};

export default NotFound;
