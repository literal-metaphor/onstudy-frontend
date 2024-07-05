import { useState } from "react";
import { ClassroomData } from "../utils/types/ClassroomData";

function Assignment({ id, title, teacher }: {id: string, title: string, teacher: string}) {
  return (
    <>
      <div onClick={() => {sessionStorage.setItem("assignment_id", id); sessionStorage.setItem("page", "assignment"); location.reload();}} className="flex items-center p-4 my-3 bg-white rounded-lg border border-grey hover:cursor-pointer hover:bg-grey transition duration-300">
        <img src="TaskCard.svg" alt="Task" className="w-[48px] h-[48px] me-3" />
        <span>{teacher} mengunggah tugas baru: {title.slice(0, 30) + (title.length > 30 ? '...' : '')}</span>
      </div>
    </>
  )
}

export default function Classroom() {
  const [page, setPage] = useState<string>("assignments");

  // const [classroom, setClassroom] = useState<ClassroomData>({} as ClassroomData);
  // const syncClassroom = useCallback((): boolean => {
  //   try {
  //     const classrooms: ClassroomData[] = JSON.parse(localStorage.getItem("classroomsData")!);
  //     if (!classrooms) {
  //       throw new Error("Kesalahan cache kelas, silahkan coba lagi.");
  //     }
  //     const classroom = classrooms.find(val => val.id === sessionStorage.getItem("classroom_id"));
  //     if (!classroom) {
  //       throw new Error("Kamu belum bergabung atau kelas ini tidak ada.");
  //     }
  //     setClassroom(classroom);
  //     return true;
  //   } catch (err) {
  //     alert(err);
  //     sessionStorage.setItem("page", "classrooms");
  //     location.reload();
  //     return false;
  //   }
  // }, []);

  // useEffect(() => {
  //   syncClassroom();
  // })

  const classroom: ClassroomData | undefined = (() => {
    try {
      const classrooms: ClassroomData[] = JSON.parse(localStorage.getItem("classroomsData")!);
      if (!classrooms) {
        throw new Error("Error saat mengambil cache kelas, silahkan coba lagi.");
      }
      const classroom = classrooms.find(val => val.id === sessionStorage.getItem("classroom_id"));
      if (!classroom) {
        throw new Error("Kamu belum bergabung atau kelas ini tidak ada.");
      }
      return classroom;
    } catch (err) {
      alert(err);
      sessionStorage.setItem("page", "classrooms");
      location.reload();
    }
  })();

  if (!classroom) return null;

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
          <img src={`classroom_banner/${classroom.subject}.svg`} alt={classroom.subject} className="shadow-lg rounded-[48px]" />
          <div style={{backgroundColor: colors[classroom.subject]}} className={`position-absolute start-8 bottom-8 p-4 rounded-3xl shadow-lg border-1 border-grey`}>
            <h1 className="text-3xl font-bold">{classroom.name}</h1>
            <h6 className="text-lg opacity-50 font-normal">{classroom.teacher.name}</h6>
            <button onClick={() => {
              navigator.clipboard.writeText(classroom.id);
            }} className="btn text-sm opacity-50 font-normal">🔗 Salin Kode Kelas</button>
          </div>
        </div>

        <br />

        {/* Navigation */}
        <div className="flex items-center text-lg font-medium opacity-50">
          <div onClick={() => setPage("assignments")} className={`hover:text-blue hover:cursor-pointer mx-2 ${page === "assignments" && "text-blue"}`}>Tugas</div>
          <div onClick={() => setPage("submissions")} className={`hover:text-blue hover:cursor-pointer mx-2 ${page === "submissions" && "text-blue"}`}>Pengumpulan</div>
          <div onClick={() => setPage("members")} className={`hover:text-blue hover:cursor-pointer mx-2 ${page === "members" && "text-blue"}`}>Anggota</div>
        </div>

        <br />

        {/* Classroom content */}
        {/* Assignment page */}
        {page === "assignments" && (
          <>
          {/* Create new assignment */}
          <button onClick={() => {sessionStorage.setItem("page", "createAssignment"); location.reload();}} className="p-3 bg-primary rounded-md text-white hover:opacity-75">+ Buat Tugas Baru</button>

          <br /><br />

          {/* {classroom.assignments && classroom.assignments.length > 0 ? (
            classroom.assignments.map(assignment => (
              <Assignment key={assignment.id} id={assignment.id} title={assignment.title} teacher={classroom.teacher.name} />
            ))
          ) : (<p className="my-4">Tidak ada tugas apapun di kelas ini.</p>)} */}
          <p className="my-4">Tidak ada tugas apapun di kelas ini.</p>
          </>
        )}
        {page === "members" && (
          <>
          {/* Teacher */}

          {/* Students */}
          </>
        )}
      </div>
    </>
  )
}