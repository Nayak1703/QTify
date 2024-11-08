import React from "react";
import styles from "./Footer.module.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoImage from "../assets/logo.png";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.imgParent}>
          <img src={LogoImage} alt="logo" className={styles.img} />
        </div>

        <p className={styles.footerDes}>Feel the Beat, Live the Vibe</p>
        <p className={styles.footerCre}>Made by yash nayak</p>
      </div>
      <div className={styles.footerContent}>
        <p className={styles.footerMsg}>Connect with me</p>
        <div className={styles.socailMediaLink}>
          <a href="mailto:yashsukantnayak@gmail.com" target="_blank">
            <EmailIcon href="https://github.com/Nayak1703" />
          </a>
          <a href="https://github.com/Nayak1703" target="_blank">
            <GitHubIcon />
          </a>
          <a href="https://www.linkedin.com/in/yash-nayak-hk/" target="_blank">
            <LinkedInIcon />
          </a>
          <a href="https://www.instagram.com/nayakyash10/" target="_blank">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Footer);
