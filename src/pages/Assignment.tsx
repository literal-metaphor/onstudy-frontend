import { useEffect, useState } from "react";
import { api, store } from "../utils/API";
import { decryptData } from "../utils/Encryptor";
import { AssignmentData } from "../utils/types/AssignmentData";
import { ClassroomData } from "../utils/types/ClassroomData";
import { UserData } from "../utils/types/UserData";

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

  const isTeacher: boolean = classroom?.teacher.id === (JSON.parse(localStorage.getItem("userData")!) as UserData).id;

  const [grade, setGrade] = useState<number | boolean>(true);

  type UserDataWithGrade = UserData & { grade: number };
  const [submissions, setSubmissions] = useState<UserDataWithGrade[]>([{}] as UserDataWithGrade[]);

  const syncGrade: Promise<number | boolean> = (async () => {
    const userData = JSON.parse(localStorage.getItem("userData")!) as UserData;
    if (!userData) {
      throw new Error("User data not found in localStorage");
    }

    if (assignment) {
      try {
        const res = await api.get(`/submissions/check_submission/${assignment?.id}/${userData.id}`);
        return res.data.grade;
      } catch (err) {
        alertError(err as Error);
        return false;
      }
    }
  })();

  const syncSubmissions: Promise<UserDataWithGrade[]> = (async () => {
    try {
      if (assignment) {
        const res = await api.get(`/submissions/get_submitters_by_assignment_id/${assignment.id}`);
        console.log(res.data);
        return res.data as UserDataWithGrade[];
      } else {
        throw new Error("Assignment not found");
      }
    } catch (err) {
      alertError(err as Error);
      return [{}] as UserDataWithGrade[];
    }
  })();

  useEffect(() => {
    const getGrade = async () => {
      const grade = await syncGrade;
      setGrade(grade);
    }

    if (isTeacher) {
      const getSubmissions = async () => {
        const submissions = await syncSubmissions;
        setSubmissions(submissions);
      }

      getSubmissions();
    }
    getGrade();
  }, [isTeacher, syncGrade, syncSubmissions]);


  // Components
  function Submission({ name, grade, photo }: { name: string, grade: number, photo: string | null }) {
    return (
      <>
        <hr className="my-3" />
        <div className="flex flex-row me-3">
          <img src={`${photo ? store+photo : "UserPlaceholder.svg"}`} alt={name} className="rounded-full size-10 me-3" />
          <p className="pt-2">{name}</p>
          <p className="font-bold pt-1 text-[1.25rem] ms-auto">{grade}/100</p>
        </div>
      </>
    )
  }

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
          {!isTeacher && !grade && (
            <button onClick={() => {sessionStorage.setItem("page", "quiz"); location.reload()}} className="text-white text-sm btn btn-success col-3">Kerjakan</button>
          )}
          {/* Done the quiz, display grade */}
          {!isTeacher && typeof grade === "number" && (
            <p className="text-semibold">Nilaimu adalah : <span className="ms-2 font-bold text-4xl">{grade.toString()}</span></p>
          )}
          {/*
            <p className="text-grey">Nilaimu adalah : <span className="ms-2 font-bold text-4xl">Nilai</span></p> 
           */}
          {/* If user is teacher, list all submissions */}
          {isTeacher && (
            <>
            <p className="mb-3 font-bold text-[1.15rem]">Yang sudah mengumpulkan:</p>
            {submissions ? submissions.length > 0 ? submissions.map((submission, i) => (
              <Submission
                key={i}
                name={submission.name}
                grade={submission.grade}
                photo={submission.photo}
              />
            )): (<p className="">Belum ada pengumpulan</p>) : (<p className="">Tidak ada yang mengumpulkan</p>)}
            </>
          )}
        </div>
      </div>
    </>
  ) : null;
}