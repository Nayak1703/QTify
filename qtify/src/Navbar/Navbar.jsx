import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo.jsx";
import Search from "../Search/Search";
import styles from "./Navbar.module.css";
import ModalComponent from "../Modal/ModalComponent.jsx";

//
function Navbar({ searchData }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoImg}>
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <Search
        placeholder="Search a song of your choice"
        searchData={searchData}
      />
      <ModalComponent />
    </nav>
  );
}

export default React.memo(Navbar);
