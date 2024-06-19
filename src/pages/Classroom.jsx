/* eslint-disable react/prop-types */
import { useState } from "react";

function Assignment({ id, title, teacher }) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-4 my-3 tw-bg-white tw-rounded-lg border-1 tw-border-grey">
        <img src="TaskCard.svg" alt="Task" className="tw-w-[48px] tw-h-[48px] me-3" />
        <span>{teacher} mengunggah tugas baru: {title.slice(0, 30) + (title.length > 30 ? '...' : '')}</span>
      </div>
    </>
  )
}

export default function Classroom() {
  const [page, setPage] = useState("assignments");

  const classroom = JSON.parse(localStorage.getItem("classrooms")).find(val => val.id === sessionStorage.getItem("classroom_id"));

  const colors = {
    'Sains': "#DCF3ED",
    'Matematika': "#F3E4DF",
    'Bahasa': "#FDEECA",
    'Informatika': "#DBDFF4",
    'Sosial': "#FDE9E0",
    "Seni": "#F8C8E5",
  };
  return (
    <>
      <div className="container p-4">
        {/* Classroom banner */}
        <div className="position-relative w-100 h-100">
          <img src={`classroom_banner/${classroom.subject}.svg`} alt={classroom.subject} className="tw-shadow-lg tw-rounded-[48px]" />
          <div style={{backgroundColor: colors[classroom.subject]}} className={`position-absolute tw-start-8 tw-bottom-8 p-4 tw-rounded-lg tw-shadow-lg border-1 tw-border-grey`}>
            <h1 className="tw-text-3xl tw-font-bold">{classroom.name}</h1>
            <h6 className="tw-text-lg tw-opacity-50 tw-font-normal">{classroom.teacher.name}</h6>
          </div>
        </div>

        <br />

        {/* Navigation */}
        <div className="d-flex align-items-center tw-text-lg tw-font-medium tw-opacity-50">
          <div onClick={() => setPage("assignments")} className={`hover:tw-text-blue hover:tw-cursor-pointer mx-2 ${page === "assignments" && "tw-text-blue"}`}>Tugas</div>
          <div onClick={() => setPage("submissions")} className={`hover:tw-text-blue hover:tw-cursor-pointer mx-2 ${page === "submissions" && "tw-text-blue"}`}>Pengumpulan</div>
          <div onClick={() => setPage("members")} className={`hover:tw-text-blue hover:tw-cursor-pointer mx-2 ${page === "members" && "tw-text-blue"}`}>Anggota</div>
        </div>

        <br />

        {/* Classroom content */}
        {/* Assignment page */}
        {page === "assignments" && (
          <>
          {/* Create new assignment */}
          <button onClick={() => {sessionStorage.setItem("page", "createAssignment"); location.reload();}} className="p-3 tw-bg-primary tw-rounded-md tw-text-white hover:tw-opacity-75">+ Buat Tugas Baru</button>

          <br /><br />

          {
            classroom.assignments && classroom.assignments.length > 0 ? (
              classroom.assignments.map(assignment => (
                <Assignment key={assignment.id} id={assignment.id} title={assignment.title} teacher={classroom.teacher.name} />
              ))
            ) : (
              <div>Tidak ada tugas</div>
            )
          }
          </>
        )}
      </div>
    </>
  )
}