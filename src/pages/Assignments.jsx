/* eslint-disable react/prop-types */

import { store } from "../utils/Store";

// eslint-disable-next-line no-unused-vars
function Assignment({ id, title, description, classroom, teacher, teacherPhoto, deadline, counts }) {
  return (
    <>
      <div className="row ms-2 mt-5">
        <h2 className="tw-h2">{title}</h2>
        <div className="my-3 d-flex flex-row">
          <img src={`${teacherPhoto ? store+teacherPhoto : "UserPlaceholder.svg"}`} alt="Profile Guru" className='tw-rounded-full tw-w-[32px] tw-h-[32px]'/>
          <p className="tw-text-gray ms-3 pt-1 text-secondary">{classroom} - {teacher}</p>
        </div>
        <p className="tw-text-base my-3">Deskripsi: {description}</p>
        <p className="tw-text-base my-3 text-secondary">{counts} Soal - Deadline {deadline}</p>
        <button onClick={() => {//</div>sessionStorage.setItem("assignment_id", id); sessionStorage.setItem("page", "assignment"); location.reload();
        alert("Fitur masih dalam konstruksi!")}} className="tw-text-white mt-3 ms-2 tw-text-base btn btn-success col-3">Lihat Tugas</button>
      </div>
    </>
  )
}

export default function Assignments({ cacheData, updateCacheData }) {
  return (
    <>
      <div className="container p-4">
        <div className="row">
          {/* Assignments list */}
          <div className="col-8 tw-border-r tw-border-grey">
            {/* Filter */}
            <div className="d-flex align-items-center tw-btn tw-w-fit">
              <span className="tw-text-3xl tw-font-semibold me-3">Semua Tugas</span>
              <img src="ArrowDown.svg" alt="Arrow Down" className="tw-w-[16px] tw-h-[16px]" />
            </div>

            {/* Assignment Card */}
            {cacheData.classroomsData.map((classroom) => {
              const { name: classroomName, teacher } = classroom;
              const assignments = classroom.assignments.map((assignment) => {
                const { id, title, description, deadline } = assignment;
                return <Assignment key={id} id={id} title={title} description={description} classroom={classroomName} teacher={teacher.name} teacherPhoto={teacher.photo} deadline={deadline} counts={classroom.assignments.length} />
              });
              return assignments;
            })}
          </div>
        </div>
      </div>
    </>
  )
}