import React from "react";
import styles from "./skeleton.module.css";

const Skeleton = ({ number }) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid} aria-label="Product list skeleton">
        {[...Array(number)].map((_, i) => (
          <div key={i} className={styles.gridItem}>
            <div className={styles.gridBox}></div>
            <div className={styles.info}>
              <div className={styles.line}></div>
              <div
                className={styles.line}
                style={{ marginTop: "0.7rem" }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
