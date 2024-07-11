import {useEffect, useState} from "react";
import {ClassroomData} from "../utils/types/ClassroomData";
import {AssignmentData} from "../utils/types/AssignmentData";
import {UserData} from "../utils/types/UserData";
import {decryptData} from "../utils/Encryptor";
import { api, store } from "../utils/API";

function Assignment({
  id,
  title,
  teacher,
}: {
  id: string;
  title: string;
  teacher: string;
}) {
  return (
    <>
      <div
        onClick={() => {
          sessionStorage.setItem("assignment_id", id);
          sessionStorage.setItem("page", "assignment");
          location.reload();
        }}
        className="flex items-center p-4 my-4 bg-white rounded-lg border border-grey hover:cursor-pointer hover:bg-grey transition duration-300"
      >
        <img src="TaskCard.svg" alt="Task" className="w-[48px] h-[48px] me-3" />
        <span>
          {teacher} mengunggah tugas baru:{" "}
          {title.slice(0, 30) + (title.length > 30 ? "..." : "")}
        </span>
      </div>
    </>
  );
}

function MemberList({ name, photo }: { name: string; photo: string | null }) {
  return (
    <>
      <div className="flex flex-row m-3">
        <img src={photo?store+photo:"UserPlaceholder.svg"} alt={name} className="size-10 rounded-full me-2" />
        <p className="pt-2">{name}</p>
      </div>
    </>
  )
}

export default function Classroom() {
  const [page, setPage] = useState<string>("assignments");

  const classroom: ClassroomData | undefined = (() => {
    try {
      const classrooms: ClassroomData[] = JSON.parse(
        localStorage.getItem("classroomsData")!
      );
      if (!classrooms) {
        throw new Error(
          "Error saat mengambil cache kelas, silahkan coba lagi."
        );
      }
      const classroom = classrooms.find(
        (val) => val.id === sessionStorage.getItem("classroom_id")!
      );
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

  const assignments: AssignmentData[] | undefined = (() => {
    try {
      const assignments: AssignmentData[] = decryptData(
        JSON.parse(localStorage.getItem("assignmentsData")!)
      ) as AssignmentData[];
      if (!assignments) {
        throw new Error(
          "Error saat mengambil cache tugas, silahkan coba lagi."
        );
      }
      const thisAssignments =
        assignments.filter((val) => val.classroom_id === classroom?.id) || [];
      return thisAssignments.sort((a, b) => a.created_at > b.created_at ? -1 : 1);
    } catch (err) {
      alert(err);
      sessionStorage.setItem("page", "classrooms");
      location.reload();
    }
  })();

  const [members, setMembers] = useState<UserData[] | undefined>([]);

  const syncMembers = (async (): Promise<UserData[] | undefined> => {
    try {
      if (classroom) {
        const res = await api.get(`/classrooms/get_members_by_classroom_id/${classroom.id}`);
        return res.data;
      }
    } catch (err) {
      alert(err);
      sessionStorage.setItem("page", "classrooms");
      location.reload();
    }
  });

  useEffect(() => {
    const getMembers = async () => {
      const members = await syncMembers();
      setMembers(members);
    }
    getMembers();
  })

  if (!classroom) return null;

  const colors = {
    Sains: "#DCF3ED",
    Matematika: "#F3E4DF",
    Bahasa: "#FDEECA",
    Informatika: "#DBDFF4",
    Sosial: "#FDE9E0",
    Seni: "#F8C8E5",
  };

  return (
    <>
      <div className="container p-4">
        {/* Classroom banner */}
        <div className="relative w-full h-full">
          <img
            src={`classroom_banner/${classroom.subject}.svg`}
            alt={classroom.subject}
            className="shadow-lg rounded-[48px]"
          />
          <div
            style={{backgroundColor: colors[classroom.subject]}}
            className={`absolute start-8 bottom-8 p-4 rounded-3xl shadow-lg border-2 border-grey`}
          >
            <h1 className="text-3xl font-bold">{classroom.name}</h1>
            <h6 className="text-lg opacity-50 font-normal mb-4">
              {classroom.teacher.name}
            </h6>
            <button
              onClick={() => {
                navigator.clipboard.writeText(classroom.id);
              }}
              className="btn btn-ghost opacity-50 border-1 border-grey bg-white"
            >
              🔗 Salin Kode Kelas
            </button>
          </div>
        </div>

        <br />

        {/* Navigation */}
        <div className="flex items-center text-lg font-medium opacity-50">
          <div
            onClick={() => setPage("assignments")}
            className={`hover:text-blue hover:cursor-pointer mx-2 ${
              page === "assignments" && "text-blue"
            }`}
          >
            Tugas
          </div>
          {/* <div
            onClick={() => setPage("submissions")}
            className={`hover:text-blue hover:cursor-pointer mx-2 ${
              page === "submissions" && "text-blue"
            }`}
          >
            Pengumpulan
          </div> */}
          <div
            onClick={() => setPage("members")}
            className={`hover:text-blue hover:cursor-pointer mx-2 ${
              page === "members" && "text-blue"
            }`}
          >
            Anggota
          </div>
        </div>

        <br />

        {/* Classroom content */}
        {/* Assignment page */}
        {page === "assignments" && (
          <>
            {/* Create new assignment if the user is the teacher */}
            {classroom.teacher.id ===
              (JSON.parse(localStorage.getItem("userData")!) as UserData)
                .id && (
              <button
                onClick={() => {
                  sessionStorage.setItem("page", "createAssignment");
                  location.reload();
                }}
                className="p-3 bg-primary rounded-md text-white hover:opacity-75"
              >
                + Buat Tugas Baru
              </button>
            )}

            {assignments && assignments.length > 0 ? (
              assignments.map((assignment) => (
                <>
                  <Assignment
                    key={assignment.id}
                    id={assignment.id}
                    title={assignment.title}
                    teacher={classroom.teacher.name}
                  />
                </>
              ))
            ) : (
              <p className="my-4">Tidak ada tugas apapun di kelas ini.</p>
            )}
          </>
        )}
        {/* Members page */}
        {page === "members" && (
          <>
            <h1 className="text-3xl font-bold m-3 ">Guru</h1>
            <hr />
            <MemberList name={classroom.teacher.name} photo={classroom.teacher.photo} />
            <hr />
            <h1 className="text-3xl font-bold m-3">Murid</h1>
            <hr />
            {members ? members.map((member) => (
              <MemberList name={member.name} photo={member.photo} />
            )): (<p className="my-4">Tidak ada murid di kelas ini.</p>)}
          </>
        )}
      </div>
    </>
  );
}
