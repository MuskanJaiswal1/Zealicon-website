import React from "react";
import styles from "./Modal.module.css";
import Modal from "../../Pages/Modal/Modal";

const ModalWrap = ({ setIsModalOpen }) => {
  return (
    <div className={styles.modalContainer}>
      <div
        className={styles.modalOverlay}
        onClick={() => setIsModalOpen(false)}
      />
      <div className={styles.modalContent}>
        <div className={styles.modalScrollableContent}>
          <Modal setIsModalOpen={setIsModalOpen} />
        </div>
      </div>
    </div>
  );
};

export default ModalWrap;
