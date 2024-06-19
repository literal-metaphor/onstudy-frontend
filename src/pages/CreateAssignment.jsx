/* eslint-disable react/prop-types */

// Object-oriented ⭐
import { useEffect, useRef, useState } from "react";

/**
 * Class representing an assignment with questions and answers.
 */
class Assignment {
  /**
   * Constructs a new Assignment instance.
   * Retrieves the questions from local storage or creates a new one if empty.
   */
  constructor() {
    // Retrieve questions from local storage
    this.questions = JSON.parse(localStorage.getItem("createAssignment")) || [];

    // If no questions exist, add a new one
    if (this.questions.length === 0) {
      this.addQuestion();
    }
  }

  /**
   * Returns the questions array.
   * @returns {Array} The questions array.
   */
  getQuestions() {
    return this.questions;
  }

  /**
   * Updates the questions cache in local storage.
   */
  updateQuestionsCache() {
    // Update the questions cache in local storage
    localStorage.setItem("createAssignment", JSON.stringify(this.questions));
  }

  /**
   * Modifies a question at the specified index.
   * @param {number} index - The index of the question to modify.
   * @param {function} func - The function to modify the question.
   */
  modifyQuestion(index, func) {
    // Modify the question
    func(this.questions[index]);

    // Update the questions cache
    this.updateQuestionsCache();
  }

  /**
   * Adds a new question to the assignment.
   */
  addQuestion() {
    // Add a new question with default values
    this.questions.push({
      "question": "Tuliskan pertanyaan di sini",
      "answers": [
        { "answer": "Jawaban 1", "right_answer": true },
        { "answer": "Jawaban 2", "right_answer": false },
        { "answer": "Jawaban 3", "right_answer": false },
        { "answer": "Jawaban 4", "right_answer": false }
      ]
    });

    // Update the questions cache
    this.updateQuestionsCache();
  }

  /**
   * Deletes a question at the specified index.
   * @param {number} index - The index of the question to delete.
   */
  deleteQuestion(index) {
    // Delete the question
    this.questions.splice(index, 1);

    // Update the questions cache
    this.updateQuestionsCache();
  }

  /**
   * Adds a new answer to the question at the specified index.
   * @param {number} index - The index of the question to add an answer to.
   */
  addAnswer(index) {
    // Add a new answer with default values
    this.questions[index].answers.push({ answer: "Tulis jawaban di sini", right_answer: false });

    // Update the questions cache
    this.updateQuestionsCache();
  }

  /**
   * Modifies an answer at the specified question and answer indices.
   * @param {number} questionIndex - The index of the question.
   * @param {number} answerIndex - The index of the answer.
   * @param {function} callback - The function to modify the answer.
   */
  modifyAnswer(questionIndex, answerIndex, callback) {
    // Modify the answer
    callback(this.questions[questionIndex].answers[answerIndex]);

    // Update the questions cache
    this.updateQuestionsCache();
  }

  /**
   * Deletes an answer at the specified question and answer indices.
   * If the deleted answer was the last right answer, assigns the first answer as the new right answer.
   * @param {number} questionIndex - The index of the question.
   * @param {number} answerIndex - The index of the answer.
   */
  deleteAnswer(questionIndex, answerIndex) {
    // Delete the answer
    this.questions[questionIndex].answers.splice(answerIndex, 1);

    // If there are no more right answers, assign the first answer as the new right answer
    if (this.questions[questionIndex].answers.filter(answer => answer.right_answer).length === 0 && this.questions[questionIndex].answers.length > 0) {
      this.questions[questionIndex].answers[0].right_answer = true;
    }

    // Update the questions cache
    this.updateQuestionsCache();
  }

  /**
   * Clears all questions and adds a new empty question.
   */
  clearQuestions() {
    // Clear the questions array
    this.questions = [];

    // Add a new default question
    this.addQuestion();
  }

  // TODO: Reorder question number by dragging

