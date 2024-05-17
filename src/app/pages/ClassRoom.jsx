const ClassRoom = () => {
  return (
    <>
    <div className="row">
        <div className="col-12 tw-rounded-b-3xl tw-bg-[#DCF3ED] p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <div className="fw-bold my-4">
                <p className="fs-1">IPA</p>
                <p className="fs-6">36 Murid</p>
              </div>
              <div className="d-flex justify-content-center align-items-center my-4">
                <img src="Classroom/teacherplaceholder.svg" alt="Filter assignments" className="tw-w-[48px] tw-h-[48px] mx-2" />
                <div className="fs-6 mx-2">
                  <p className="fw-semibold">Bambang S.Pd</p>
                  <p className="tw-text-sm">Guru</p>
                </div>
              </div>
            </div>
            <img src="Dashboard/ipa.svg" alt="Teacher Name" className="tw-w-[192px] tw-h-[192px]" />
            <div className="d-flex align-self-end p-3">
              <img src="Classroom/assignments.svg" alt="Filter assignments" className="tw-w-[36px] tw-h-[36px] mx-2" />
              <img src="Classroom/materials.svg" alt="Filter assignments" className="tw-w-[36px] tw-h-[36px] mx-2" />
              <img src="Classroom/add.svg" alt="Filter assignments" className="tw-w-[36px] tw-h-[36px] mx-2" />
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default ClassRoom
