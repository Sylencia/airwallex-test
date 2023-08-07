import { useState } from "react";
import styles from "./App.module.scss";
import { Modal } from "./Modal";
import { SignupForm } from "./SignupForm";
import { Success } from "./Success";

const App = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(true);

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        {isSigningUp ? (
          <SignupForm
            handleSuccess={() => {
              setIsSigningUp(false);
            }}
          />
        ) : (
          <Success
            handleClose={() => {
              setModalOpen(false);
              setIsSigningUp(true);
            }}
          />
        )}
      </Modal>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerText}>Broccoli & Co.</div>
        </header>
        <div className={styles.main}>
          <div className={styles.title}>A better way to enjoy every day.</div>
          <div className={styles.subtitle}>
            Be the first to know when we launch.
          </div>
          <button
            className={styles.button}
            onClick={() => {
              setModalOpen(true);
              setIsSigningUp(true);
            }}
          >
            Request an invite
          </button>
        </div>
        <footer className={styles.footer}>
          <div>Made with ♥ in Melbourne.</div>
          <div>©️ 2023 Broccoli & Co. All rights reserved.</div>
        </footer>
      </div>
    </>
  );
};

export default App;
