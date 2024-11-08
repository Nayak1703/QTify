import React, { useState } from "react";
import styles from "./Form.module.css";

const FormComponent = ({ handleClose }) => {
  const [feedBack, setFeedBack] = useState({});

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleClose();
  };

  const handleFullName = (event) => {
    setFeedBack({ ...feedBack, fullName: event.target.value });
  };

  const handleEmail = (event) => {
    setFeedBack({ ...feedBack, email: event.target.value });
  };

  const handleSubject = (event) => {
    setFeedBack({ ...feedBack, subject: event.target.value });
  };

  const handleDescription = (event) => {
    setFeedBack({ ...feedBack, description: event.target.value });
  };

  return (
    <div className={styles.formParent}>
      <p className={styles.formHeading}>Feedback</p>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full name"
          value={feedBack.fullName}
          onInput={handleFullName}
          className={styles.inputFiled}
        />
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={feedBack.email}
          onInput={handleEmail}
          className={styles.inputFiled}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={feedBack.subject}
          onInput={handleSubject}
          className={styles.inputFiled}
        />
        <textarea
          rows="4"
          name="description"
          placeholder="Description"
          value={feedBack.description}
          onInput={handleDescription}
          className={styles.inputFiled}
        />
        <button type="submit" className={styles.inputSubmit}>
          Submit FeedBack
        </button>
      </form>
    </div>
  );
};

export default React.memo(FormComponent);