  publishAssignment(title, description, classroom, deadline) {
    alert("nice caulk");
    // Divide assignment, questions, and answers data into different arrays
    // let assignmentData = {"title": title, "description": description, "classroom": classroom, "deadline": deadline};
    // let questionsData = this.getQuestions();
    // let answersData = questions.map(question => question.answers);
  }
}

export default function CreateAssignment() {
  const [assignment] = useState(new Assignment());
  const [questions, setQuestions] = useState(assignment.getQuestions());

  useEffect(() => {
    setQuestions([...assignment.getQuestions()]);
  }, [assignment]);

  function clearQuestions() {
    if (confirm("Apakah kamu yakin mau menghapus semua soal?")) {
      assignment.clearQuestions();
      setQuestions([...assignment.getQuestions()]);
    }
  }

  function publishAssignment() {
    if (confirm("Apakah kamu yakin mau memposting tugas ini?")) {
      assignment.publishAssignment();
    }
  }

  // Components
  function NumberBox({ number }) {
    return (
      <a href={`#question${number-1}`} className="p-3 m-2 tw-rounded-lg tw-size-10 border-1 tw-border-grey d-flex justify-content-center align-items-center hover:tw-cursor-pointer hover:tw-bg-blue hover:tw-text-white tw-transition tw-duration-300 tw-text-black tw-no-underline">
        {number}
      </a>
    );
  }

  function Question({ index }) {
    const [edit, setEdit] = useState(false);
    const questionEditRef = useRef();

    function editQuestion(e) {
      e.preventDefault();
      assignment.modifyQuestion(index, question => {
        question.question = e.target.value;
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

    function Answer({ answerIndex, answer, right_answer }) {
      function modifyAnswer(callback) {
        assignment.modifyAnswer(index, answerIndex, callback);
        setQuestions([...assignment.getQuestions()]);
      }

      function editAnswer(e) {
        e.preventDefault();
        modifyAnswer(answer => {
          answer.answer = e.target.value;
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
        <div id={`question${index}`} className={`tw-scroll-m-36 border-1 my-2 tw-border-grey w-100 tw-h-fit px-3 tw-rounded-md d-flex justify-content-between align-items-center ${right_answer && "tw-bg-blue tw-text-white"}`}>
          <input onBlur={editAnswer} className="tw-bg-transparent me-5 my-2" type="text" defaultValue={answer} />
          <div className="tw-dropdown tw-dropdown-bottom tw-dropdown-end">
            <svg tabIndex={0} role="button" className="tw-w-[24px] tw-h-[24px] tw-rounded-full m-2 hover:tw-bg-grey tw-transition tw-duration-300 hover:tw-cursor-pointer p-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 13C9.5 13.3978 9.34196 13.7794 9.06066 14.0607C8.77936 14.342 8.39782 14.5 8 14.5C7.60218 14.5 7.22064 14.342 6.93934 14.0607C6.65804 13.7794 6.5 13.3978 6.5 13C6.5 12.6022 6.65804 12.2206 6.93934 11.9393C7.22064 11.658 7.60218 11.5 8 11.5C8.39782 11.5 8.77936 11.658 9.06066 11.9393C9.34196 12.2206 9.5 12.6022 9.5 13ZM9.5 8C9.5 8.39782 9.34196 8.77936 9.06066 9.06066C8.77936 9.34196 8.39782 9.5 8 9.5C7.60218 9.5 7.22064 9.34196 6.93934 9.06066C6.65804 8.77936 6.5 8.39782 6.5 8C6.5 7.60218 6.65804 7.22064 6.93934 6.93934C7.22064 6.65804 7.60218 6.5 8 6.5C8.39782 6.5 8.77936 6.65804 9.06066 6.93934C9.34196 7.22064 9.5 7.60218 9.5 8ZM9.5 3C9.5 3.39782 9.34196 3.77936 9.06066 4.06066C8.77936 4.34196 8.39782 4.5 8 4.5C7.60218 4.5 7.22064 4.34196 6.93934 4.06066C6.65804 3.77936 6.5 3.39782 6.5 3C6.5 2.60218 6.65804 2.22064 6.93934 1.93934C7.22064 1.65804 7.60218 1.5 8 1.5C8.39782 1.5 8.77936 1.65804 9.06066 1.93934C9.34196 2.22064 9.5 2.60218 9.5 3Z" fill={`${right_answer ? "#FEFCFF" : "#212529"}`}/>
            </svg>
            <ul tabIndex={0} className="tw-dropdown-content tw-z-[1] tw-menu p-2 tw-shadow tw-bg-white tw-rounded-lg tw-w-64">
              <li onClick={changeRightAnswer}>
                <a className="tw-no-underline tw-text-blue">🗹 Buat menjadi jawaban benar</a>
              </li>
              <li className={`${questions[index].answers.length > 2 ? "" : "tw-hidden"}`} onClick={deleteAnswer}>
                <a className="tw-no-underline tw-text-danger">🗑 Hapus jawaban</a>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="my-4">
        <div className="tw-font-semibold tw-text-2xl d-flex align-items-top">
          <div className="d-flex flex-column justify-content-center align-items-center me-2">
            <div>{index + 1}.</div>
            <div onClick={deleteQuestion} className="tw-w-[24px] tw-h-[24px] tw-rounded-full m-2 d-flex justify-content-center align-items-center tw-text-danger hover:tw-bg-grey tw-transition tw-duration-300 hover:tw-cursor-pointer">🗑</div>
          </div>
          <textarea
            onBlur={(e) => { setEdit(!edit); editQuestion(e); }}
            ref={questionEditRef}
            className={`tw-resize-none tw-bg-transparent w-100 ${edit ? "d-block" : "d-none"}`}
            defaultValue={questions[index].question}
          />
          <div onClick={() => { setEdit(!edit); setTimeout(() => { questionEditRef.current.focus(); }, 1); }} className={`${edit ? "d-none" : "w-100 hover:tw-cursor-text"}`}>
            {questions[index].question}
          </div>
        </div>

        <br />

        {questions[index].answers.map((answer, i) => (
          <Answer key={i} answerIndex={i} answer={answer.answer} right_answer={answer.right_answer} />
        ))}

        <div onClick={addAnswer} className="border-1 tw-border-grey w-100 tw-h-fit px-3 py-2 tw-rounded-md d-flex justify-content-center align-items-center hover:tw-cursor-pointer hover:tw-bg-blue hover:tw-text-white tw-transition tw-duration-300">
          +
        </div>
        <hr />
      </div>
    );
  }

  return (
      <>
      <dialog id="publish_assignment_modal" className="tw-modal">
        <div className="tw-modal-box tw-w-fit">
          <form method="dialog">
            <button className="tw-btn tw-btn-sm tw-btn-circle tw-btn-ghost tw-absolute tw-right-2 tw-top-2">✕</button>
          </form>

          {/* Profile content */}
          <div className="container tw-w-fit p-4 d-flex flex-column justify-content-center align-items-center">
            <h1 className="tw-text-3xl tw-font-bold">Finalisasi Tugas</h1>
            <form onSubmit={publishAssignment}>
              <label className="my-2 tw-form-control tw-w-full">
                <div className="tw-label">
                  <span className="tw-label-text">Judul Tugas</span>
                </div>
                <input type="text" className="tw-input tw-input-bordered tw-w-full tw-py-2" placeholder="Judul Tugas" name="title" required />
              </label>
              <label className="my-2 tw-form-control tw-w-full">
                <div className="tw-label">
                  <span className="tw-label-text">Deskripsi</span>
                </div>
                <textarea className="tw-textarea tw-textarea-bordered" name="description" placeholder="Deskripsi" required></textarea>
              </label>
              <label className="my-2 tw-form-control tw-w-full">
                <div className="tw-label">
                  <span className="tw-label-text">Kelas</span>
                </div>
                <select className="tw-select tw-select-bordered">
                  {JSON.parse(localStorage.getItem("classrooms")).map((classroom) => <option key={classroom.id} value={classroom.id}>{classroom.name}</option>)}
                </select>
              </label>

              <br />
              <button type="submit" className="p-3 tw-bg-success w-100 tw-rounded-md tw-text-white hover:tw-opacity-75 tw-transition tw-duration-300">Publikasikan</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="tw-w-screen tw-h-screen d-flex justify-content-center align-items-center">
        <div className="me-4">
          <div onClick={() => { sessionStorage.setItem("page", "assignments"); location.reload(); }} className="d-flex align-items-center tw-btn">
            <img src="ArrowDown.svg" alt="Back" className="tw-w-[16px] tw-h-[16px] tw-rotate-90 me-3" />
            <div className="tw-text-2xl tw-font-semibold">Pembuatan Tugas</div>
          </div>

          <br />

          <div className="p-4 border-1 tw-border-grey tw-rounded-lg tw-w-[25vw]">
            <div className="tw-h-[40vh] tw-overflow-y-scroll">
              <div className="d-flex flex-wrap">
                {questions.map((_question, i) => (
                  <NumberBox key={i} number={i + 1} />
                ))}
                <div onClick={() => { assignment.addQuestion(); setQuestions([...assignment.getQuestions()]); }} className="p-3 m-2 tw-rounded-lg tw-size-10 border-1 tw-border-grey d-flex justify-content-center align-items-center hover:tw-cursor-pointer hover:tw-bg-blue hover:tw-text-white tw-transition tw-duration-300">+</div>
              </div>
            </div>

            <br />

            <button onClick={() => document.getElementById("publish_assignment_modal").showModal()} className="p-3 tw-bg-success w-100 tw-rounded-md tw-text-white hover:tw-opacity-75 tw-transition tw-duration-300">Kirim Tugas</button>
            <div className="my-2"/>
            <button onClick={clearQuestions} className="p-3 tw-bg-danger w-100 tw-rounded-md tw-text-white hover:tw-opacity-75 tw-transition tw-duration-300">🗑 Hapus Semua Soal</button>
          </div>
        </div>

        <div className="border-1 tw-border-grey tw-rounded-lg p-4 tw-w-[45vw] tw-h-[90vh] tw-overflow-y-scroll tw-overflow-x-hidden">
          {questions.map((_question, i) => (
            <Question key={i} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}

// Functional (Just no, please...)
// import { useEffect, useRef, useState } from "react";

// /* eslint-disable react/prop-types */
// export default function CreateAssignment() {
//   // States
//   const [questions, setQuestions] = useState(JSON.parse(localStorage.getItem("createAssignment")) || []);

//   useEffect(() => {
//     if (questions.length === 0) {
//       addQuestion();
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   });

//   // Actions
//   function updateQuestionsCache(newQuestions) {
//     setQuestions(newQuestions);
//     localStorage.setItem("createAssignment", JSON.stringify(newQuestions));
//   }

//   function modifyQuestion(index, func) {
//     const newQuestions = [...questions];
//     func(newQuestions[index]);
//     updateQuestionsCache(newQuestions);
//   }

//   function addQuestion() {
//     let newQuestion = [...questions, {
//       "question": "Tuliskan pertanyaan di sini",
//       "answers": [{ "answer": "Jawaban 1", "right_answer": true }, { "answer": "Jawaban 2", "right_answer": false }, { "answer": "Jawaban 3", "right_answer": false }, { "answer": "Jawaban 4", "right_answer": false }]
//     }];
//     setQuestions(newQuestion);
//     updateQuestionsCache(newQuestion);
//   }

//   // Components
//   function NumberBox({ number }) {
//     return (
//       <>
//         <div className="p-3 m-2 tw-rounded-lg tw-w-fit border-1 tw-border-grey d-flex justify-content-center align-items-center hover:tw-cursor-pointer hover:tw-bg-blue hover:tw-text-white tw-transition tw-duration-300">{number}</div>
//       </>
//     )
//   }
//   function Question({ index }) {
//     const [edit, setEdit] = useState(false);
//     const questionEditRef = useRef();

//     function editQuestion(e) {
//       e.preventDefault();
//       modifyQuestion(index, question => {
//         question.question = e.target.value;
//       });
//     }

//     function deleteQuestion() {
//       const newQuestions = [...questions];
//       newQuestions.splice(index, 1);
//       updateQuestionsCache(newQuestions);
//     }

//     function addAnswer() {
//       modifyQuestion(index, question => {
//         question.answers.push({ answer: "Tulis jawaban di sini", right_answer: false });
//       });
//     }

//     function Answer({ answerIndex, answer, right_answer }) {
//       function modifyAnswer(callback) {
//         modifyQuestion(index, question => {
//           callback(question.answers[answerIndex]);
//         });
//       }
  
//       function editAnswer(e) {
//         e.preventDefault();
//         modifyAnswer(answer => {
//           answer.answer = e.target.value;
//         });
//       }
  
//       function changeRightAnswer() {
//         modifyQuestion(index, question => {
//           question.answers.forEach(answer => answer.right_answer = false);
//           question.answers[answerIndex].right_answer = !right_answer;
//         });
//       }
  
//       function deleteAnswer() {
//         modifyQuestion(index, question => {
//           question.answers.splice(answerIndex, 1);
//           if (question.answers.filter(answer => answer.right_answer).length === 0 && question.answers.length > 0) {
//             question.answers[0].right_answer = true;
//           }
//         });
//       }

//       return (
//         <>
//           <div className={`border-1 my-2 tw-border-grey w-100 tw-h-fit px-3 tw-rounded-md d-flex justify-content-between align-items-center ${right_answer && "tw-bg-blue tw-text-white"}`}>
//             <input onBlur={editAnswer} className="tw-bg-transparent me-5 my-2" type="text" defaultValue={answer} />
//             <div className="tw-dropdown tw-dropdown-bottom tw-dropdown-end">
//               <svg tabIndex={0} role="button" className="tw-w-[24px] tw-h-[24px] tw-rounded-full m-2 hover:tw-bg-grey tw-transition tw-duration-300 hover:tw-cursor-pointer p-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M9.5 13C9.5 13.3978 9.34196 13.7794 9.06066 14.0607C8.77936 14.342 8.39782 14.5 8 14.5C7.60218 14.5 7.22064 14.342 6.93934 14.0607C6.65804 13.7794 6.5 13.3978 6.5 13C6.5 12.6022 6.65804 12.2206 6.93934 11.9393C7.22064 11.658 7.60218 11.5 8 11.5C8.39782 11.5 8.77936 11.658 9.06066 11.9393C9.34196 12.2206 9.5 12.6022 9.5 13ZM9.5 8C9.5 8.39782 9.34196 8.77936 9.06066 9.06066C8.77936 9.34196 8.39782 9.5 8 9.5C7.60218 9.5 7.22064 9.34196 6.93934 9.06066C6.65804 8.77936 6.5 8.39782 6.5 8C6.5 7.60218 6.65804 7.22064 6.93934 6.93934C7.22064 6.65804 7.60218 6.5 8 6.5C8.39782 6.5 8.77936 6.65804 9.06066 6.93934C9.34196 7.22064 9.5 7.60218 9.5 8ZM9.5 3C9.5 3.39782 9.34196 3.77936 9.06066 4.06066C8.77936 4.34196 8.39782 4.5 8 4.5C7.60218 4.5 7.22064 4.34196 6.93934 4.06066C6.65804 3.77936 6.5 3.39782 6.5 3C6.5 2.60218 6.65804 2.22064 6.93934 1.93934C7.22064 1.65804 7.60218 1.5 8 1.5C8.39782 1.5 8.77936 1.65804 9.06066 1.93934C9.34196 2.22064 9.5 2.60218 9.5 3Z" fill={`${right_answer ? "#FEFCFF" : "#212529"}`}/>
//               </svg>
//               <ul tabIndex={0} className="tw-dropdown-content tw-z-[1] tw-menu p-2 tw-shadow tw-bg-white tw-rounded-lg tw-w-64">
//                 <li onClick={changeRightAnswer}><a className="tw-no-underline tw-text-blue">🗹 Buat menjadi jawaban benar</a></li>
//                 <li className={`${questions[index].answers.length > 2 ? "" : "tw-hidden"}`} onClick={deleteAnswer}><a className="tw-no-underline tw-text-danger">🗑 Hapus jawaban</a></li>
//               </ul>
//             </div>
//           </div>
//         </>
//       )
//     }
//     return (
//       <>
//         <div className="my-4">
//           {/* Question */}
//           <div className="tw-font-semibold tw-text-2xl d-flex align-items-top">
//             <div className="d-flex flex-column justify-content-center align-items-center me-2">
//               <div>{index+1}.</div>
//               <div onClick={deleteQuestion} className="tw-w-[24px] tw-h-[24px] tw-rounded-full m-2 d-flex justify-content-center align-items-center tw-text-danger hover:tw-bg-grey tw-transition tw-duration-300 hover:tw-cursor-pointer">🗑</div>
//             </div>
//             <textarea onBlur={(e) => {setEdit(!edit); editQuestion(e)}} ref={questionEditRef} className={`tw-resize-none tw-bg-transparent w-100 ${edit ? "d-block" : "d-none"}`} defaultValue={questions[index].question} />
//             <div onClick={() => {setEdit(!edit); setTimeout(() => {questionEditRef.current.focus()}, 1)}} className={`${edit ? "d-none" : "w-100 hover:tw-cursor-text"}`}>{questions[index].question}</div>
//           </div>

//           <br />

//           {/* Answers */}
//           {questions[index].answers.map((answer, i) => (
//             <Answer key={i} answerIndex={i} answer={answer.answer} right_answer={answer.right_answer} />
//           ))}

//           <div onClick={addAnswer} className={`border-1 tw-border-grey w-100 tw-h-fit px-3 py-2 tw-rounded-md d-flex justify-content-center align-items-center hover:tw-cursor-pointer hover:tw-bg-blue hover:tw-text-white tw-transition tw-duration-300`}>+</div>
//           <hr />
//         </div>
//       </>
//     )
//   }

//   return (
//     <>
//       <div className="tw-w-screen tw-h-screen d-flex justify-content-center align-items-center">
//         {/* Navigation */}
//         <div className="me-4">
//           {/* Back button */}
//           <div onClick={() => {sessionStorage.setItem("page", "assignments"); location.reload();}} className="d-flex align-items-center tw-btn">
//             <img src="ArrowDown.svg" alt="Back" className="tw-w-[16px] tw-h-[16px] tw-rotate-90 me-3" />
//             <div className="tw-text-2xl tw-font-semibold">Pembuatan Tugas</div>
//           </div>

//           <br />

//           {/* Quiz navigation */}
//           <div className="p-4 border-1 tw-border-grey tw-rounded-lg tw-w-[25vw]">
//             <div className="d-flex align-items-center flex-wrap">
//               {questions.map((_question, i) => (
//                 <NumberBox key={i} number={i + 1} />
//               ))}
//               <div onClick={addQuestion} className="p-3 m-2 tw-rounded-lg tw-w-fit border-1 tw-border-grey d-flex justify-content-center align-items-center hover:tw-cursor-pointer hover:tw-bg-blue hover:tw-text-white tw-transition tw-duration-300">+</div>
//             </div>

//             <br />

//             {/* Send asssignment */}
//             <button className="p-3 tw-bg-success w-100 tw-rounded-md tw-text-white hover:tw-opacity-75 tw-transition tw-duration-300">Kirim Tugas</button>
//           </div>
//         </div>

//         {/* Preview */}
//         <div className="border-1 tw-border-grey tw-rounded-lg p-4 tw-w-[45vw] tw-h-[90vh] tw-overflow-y-scroll tw-overflow-x-hidden">
//           {questions.map((_question, i) => (
//             <Question key={i} index={i} />
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }