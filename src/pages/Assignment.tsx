import { store } from "../utils/API";
import { decryptData } from "../utils/Encryptor";
import { AssignmentData } from "../utils/types/AssignmentData";
import { ClassroomData } from "../utils/types/ClassroomData";

export default function Assignment() {
  function alertError(err: Error) {
    alert(err);
    sessionStorage.setItem("page", "assignments");
    location.reload();
  }

  const assignment: AssignmentData | undefined = (() => {
    try {
      const assignmentData: AssignmentData | undefined = (decryptData(JSON.parse(localStorage.getItem("assignmentsData")!)) as AssignmentData[]).find((val: AssignmentData) => val.id === sessionStorage.getItem("assignment_id"));
      if (!assignmentData) {
        throw new Error("Error saat mengambil cache tugas, silahkan coba lagi.");
      }
      return assignmentData;
    } catch (err) {
      alertError(err as Error);
    }
  })();

  const classroom: ClassroomData | undefined = (() => {
    try {
      const classroomData: ClassroomData | undefined = (JSON.parse(localStorage.getItem("classroomsData")!) as ClassroomData[]).find((val: ClassroomData) => val.id === assignment?.classroom_id);
      if (!classroomData) {
        throw new Error("Error saat mengambil cache kelas, silahkan coba lagi");
      }
      return classroomData;
    } catch (err) {
      alertError(err as Error);
    }
  })();
  return assignment && classroom ? (
    <>
      <div className="container p-4">
        <div className="border border-grey bg-white rounded-lg p-4 my-4 mx-4">
          <h2 className="font-bold text-3xl">{assignment.title}</h2>
          <div className="my-3 flex">
            <img src={`${classroom.teacher.photo ? store+classroom.teacher.photo : "UserPlaceholder.svg"}`} alt={classroom.teacher.name} className='rounded-full w-[32px] h-[32px]'/>
            <p className="text-gray ms-3 pt-1 text-primary">{classroom.name} - {classroom.teacher.name}</p>
          </div>
          <p className="text-base my-3">Deskripsi: {assignment.description}</p>
          <p className="text-base my-3 text-primary">{assignment.questions.length} Soal - Deadline {assignment.deadline}</p>

          {/* If user is student */}
          {/* Haven't done the quiz, do it */}
          <button onClick={() => {sessionStorage.setItem("page", "quiz"); location.reload()}} className="text-white text-sm btn btn-success col-3">Kerjakan</button>
          {/* Done the quiz, display grade */}

          {/* If user is teacher, list all submissions */}
        </div>
      </div>
    </>
  ) : null;
}