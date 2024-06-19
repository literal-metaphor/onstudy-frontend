import { useEffect, useRef, useState } from "react";

/* eslint-disable react/prop-types */
export default function CreateAssignment() {
  // States
  const [questions, setQuestions] = useState(JSON.parse(localStorage.getItem("createAssignment")) || []);

  useEffect(() => {
    if (questions.length === 0) {
      addQuestion();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Actions
  function updateQuestionsCache(newQuestions) {
    localStorage.setItem("createAssignment", JSON.stringify(newQuestions));
  }
  function addQuestion() {
    let newQuestion = [...questions, {
      "question": "Tuliskan pertanyaan di sini",
      "answers": [{ "answer": "Jawaban 1", "right_answer": true }, { "answer": "Jawaban 2", "right_answer": false }, { "answer": "Jawaban 3", "right_answer": false }, { "answer": "Jawaban 4", "right_answer": false }]
    }];
    setQuestions(newQuestion);
    updateQuestionsCache(newQuestion);
  }

  // Components
  function NumberBox({ number }) {
    return (
      <>
        <div className="p-3 m-2 tw-rounded-lg tw-w-fit border-1 tw-border-grey d-flex justify-content-center align-items-center hover:tw-cursor-pointer hover:tw-bg-blue hover:tw-text-white tw-transition tw-duration-300">{number}</div>
      </>
    )
  }
  function Question({ index }) {
    const [edit, setEdit] = useState(false);
    const questionEditRef = useRef();

    function editQuestion(e) {
      e.preventDefault();
      let newQuestions = [...questions];
      newQuestions[index].question = e.target.value;
      setQuestions(newQuestions);
      updateQuestionsCache(newQuestions);
    }

    function deleteQuestion() {
      let newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
      updateQuestionsCache(newQuestions);
    }

    function addAnswer() {
      let newQuestions = [...questions];
      newQuestions[index].answers.push({ "answer": "Tulis jawaban di sini", "right_answer": false });
      setQuestions(newQuestions);
      updateQuestionsCache(newQuestions);
    }

    function Answer({ answerIndex, answer, right_answer }) {
      function editAnswer(e) {
        e.preventDefault();
        let newQuestions = [...questions];
        newQuestions[index].answers[answerIndex].answer = e.target.value;
        setQuestions(newQuestions);
        updateQuestionsCache(newQuestions);
      }

      function changeRightAnswer() {
        let newQuestions = [...questions];
        newQuestions[index].answers.forEach((answer) => answer.right_answer = false);
        newQuestions[index].answers[answerIndex].right_answer = !right_answer;
        setQuestions(newQuestions);
        updateQuestionsCache(newQuestions);
      }

      function deleteAnswer() {
        let newQuestions = [...questions];
        newQuestions[index].answers.splice(answerIndex, 1);
        if (newQuestions[index].answers.filter((answer) => answer.right_answer).length === 0) {
          newQuestions[index].answers[0].right_answer = true;
        }
        setQuestions(newQuestions);
        updateQuestionsCache(newQuestions);
      }

      return (
        <>
          <div className={`border-1 my-2 tw-border-grey w-100 tw-h-fit px-3 tw-rounded-md d-flex justify-content-between align-items-center ${right_answer && "tw-bg-blue tw-text-white"}`}>
            <input onBlur={editAnswer} className="tw-bg-transparent me-5 my-2" type="text" defaultValue={answer} />
            <div className="tw-dropdown tw-dropdown-bottom tw-dropdown-end">
              <svg tabIndex={0} role="button" className="tw-w-[24px] tw-h-[24px] tw-rounded-full m-2 hover:tw-bg-grey tw-transition tw-duration-300 hover:tw-cursor-pointer p-1" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 13C9.5 13.3978 9.34196 13.7794 9.06066 14.0607C8.77936 14.342 8.39782 14.5 8 14.5C7.60218 14.5 7.22064 14.342 6.93934 14.0607C6.65804 13.7794 6.5 13.3978 6.5 13C6.5 12.6022 6.65804 12.2206 6.93934 11.9393C7.22064 11.658 7.60218 11.5 8 11.5C8.39782 11.5 8.77936 11.658 9.06066 11.9393C9.34196 12.2206 9.5 12.6022 9.5 13ZM9.5 8C9.5 8.39782 9.34196 8.77936 9.06066 9.06066C8.77936 9.34196 8.39782 9.5 8 9.5C7.60218 9.5 7.22064 9.34196 6.93934 9.06066C6.65804 8.77936 6.5 8.39782 6.5 8C6.5 7.60218 6.65804 7.22064 6.93934 6.93934C7.22064 6.65804 7.60218 6.5 8 6.5C8.39782 6.5 8.77936 6.65804 9.06066 6.93934C9.34196 7.22064 9.5 7.60218 9.5 8ZM9.5 3C9.5 3.39782 9.34196 3.77936 9.06066 4.06066C8.77936 4.34196 8.39782 4.5 8 4.5C7.60218 4.5 7.22064 4.34196 6.93934 4.06066C6.65804 3.77936 6.5 3.39782 6.5 3C6.5 2.60218 6.65804 2.22064 6.93934 1.93934C7.22064 1.65804 7.60218 1.5 8 1.5C8.39782 1.5 8.77936 1.65804 9.06066 1.93934C9.34196 2.22064 9.5 2.60218 9.5 3Z" fill={`${right_answer ? "#FEFCFF" : "#212529"}`}/>
              </svg>
              <ul tabIndex={0} className="tw-dropdown-content tw-z-[1] tw-menu p-2 tw-shadow tw-bg-white tw-rounded-lg tw-w-64">
                <li onClick={changeRightAnswer}><a className="tw-no-underline tw-text-blue">🗹 Buat menjadi jawaban benar</a></li>
                <li className={`${questions[index].answers.length > 2 ? "" : "tw-hidden"}`} onClick={deleteAnswer}><a className="tw-no-underline tw-text-danger">🗑 Hapus jawaban</a></li>
              </ul>
            </div>
          </div>
        </>
      )
    }
    return (
      <>
        <div className="my-4">
          {/* Question */}
          <div className="tw-font-semibold tw-text-2xl d-flex align-items-top">
            <div className="d-flex flex-column justify-content-center align-items-center me-2">
              <div>{index+1}.</div>
              <div onClick={deleteQuestion} className="tw-w-[24px] tw-h-[24px] tw-rounded-full m-2 d-flex justify-content-center align-items-center tw-text-danger hover:tw-bg-grey tw-transition tw-duration-300 hover:tw-cursor-pointer">🗑</div>
            </div>
            <textarea onBlur={(e) => {setEdit(!edit); editQuestion(e)}} ref={questionEditRef} className={`tw-resize-none tw-bg-transparent w-100 ${edit ? "d-block" : "d-none"}`} defaultValue={questions[index].question} />
            <div onClick={() => {setEdit(!edit); setTimeout(() => {questionEditRef.current.focus()}, 1)}} className={`${edit ? "d-none" : "w-100 hover:tw-cursor-text"}`}>{questions[index].question}</div>
          </div>

          <br />

          {/* Answers */}
          {questions[index].answers.map((answer, i) => (
            <Answer key={i} answerIndex={i} answer={answer.answer} right_answer={answer.right_answer} />
          ))}

          <div onClick={addAnswer} className={`border-1 tw-border-grey w-100 tw-h-fit px-3 py-2 tw-rounded-md d-flex justify-content-center align-items-center hover:tw-cursor-pointer hover:tw-bg-blue hover:tw-text-white tw-transition tw-duration-300`}>+</div>
          <hr />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="tw-w-screen tw-h-screen d-flex justify-content-center align-items-center">
        {/* Navigation */}
        <div className="me-4">
          {/* Back button */}
          <div className="d-flex align-items-center tw-btn">
            <img src="ArrowDown.svg" alt="Back" className="tw-w-[16px] tw-h-[16px] tw-rotate-90 me-3" />
            <div className="tw-text-2xl tw-font-semibold">Pembuatan Tugas</div>
          </div>

          <br />

          {/* Quiz navigation */}
          <div className="p-4 border-1 tw-border-grey tw-rounded-lg tw-w-[25vw]">
            <div className="d-flex align-items-center flex-wrap">
              {questions.map((_question, i) => (
                <NumberBox key={i} number={i + 1} />
              ))}
              <div onClick={addQuestion} className="p-3 m-2 tw-rounded-lg tw-w-fit border-1 tw-border-grey d-flex justify-content-center align-items-center hover:tw-cursor-pointer hover:tw-bg-blue hover:tw-text-white tw-transition tw-duration-300">+</div>
            </div>

            <br />

            {/* Send asssignment */}
            <button className="p-3 tw-bg-success w-100 tw-rounded-md tw-text-white hover:tw-opacity-75 tw-transition tw-duration-300">Kirim Tugas</button>
          </div>
        </div>

        {/* Preview */}
        <div className="border-1 tw-border-grey tw-rounded-lg p-4 tw-w-[45vw] tw-h-[90vh] tw-overflow-y-scroll tw-overflow-x-hidden">
          {questions.map((_question, i) => (
            <Question key={i} index={i} />
          ))}
        </div>
      </div>
    </>
  )
}