import { useCallback, useEffect, useState } from "react";
import { api } from "../utils/API";
import { decryptData } from "../utils/Encryptor";
import { AssignmentData } from "../utils/types/AssignmentData";
import { SubmissionData } from "../utils/types/SubmissionData";
import { UserData } from "../utils/types/UserData";

export default function Dashboard() {
  const userData: UserData = JSON.parse(localStorage.getItem("userData") || "{}") as UserData;
  const assignmentsData: AssignmentData[] = (decryptData(JSON.parse(localStorage.getItem("assignmentsData") || "[]")) as AssignmentData[]).sort((a, b) => a.created_at > b.created_at ? -1 : 1);

  type SubmissionDataWithStatus = SubmissionData & { ontime: boolean };
  const syncSubmissionsData = useCallback(async (): Promise<SubmissionDataWithStatus[]> => {
    const res = await api.get(`/submissions/get_submissions_by_user_id_with_status/${userData.id}`);
    return res.data;
  }, [userData.id]);
  const [submissionsData, setSubmissionsData] = useState<SubmissionDataWithStatus[]>([]);

  const [avgGrade, setAvgGrade] = useState<number>(0);
  const syncAvgGrade = useCallback(async () => {
    const res = await api.get(`/submissions/get_avg_grade_by_user_id/${userData.id}`);
    return res.data.grade;
  }, [userData.id]);

  useEffect(() => {
    const getSubmissionsData = async () => {
      const res = await syncSubmissionsData();
      console.log(res);
      setSubmissionsData(res);
    }

    const getAvgGrade = async () => {
      const res = await syncAvgGrade();
      setAvgGrade(res);
    }

    getSubmissionsData();
    getAvgGrade();
  }, [syncSubmissionsData, syncAvgGrade]);

  function Notification({ id, title, description }: { id: string, title: string, description: string }) {
    return (
      <>
        <div onClick={() => {sessionStorage.setItem("assignment_id", id); sessionStorage.setItem("page", "assignment"); location.reload();}} className="flex items-center border-2 border-gray-200 flex-row p-4 my-3 bg-white rounded-lg border-1 transition duration-300 hover:bg-grey hover:cursor-pointer">
          <img src="TaskCard.svg" alt="Task" className="w-[48px] h-[48px] mx-2 my-1" />
          <div className="flex flex-col">
            <div className="text-xl ms-2 mb-2 font-semibold">{title}</div>
            <div className="text-sm opacity-50 ms-2">{description}</div>
          </div>
        </div>
      </>
    )
  }

  function Stats({ text, num, img, color = 'black' }: { text: string, num: string, img: string, color?: string }) {
    return (
      <>
        <div className={`p-4 mb-5  bg-white rounded-lg border-2 border-gray-200 w-100` } style={{ color }}>
          <div className="flex mb-4 items-center">
            <img src={img} alt={text} className="size-6 me-3" />
            <span className="font-semibold text-xl">{text}</span>
          </div>
          <div className="mt-3"></div>
          <span className= {`font-semibold mt-3 text-2xl text-${color}`}>{num}</span>
        </div>
      </>
    )
  }

  return userData && assignmentsData ? (
    <>
      <div className="container p-8">
        <div className="grid grid-cols-12">
          {/* Main content: Greetings and quick notifications */}
          <main className="col-span-7">
            {/* Greetings */}
            <h1 className="text-3xl font-bold mb-5">👋 Hai, <span className="text-secondary">{userData.name}!</span></h1>
            <p className="text-sm opacity-50 ps-2">Apa yang ingin kamu kerjakan hari ini?</p>

            <br />

            {/* Assignment notifications */}
            <span className="flex justify-between mb-5 items-center">
              <h2 className="font-semibold text-2xl ps-1">📚 Tugas</h2>
              <span onClick={() => {sessionStorage.setItem("page", "assignments"); location.reload();}} className="text-blue hover:cursor-pointer hover:underline">Lihat semua →</span>
            </span>
            {assignmentsData.length > 0 ? assignmentsData.map((assignment) => {
              return <Notification key={assignment.id} id={assignment.id} title={assignment.title} description={assignment.description.length > 100 ? assignment.description.substring(0, 100) + "..." : assignment.description} />
            }) : (
              <p className="text-xl">Tidak ada tugas baru</p>
            )}
          </main>

          {/* Empty gap */}
          <div className="col-span-2"></div>

          {/* Aside content: Stats */}
          <aside className="col-span-3">
            <Stats text="Total Tugas" num={(assignmentsData.length).toString()} img="Total.svg" />
            <Stats text="Terselesaikan" num={submissionsData ? (submissionsData.length).toString(): "0"} img="Completed.svg" />
            <Stats text="Terlambat" num={ submissionsData ? (submissionsData.filter(val => !val.ontime).length).toString() : "0"} img="Late.svg" />
            <Stats text="Rata-rata nilai" num={avgGrade ? avgGrade+"%" : "0%"} img={`${avgGrade ? avgGrade >= 80 ? "A" : avgGrade >= 60 ? "B" : avgGrade >= 40 ? "C" : "D" : "A"}.svg`} />
          </aside>
        </div>
      </div>
    </>
  ) : (<></>);
}