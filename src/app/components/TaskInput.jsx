const TaskInput = () => {
  return (
    <dialog id="taskinput" className="tw-modal">
    <div className="tw-modal-box">
      <h3 className="tw-font-bold tw-text-lg">Bergabung dengan Kelas</h3>
      <form onSubmit={handleTaskInput} className="py-4">
        <div className="mb-3">
          <label htmlFor="Nama Kelas" className="form-label">Kode Kelas</label>
          <input type="text" className="form-control" id="Nama Kelas" name="class_id" placeholder="Salin kode kelas di sini..."/>
        </div>
        <br className="my-4" />
        <button type="submit" className="btn btn-primary">Masuk Kelas</button>
        <button type="reset" className="btn">Reset</button>
      </form>
      <div className="tw-modal-action">
        <form method="dialog">
          <button className="tw-btn">Keluar</button>
        </form>
      </div>
    </div>
  </dialog>
  );
};

export default TaskInput;
