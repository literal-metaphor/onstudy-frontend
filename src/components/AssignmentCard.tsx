import { store } from "../utils/API";

export default function AssignmentCard({ id, title, description, classroom, teacher, teacherPhoto, deadline, counts }: { id: string, title: string, description: string, classroom: string, teacher: string, teacherPhoto: string | null, deadline: string, counts: number }) {
    return (
      <>
        <div className="border border-grey rounded-lg p-4 my-4 ms-4">
          <h2 className="font-bold text-3xl">{title}</h2>
          <div className="my-3 flex">
            <img src={`${teacherPhoto ? store+teacherPhoto : "UserPlaceholder.svg"}`} alt={teacher} className='rounded-full w-[32px] h-[32px]'/>
            <p className="text-gray ms-3 pt-1 text-primary">{classroom} - {teacher}</p>
          </div>
          <p className="text-base my-3">Deskripsi: {description}</p>
          <p className="text-base my-3 text-primary">{counts} Soal - Deadline {deadline}</p>
          <button onClick={() => {sessionStorage.setItem("assignment_id", id); sessionStorage.setItem("page", "assignment"); location.reload();}} className="text-white text-sm btn btn-success col-3">Lihat Tugas</button>
        </div>
      </>
    )
  }