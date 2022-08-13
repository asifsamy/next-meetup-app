import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";

// const Backdrop = (props) => {
//   return <div className={classes.backdrop} onClick={props.onClose} />;
// };

// const ModalOverlay = (props) => {
//   return (
//     <div className={classes.modal}>
//       <div className={classes.content}>{props.children}</div>
//     </div>
//   );
// };

// const portalElement = document.getElementById("overlays");

// function Modal(props) {
//   return (
//     <>
//       {ReactDOM.createPortal(
//         <Backdrop onClose={props.onClose} />,
//         document.getElementById("overlays")
//       )}
//       {ReactDOM.createPortal(
//         <ModalOverlay>{props.children}</ModalOverlay>,
//         document.getElementById("overlays")
//       )}
//     </>
//   );
// }

function Modal({ show, onClose, children }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <>
      <div className={classes.backdrop} onClick={onClose} />
      <div className={classes.modal}>
        <div className={classes.content}>{children}</div>
      </div>
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("overlays")
    );
  } else {
    return null;
  }
}

export default Modal;
