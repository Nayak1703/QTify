import React from "react";
import Chip from "@mui/material/Chip";
import styles from "./Card.module.css";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

const Card = ({ img, chipData, title, altName, totalSongNum, artist }) => {
  const positionRef = React.useRef({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef(null);
  const areaRef = React.useRef(null);

  const handleMouseMove = (event) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };
  return (
    <Tooltip
      title={artist ? `${artist}` : `${totalSongNum} Songs`}
      placement="top"
      arrow
      PopperProps={{
        popperRef,
        anchorEl: {
          getBoundingClientRect: () => {
            return new DOMRect(
              positionRef.current.x,
              areaRef.current.getBoundingClientRect().y,
              0,
              0
            );
          },
        },
      }}
    >
      {artist ? (
        <div
          className={styles.card}
          ref={areaRef}
          onMouseMove={handleMouseMove}
        >
          <div className={styles.cardMedia}>
            <img className={styles.cardImg} src={img} alt={altName} />
            <div className={styles.cardInfo}>
              <Chip
                label={`${chipData} Likes`}
                size="small"
                className={styles.cardChip}
              />
            </div>
          </div>
          <p className={styles.cardTitle}>{title}</p>
        </div>
      ) : (
        <Link to={`album/${altName}`} className={styles.cardLink}>
          <div
            className={styles.card}
            ref={areaRef}
            onMouseMove={handleMouseMove}
          >
            <div className={styles.cardMedia}>
              <img className={styles.cardImg} src={img} alt={altName} />
              <div className={styles.cardInfo}>
                <Chip
                  label={`${chipData} Follows`}
                  size="small"
                  className={styles.cardChip}
                />
              </div>
            </div>
            <p className={styles.cardTitle}>{title}</p>
          </div>
        </Link>
      )}
    </Tooltip>
  );
};

export default Card;
