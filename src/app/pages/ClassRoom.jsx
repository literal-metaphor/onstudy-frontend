import TaskCard from "../components/TaskCard"

const ClassRoom = () => {
  return (
    <>
      <div className="row">
        <div className="col-12 p-0 tw-h-screen">
          <div className="tw-bg-[#DCF3ED] tw-h-[40%] tw-rounded-b-3xl p-4 d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <div className="fw-bold tw-ms-[4rem] my-4">
                <p className="tw-text-[3rem] poppins">IPA</p>
                <p className="fs-6 roboto">36 Murid</p>
              </div>
              <div className="d-flex justify-content-center tw-ms-[4rem] align-items-center my-4">
                <img src="Classroom/teacherplaceholder.svg" alt="Filter assignments" className="tw-w-[72px] tw-h-[72px] rounded-circle mx-2" />
                <div className="fs-6 mx-2">
                  <p className="fw-semibold ">Bambang S.Pd</p>
                  <p className="tw-text-sm">Guru</p>
                </div>
              </div>
            </div>
            <img src="Dashboard/ipa.svg" alt="Classroom Image" className="tw-w-[200px] tw-h-[200px] position-absolute tw-end-[26rem]" />
            <div className="d-flex align-self-end p-3">
              <img src="Classroom/assignments.svg" alt="Filter assignments" className="tw-w-[52px] pb-1  tw-h-[52px] mx-4" />
              <img src="Classroom/materials.svg" alt="Filter assignments" className="tw-w-[36px] tw-h-[52px] mx-4" />
              <img src="Classroom/add.svg" alt="Add Materials" className="tw-w-[36px] tw-h-[52px] mx-4" />
            </div>
          </div>
          <br className="my-4" />
          <div className="w-100 d-flex flex-column align-items-center tw-h-[60%] tw-overflow-y-scroll pb-5">
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
          </div>
        </div>
      </div>
    </>
  )
}

export default ClassRoom
