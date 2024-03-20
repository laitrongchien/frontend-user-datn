import React from "react";

const Modal = ({ children }: { children?: React.ReactNode }) => {
  return (
    <dialog id="my_modal_2" className="modal right-2">
      <div className="modal-box">{children}</div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
