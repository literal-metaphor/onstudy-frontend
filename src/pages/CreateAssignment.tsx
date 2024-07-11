import React, { useEffect, useRef, useState } from "react";
import { AnswerData } from "../utils/types/AnswerData";
import { ClassroomData } from "../utils/types/ClassroomData";
import Assignment from "../utils/AssignmentClass";

export default function CreateAssignment() {
  const [assignment] = useState(new Assignment());
  const [questions, setQuestions] = useState(assignment.getQuestions());
  const assignmentPostRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setQuestions([...assignment.getQuestions()]);
  }, [assignment]);

  function autosizeField(e: React.ChangeEvent<HTMLTextAreaElement> | HTMLTextAreaElement) {
    const textarea = e instanceof HTMLTextAreaElement ? e : e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function clearQuestions() {
    if (confirm("Apakah kamu yakin mau menghapus semua soal?")) {
      assignment.clearQuestions();
      setQuestions([...assignment.getQuestions()]);
    }
  }

  function publishAssignment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (confirm("Apakah kamu yakin mau memposting tugas ini?")) {
      if (assignmentPostRef.current) {
        assignmentPostRef.current.innerHTML = '<div class="animate-spin" id="join_classroom_loading">⟳</div>';
        assignmentPostRef.current.disabled = true;
      }

      const form = e.currentTarget as HTMLFormElement;
      const title = form.elements.namedItem('title') as HTMLInputElement;
      const description = form.elements.namedItem('description') as HTMLInputElement;
      const classroom_id = form.elements.namedItem('classroom_id') as HTMLInputElement;
      const deadline = form.elements.namedItem('deadline') as HTMLInputElement;

      assignment.publishAssignment(title.value, description.value, classroom_id.value, deadline.value)
      .then(() => {
          sessionStorage.setItem("page", "classroom");
          sessionStorage.setItem("classroom_id", classroom_id.value);
          location.reload();
      })
      .catch(err => {
          console.error(err);
          alert(err);
      });
    }
  }

  // Components
  function NumberBox({ number }: { number: number }) {
    return (
      <a href={`#question${number-1}`} className="p-3 m-2 rounded-lg size-10 border border-grey flex justify-center items-center hover:cursor-pointer hover:bg-blue hover:text-white transition duration-300 text-black no-underline">
        {number}
      </a>
    );
  }

  function Question({ index }: { index: number }) {
    let questionEdit: string = "";
    const questionRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (questionRef.current) {
        autosizeField(questionRef.current);
      }
    }, [])


    function editQuestion(val: string) {
      assignment.modifyQuestion(index, question => {
        question.question = val;
      });
      setQuestions([...assignment.getQuestions()]);
    }

    function deleteQuestion() {
      if (confirm("Apakah kamu yakin mau menghapus soal ini?")) {
        assignment.deleteQuestion(index);
        setQuestions([...assignment.getQuestions()]);
      }
    }

    function addAnswer() {
      assignment.addAnswer(index);
      setQuestions([...assignment.getQuestions()]);
    }

    function Answer({ answerIndex, answer, right_answer }: { answerIndex: number, answer: string, right_answer: boolean }) {
      let answerEdit: string = "";
      const answerRef = useRef<HTMLTextAreaElement>(null);

      useEffect(() => {
        if (answerRef.current) {
          autosizeField(answerRef.current);
        }
      }, [])

      function modifyAnswer(callback: (answer: AnswerData) => void) {
        assignment.modifyAnswer(index, answerIndex, callback);
        setQuestions([...assignment.getQuestions()]);
      }

      function editAnswer(val: string) {
        modifyAnswer(answer => {
          answer.answer = val;
        });
      }

      function changeRightAnswer() {
        assignment.modifyQuestion(index, question => {
          question.answers.forEach(answer => (answer.right_answer = false));
          question.answers[answerIndex].right_answer = !right_answer;
        });
        setQuestions([...assignment.getQuestions()]);
      }

      function deleteAnswer() {
        assignment.deleteAnswer(index, answerIndex);
        setQuestions([...assignment.getQuestions()]);
      }

      return (
        <div id={`question${index}`} className={`scroll-m-36 border my-2 border-grey w-full h-fit px-3 rounded-md flex justify-between items-center ${right_answer && "bg-blue text-white"}`}>
          <textarea
            onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
              editAnswer(answerEdit || e.target.value);
            }}
            onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              answerEdit = e.target.value;
              autosizeField(e);
            }}
            ref={answerRef}
            className={`resize-none bg-transparent p-2 focus:outline-none w-full`}
            defaultValue={answerEdit || answer}
            placeholder="Tuliskan jawaban..."
          />
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className={`text-2xl rounded-full m-2 hover:bg-grey transition duration-300 hover:cursor-pointer p-1 ${right_answer ? "text-white" : "text-black"}`}>⋮</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-lg w-64">
              <li onClick={changeRightAnswer}>
                <a className="no-underline text-blue">🗹 Buat menjadi jawaban benar</a>
              </li>
              <li className={`${questions[index].answers.length > 2 ? "" : "hidden"}`} onClick={deleteAnswer}>
                <a className="no-underline text-danger">🗑 Hapus jawaban</a>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="my-4">
        <div className="font-semibold text-2xl flex items-top">
          <div className="flex flex-col justify-center items-center me-2">
            <div>{index + 1}.</div>
            <div onClick={deleteQuestion} className="w-[24px] h-[24px] rounded-full m-2 flex justify-center items-center text-danger hover:bg-grey transition duration-300 hover:cursor-pointer">🗑</div>
          </div>
          <textarea
            onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
              editQuestion(questionEdit || e.target.value);
            }}
            onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              questionEdit = e.target.value;
              autosizeField(e);
            }}
            ref={questionRef}
            className={`resize-none bg-transparent p-2 border border-grey rounded-lg focus:outline-none w-full`}
            defaultValue={questionEdit || questions[index].question}
            placeholder="Tuliskan soal..."
          />
        </div>

        <br />

        {questions[index].answers.map((answer, i) => (
          <Answer key={i} answerIndex={i} answer={answer.answer} right_answer={answer.right_answer} />
        ))}

        <div onClick={addAnswer} className="border border-grey w-full h-fit px-3 py-2 rounded-md flex justify-center items-center hover:cursor-pointer hover:bg-blue hover:text-white transition duration-300">
          +
        </div>
        <hr />
      </div>
    );
  }

  return (
      <>
      <dialog id="publish_assignment_modal" className="modal">
        <div className="modal-box w-fit">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          {/* Finalization form */}
          <div className="container w-fit p-4 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">Finalisasi Tugas</h1>
            <form onSubmit={publishAssignment}>
              <label className="my-2 form-control w-full">
                <div className="label">
                  <span className="label-text">Judul Tugas</span>
                </div>
                <input type="text" className="input input-bordered w-full py-2" placeholder="Judul Tugas" name="title" required />
              </label>
              <label className="my-2 form-control w-full">
                <div className="label">
                  <span className="label-text">Deskripsi</span>
                </div>
                <textarea className="textarea textarea-bordered" name="description" placeholder="Deskripsi" required></textarea>
              </label>
              <label className="my-2 form-control w-full">
                <div className="label">
                  <span className="label-text">Kelas</span>
                </div>
                <select name="classroom_id" className="select select-bordered">
                  {JSON.parse(localStorage.getItem("classroomsData")!).map((classroom: ClassroomData) => <option key={classroom.id} value={classroom.id}>{classroom.name}</option>)}
                </select>
              </label>
              <label className="my-2 form-control w-full">
                <div className="label">
                  <span className="label-text">Deadline</span>
                </div>
                <input type="date" className="hover:cursor-pointer input input-bordered w-full py-2" placeholder="Deadline" name="deadline" required />
              </label>

              <br />
              <button ref={assignmentPostRef} type="submit" className="p-3 bg-success w-full rounded-md text-white hover:opacity-75 transition duration-300">Publikasikan</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="me-4">
          <div onClick={() => { sessionStorage.setItem("page", "assignments"); location.reload(); }} className="flex items-center btn">
            <img src="ArrowDown.svg" alt="Back" className="w-[16px] h-[16px] rotate-90 me-3" />
            <div className="text-2xl font-semibold">Pembuatan Tugas</div>
          </div>

          <br />

          <div className="p-4 border border-grey rounded-lg w-[25vw]">
            <div className="h-[40vh] overflow-y-scroll">
              <div className="flex flex-wrap">
                {questions.map((_question, i) => (
                  <NumberBox key={i} number={i + 1} />
                ))}
                <div onClick={() => { assignment.addQuestion(); setQuestions([...assignment.getQuestions()]); }} className="p-3 m-2 rounded-lg size-10 border border-grey flex justify-center items-center hover:cursor-pointer hover:bg-blue hover:text-white transition duration-300">+</div>
              </div>
            </div>

            <br />

            <button onClick={() => {(document.getElementById("publish_assignment_modal") as HTMLDialogElement).showModal()}} className="p-3 bg-success w-full rounded-md text-white hover:opacity-75 transition duration-300">Selesai</button>
            <div className="my-2"/>
            <button onClick={clearQuestions} className="p-3 bg-danger w-full rounded-md text-white hover:opacity-75 transition duration-300">Hapus Semua Soal</button>
          </div>
        </div>

        <div className="border border-grey rounded-lg p-4 w-[45vw] h-[90vh] overflow-y-scroll overflow-x-hidden">
          {questions.map((_question, i) => (
            <Question key={i} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}