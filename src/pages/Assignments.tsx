import { store } from "../utils/API";
import { decryptData } from "../utils/Encryptor";
import { AssignmentData } from "../utils/types/AssignmentData";
import { ClassroomData } from "../utils/types/ClassroomData";

function Assignment({ id, title, description, classroom, teacher, teacherPhoto, deadline, counts }: { id: string, title: string, description: string, classroom: string, teacher: string, teacherPhoto: string | null, deadline: string, counts: number }) {
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

export default function Assignments() {
  const assignments: (AssignmentData & { classroom: ClassroomData })[] | undefined = (() => {
    try {
      const classroomsData = localStorage.getItem("classroomsData");
      let classrooms: ClassroomData[] = [];

      if (classroomsData) {
        classrooms = JSON.parse(classroomsData);
      } else {
        throw new Error("Error saat mengambil cache kelas, silahkan coba lagi.");
      }

      const assignmentsData = localStorage.getItem("assignmentsData");
      let assignments: AssignmentData[] = [];

      if (assignmentsData) {
        const parsedData = JSON.parse(assignmentsData) as AssignmentData[];
        assignments = decryptData(parsedData) as AssignmentData[];
      } else {
        throw new Error("Error saat mengambil cache tugas, silahkan coba lagi.");
      }

      const assignmentsWithClassroom: (AssignmentData & { classroom: ClassroomData })[] = assignments.map((assignment) => {
        const classroom: ClassroomData | undefined = classrooms.find(val => val.id === assignment.classroom_id);
        if (!classroom) {
          throw new Error("Error saat mengambil cache kelas, silahkan coba lagi.");
        }
        return {
          ...assignment,
          classroom
        };
      });

      return assignmentsWithClassroom.sort((a, b) => a.created_at > b.created_at ? -1 : 1);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  })();

  return (
    <>
      <div className="container p-4">
        <div className="grid grid-cols-12">
          {/* Assignments list */}
          <div className="col-span-8">
            {/* Filter */}
            <div className="flex items-center btn btn-ghost w-fit">
              <span className="text-3xl font-semibold me-3">Semua Tugas</span>
              <img src="ArrowDown.svg" alt="Arrow Down" className="w-[16px] h-[16px]" />
            </div>

            {/* Assignment Card */}
            {assignments && assignments.length > 0 ? assignments.map((assignment) => <Assignment key={assignment.id} id={assignment.id} classroom={assignment.classroom.name} title={assignment.title} description={assignment.description} teacher={assignment.classroom.teacher.name} teacherPhoto={assignment.classroom.teacher.photo} deadline={assignment.deadline} counts={assignment.questions.length} />) : (<><br/><span className="ms-4 text-black">Tidak ada tugas apapun.</span> <br /> <span onClick={() => location.reload()} className="ms-4 text-blue hover:cursor-pointer hover:underline">Muat ulang jika Anda yakin ada kesalahan.</span></>)}
          </div>
        </div>
      </div>
    </>
  )
}