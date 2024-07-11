import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../utils/API"
import { AssignmentData } from "../utils/types/AssignmentData"
import { QuestionData } from "../utils/types/QuestionData";
import { SubmissionData } from "../utils/types/SubmissionData"
import { UserData } from "../utils/types/UserData";
import { AnswerData } from "../utils/types/AnswerData";
import { decryptData } from "../utils/Encryptor";
import Loading from "../components/Loading";
import { ChoicesData } from "../utils/types/ChoicesData";


export default function Quiz() {
  const [assignment, setAssignment] = useState<AssignmentData | undefined>(undefined);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionData>();
  const [currentNumber, setcurrentNumber] = useState<number>(1);
  const [choices, setChoices] = useState<ChoicesData[]>([]);

  const submitButtonRef = useRef<HTMLButtonElement>(null);

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
        .then(res => res.data);
      if (submission?.grade) {
        throw new Error("Anda sudah mengerjakan tugas ini.");
      }

      // Randomize questions to prevent cheating
      assignmentData.questions.sort(() => Math.random() - 0.5);
      for (const question of assignmentData.questions) {
        question.answers.sort(() => Math.random() - 0.5);
      }
      setCurrentQuestion(assignmentData.questions[0]);

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

    // const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    //   e.preventDefault();
    // };

    // window.addEventListener('beforeunload', handleBeforeUnload);

    // return () => {
    //   window.removeEventListener('beforeunload', handleBeforeUnload);
    // };
  }, [fetchAssignment]);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (assignment && choices.length < assignment.questions.length) {
      alert("Anda belum menyelesaikan semua soal.");
      return;
    }

    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true;
      submitButtonRef.current.style.opacity = "75%";
    }

    if (confirm("Apakah kamu yakin mau mengirim tugas ini?")) {
      try {
        await api.post("/submissions/create_submission", { user_id: (JSON.parse(localStorage.getItem("userData")!) as UserData).id, assignment_id: sessionStorage.getItem("assignment_id")!, choices: choices });
        sessionStorage.setItem("page", "assignment");
        location.reload();
      } catch (err) {
        console.error(err)
        alert("Ada kesalahan saat mengirim tugas. Silahkan coba lagi.");

        if (submitButtonRef.current) {
          submitButtonRef.current.disabled = false;
          submitButtonRef.current.style.opacity = "100%";
        }
      }
    }
  }

  // Components
  function Question({ question, number }: { question: QuestionData, number: number }) {
    function Answer({ answer }: { answer: AnswerData }) {
      const isSelected: boolean = choices.some(val => val.question_id === question.id && val.answer_id === answer.id);

      function handleChangeAnswer(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        if (isSelected) return;

        const updatedChoices = choices.map(choice =>
          choice.question_id === question.id ? { ...choice, answer_id: answer.id } : choice
        );

        if (!updatedChoices.find(choice => choice.question_id === question.id)) {
          updatedChoices.push({ question_id: question.id, answer_id: answer.id, number: number });
        }

        setChoices(updatedChoices);
      }

      return (
        <>
          <button onClick={handleChangeAnswer} className={`text-start border my-2 border-grey w-full h-fit px-3 py-2 rounded-md flex justify-between items-center hover:bg-blue hover:text-white transition duration-300 ${isSelected && "bg-blue text-white"}`}>{answer.answer}</button>
        </>
      )
    }
  
    return (
      <>
        <h3 className="text-2xl font-bold">{number}. {question.question}</h3>
        <br />
        {question.answers.map((answer: AnswerData, i: number) => <Answer key={i} answer={answer} />)}
      </>
    )
  }
  
  function NumberBox({ number }: { number: number }) {
    const isAnswered: boolean = choices.some(choice => choice.number === number);
    return (
      <>
        <button onClick={() => { setCurrentQuestion(assignment?.questions[number - 1]); setcurrentNumber(number); }} className={`p-3 m-2 rounded-lg size-10 border border-grey flex justify-center items-center hover:cursor-pointer hover:bg-blue hover:text-white transition duration-300 ${isAnswered && "bg-success text-white"}`}>
          {number}
        </button>
      </>
    )
  }

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
        <div className="flex justify-center items-center h-[60vh]">
          {/* Questions */}
          <div className="bg-white p-8 border border-gey rounded-lg w-[50vw] h-full overflow-x-hidden overflow-y-auto mx-4">
            <Question question={currentQuestion ? currentQuestion : {} as QuestionData} number={currentNumber} />
          </div>

          {/* Navigation */}
          <div className="bg-white border border-grey rounded-lg p-4 w-[25vw] h-full overflow-y-auto overflow-x-hidden mx-4 flex flex-col justify-between items-center">
            <div className="flex flex-wrap">
              {assignment.questions.map((_question, i) => {
                return <NumberBox key={i} number={i + 1} />;
              })}
            </div>
            <div className="w-full">
              <button ref={submitButtonRef} onClick={handleSubmit} className="w-full bg-success text-white p-4 rounded-lg hover:opacity-75 transition duration-300 mb-2">Kumpulkan Tugas</button>
              <br />
              <div className="w-full text-center text-sm text-grey">{choices.length} dari {assignment.questions.length} jawaban telah dijawab.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (<Loading />);
}