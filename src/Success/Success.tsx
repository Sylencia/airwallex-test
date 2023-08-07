import styles from "./Success.module.scss";

type SuccessParams = {
  handleClose: () => void;
};

export const Success = ({ handleClose }: SuccessParams) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All done!</h1>
      <hr />
      <div className={styles.main}>
        You will be one of the first to experience Broccoli & Co. when we
        launch.
      </div>

      <button type="button" onClick={handleClose} className={styles.button}>
        OK
      </button>
    </div>
  );
};
