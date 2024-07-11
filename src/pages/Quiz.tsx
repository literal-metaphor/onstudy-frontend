import { useCallback, useEffect, useState } from "react";
import { api } from "../utils/API"
import { AssignmentData } from "../utils/types/AssignmentData"
import { QuestionData } from "../utils/types/QuestionData";
import { SubmissionData } from "../utils/types/SubmissionData"
import { UserData } from "../utils/types/UserData";
import { AnswerData } from "../utils/types/AnswerData";
import { decryptData } from "../utils/Encryptor";
import Loading from "../components/Loading";

function Question({ question }: { question: QuestionData }) {
  function Answer({ answer }: { answer: AnswerData }) {
    return (
      <>
        {answer.answer}
      </>
    )
  }

  return (
    <>
      {question.question}
      {question.answers.map((answer: AnswerData, i: number) => <Answer key={i} answer={answer} />)}
    </>
  )
}

function NumberBox() {
  return (
    <>

    </>
  )
}

export default function Quiz() {
  const [assignment, setAssignment] = useState<AssignmentData | undefined>(undefined);

  const fetchAssignment = useCallback<() => Promise<AssignmentData | undefined>>(async () => {
    try {
      const assignmentData: AssignmentData | undefined = (decryptData(JSON.parse(localStorage.getItem("assignmentsData")!)) as AssignmentData[]).find(
        (val: AssignmentData) => val.id === sessionStorage.getItem("assignment_id")
      );
      if (!assignmentData) {
        throw new Error("Error saat mengambil cache tugas, silahkan coba lagi");
      }

      const submission: SubmissionData | undefined = await api
        .get(`/submissions/check_submission/${sessionStorage.getItem("assignment_id")}/${(JSON.parse(localStorage.getItem("userData")!) as UserData).id}`)
        .then(res => res.data)
        .catch(resErr => resErr.response.data.message);
      if (submission) {
        throw new Error("Anda sudah mengerjakan tugas ini.");
      }

      return assignmentData;
    } catch (err) {
      alert(err);
      sessionStorage.setItem("page", "assignments");
      location.reload();
    }
  }, []);

  useEffect(() => {
    const getAssignment = async () => {
      const assignmentData = await fetchAssignment();
      setAssignment(assignmentData);
    };

    getAssignment();

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [assignment, fetchAssignment]);

  return assignment ? (
    <>
      <button onClick={() => {
        if (confirm("Apakah anda yakin ingin meninggalkan tugas ini?")) {
          sessionStorage.setItem("page", "assignments");
          location.reload();
        }
      }} className="btn btn-ghost flex justify-center items-center absolute top-8 start-8 text-lg font-bold">
        <img src="ArrowDown.svg" alt="Arrow left" className="w-[24px] h-[24px] rotate-90 me-4" />
        Kembali
      </button>

      <div className="w-screen h-screen flex justify-center items-center">
        {/* Questions */}
        <div className="bg-white p-4 border border-gey rounded-lg">
          {(assignment as AssignmentData).questions.map((question: QuestionData, i: number) => {
            return <Question key={i} question={question} />
          })}
        </div>

        {/* Navigation */}
      </div>
    </>
  ) : (<Loading />);
}