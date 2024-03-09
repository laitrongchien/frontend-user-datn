const Modal = ({
  title,
  message,
  onConfirm,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
}) => {
  return (
    <dialog id="my_modal_2" className="modal right-2">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={onConfirm}>
              Xác nhận
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
