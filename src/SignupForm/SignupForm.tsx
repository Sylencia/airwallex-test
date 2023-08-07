import { FormEvent, useRef, useState } from "react";
import styles from "./SignupForm.module.scss";
import { verifyEmail } from "../utils/FormVerification";
import { submitForm } from "../utils/SubmitForm";

type SignupFormParams = {
  handleSuccess: () => void;
};

export const SignupForm = ({ handleSuccess }: SignupFormParams) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const emailConfirmRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();
  const [isPendingRequest, setIsPendingRequest] = useState<boolean>(false);

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    setIsPendingRequest(true);

    const name: string = nameRef.current?.value ?? "";
    const email: string = emailRef.current?.value ?? "";
    const emailConfirm: string = emailConfirmRef.current?.value ?? "";

    const verifyResponse = verifyEmail(email, emailConfirm);

    if (verifyResponse.success) {
      await submitForm(name, email)
        .then(() => {
          setError("");
          handleSuccess();
        })
        .catch((err) => setError(String(err)));
    } else {
      setError(verifyResponse.error);
    }

    setIsPendingRequest(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Request an invite</h1>
      <hr />
      <form onSubmit={onSubmitForm} className={styles.form}>
        <div className={styles.formField}>
          <label htmlFor="name" className={styles.formLabel}>
            Name
          </label>
          <input
            type="text"
            id="name"
            className={styles.formInput}
            ref={nameRef}
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="email" className={styles.formLabel}>
            Email
          </label>
          <input
            type="text"
            id="email"
            className={styles.formInput}
            ref={emailRef}
          />
        </div>

        <div className={styles.formField}>
          <label htmlFor="emailConfirm" className={styles.formLabel}>
            Confirm Email
          </label>
          <input
            type="text"
            id="emailConfirm"
            className={styles.formInput}
            ref={emailConfirmRef}
          />
        </div>

        <button
          type="submit"
          disabled={isPendingRequest}
          className={styles.button}
        >
          Send
        </button>
        <div className={styles.error}>{error}</div>
      </form>
    </div>
  );
};
