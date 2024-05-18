const TaskInput = () => {
  return (
    <dialog id="taskinput" className="tw-modal">
      <div className="tw-modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="tw-btn tw-btn-sm tw-btn-circle tw-btn-ghost poaition-absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click on ✕ button to close</p>
      </div>
    </dialog>
  );
};

export default TaskInput;
