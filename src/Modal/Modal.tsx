import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import cx from "classnames";
import styles from "./Modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const [active, setActive] = useState<boolean>(false);
  const background = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = background;
    const onTransitionEnd = () => setActive(isOpen);

    const onKeyPressHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const onMouseClickHandler = (e: MouseEvent) => {
      if (e.target === current) {
        onClose();
      }
    };

    if (current) {
      current.addEventListener("transitionend", onTransitionEnd);
      current.addEventListener("click", onMouseClickHandler);
      window.addEventListener("keyup", onKeyPressHandler);
    }

    if (isOpen) {
      window.setTimeout(() => {
        (document.activeElement as HTMLElement).blur();
        setActive(isOpen);
      }, 10);
    }

    return () => {
      if (current) {
        current.removeEventListener("transitionend", onTransitionEnd);
        current.removeEventListener("click", onMouseClickHandler);
      }

      window.removeEventListener("keyup", onKeyPressHandler);
      setActive(false);
    };
  }, [isOpen, onClose]);

  return isOpen
    ? createPortal(
        <div
          data-testid="modal-background"
          ref={background}
          className={cx(styles.modal, {
            [styles.active]: active && isOpen,
          })}
        >
          {children}
        </div>,
        document.body
      )
    : null;
};
