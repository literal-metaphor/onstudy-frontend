const TaskCard = () => {
  return (
  
      <div
        onClick={() => (window.location.search = "?route=material&material=id")}
        className="tw-rounded-xl my-2 p-4 tw-w-[90%] tw-bg-[#FCFBF9] tw-shadow-lg border-1 tw-border-black tw-border-opacity-50 hover:tw-scale-[98%] tw-transition tw-duration-300 hover:tw-cursor-pointer"
      >
        <div className="d-flex align-items-center">
          <img
            src="Classroom/newassignment.svg"
            alt="New Assignment"
            className="tw-w-[64px] tw-h-[64px] mx-2"
          />
          <div className="fs-6 mx-2">
            <div className="fw-semibold">
              Bambang S.Pd memposting tugas baru: Cara tumbuhan berkembang biak
            </div>
            <div className="fw-medium">11 Mei 2024</div>
          </div>
        </div>
      </div>
  
  );
};

export default TaskCard;
