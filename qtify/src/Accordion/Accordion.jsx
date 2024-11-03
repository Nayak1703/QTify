import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./Accordion.module.css";

const AccordionComponent = () => {
  const [faqData, setFaqData] = useState([]);

  const fetchFaqData = async () => {
    const response = await axios.get("https://qtify-backend-labs.crio.do/faq");
    setFaqData(response.data.data);
  };

  useEffect(() => {
    fetchFaqData();
  }, []);

  return (
    <div className={styles.faqParent}>
      <h1 className={styles.faqHeading}>FAQs</h1>
      <div className={styles.faqs}>
        {faqData.map((faq, index) => {
          if (index === 0)
            return (
              <Accordion key={index} defaultExpanded className={styles.accord}>
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ color: "#34c94b" }}
                      className={styles.accordExpandSymbol}
                    />
                  }
                  aria-controls="panel2-content"
                  id="panel2-header"
                  className={styles.accordSummary}
                >
                  <Typography className={styles.accordQues}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={styles.accordDetails}>
                  <Typography className={styles.accordAns}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          else
            return (
              <Accordion key={index} className={styles.accord}>
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ color: "#34c94b" }}
                      className={styles.accordExpandSymbol}
                    />
                  }
                  aria-controls="panel2-content"
                  id="panel2-header"
                  className={styles.accordSummary}
                >
                  <Typography className={styles.accordQues}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={styles.accordDetails}>
                  <Typography className={styles.accordAns}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
        })}
      </div>
    </div>
  );
};

export default AccordionComponent;
