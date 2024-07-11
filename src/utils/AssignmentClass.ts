import { api } from "../utils/API";
import { AssignmentData } from "../utils/types/AssignmentData";
import { QuestionData } from "../utils/types/QuestionData";
import { AnswerData } from "../utils/types/AnswerData";

/**
 * @class Assignment
 * @implements {AssignmentData}
 * @classdesc A class representing an assignment with methods to manage questions and answers.
 */
export default class Assignment implements AssignmentData {
  id: string;
  classroom_id: string;
  title: string;
  description: string;
  deadline: string;
  questions: QuestionData[];
  created_at: string;
  updated_at: string;

  /**
   * Constructs a new Assignment instance.
   * Retrieves the questions from local storage or creates a new one if empty.
   */
  constructor() {
    this.id = "";
    this.classroom_id = "";
    this.title = "";
    this.description = "";
    this.deadline = "";
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();

    // Retrieve questions from local storage
    const storedQuestions = localStorage.getItem("createAssignment");
    this.questions = storedQuestions ? JSON.parse(storedQuestions) : [];

    // If no questions exist, add a new one
    if (this.questions.length === 0) {
      this.addQuestion();
    }
  }

  /**
   * Returns the questions array.
   * @returns {QuestionData[]} The questions array.
   */
  getQuestions(): QuestionData[] {
    return this.questions;
  }

  /**
   * Updates the questions cache in local storage.
   */
  updateQuestionsCache(): void {
    localStorage.setItem("createAssignment", JSON.stringify(this.questions));
  }

  /**
   * Modifies a question at the specified index.
   * @param {number} index - The index of the question to modify.
   * @param {(question: QuestionData) => void} func - The function to modify the question.
   */
  modifyQuestion(index: number, func: (question: QuestionData) => void): void {
    try {
      func(this.questions[index]);
      this.updateQuestionsCache();
    } catch (error) {
      console.error("Failed to modify question:", error);
    }
  }

  /**
   * Adds a new question to the assignment.
   */
  addQuestion(): void {
    const createAnswer = (answer: string, rightAnswer: boolean) => ({
      id: "",
      question_id: "",
      answer,
      right_answer: rightAnswer,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    const newQuestion = {
      id: "",
      assignment_id: "",
      question: "Tuliskan pertanyaan di sini",
      answers: [
        createAnswer("Jawaban 1", true),
        createAnswer("Jawaban 2", false),
        createAnswer("Jawaban 3", false),
        createAnswer("Jawaban 4", false),
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      this.questions.push(newQuestion);
      this.updateQuestionsCache();
    } catch (error) {
      console.error("Failed to add question:", error);
    }
  }

  /**
   * Deletes a question at the specified index.
   * @param {number} index - The index of the question to delete.
   */
  deleteQuestion(index: number): void {
    try {
      this.questions.splice(index, 1);
      this.updateQuestionsCache();
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  }

  /**
   * Adds a new answer to the question at the specified index.
   * @param {number} index - The index of the question to add an answer to.
   */
  addAnswer(index: number): void {
    try {
      this.questions[index].answers.push({
        id: "",
        question_id: "",
        answer: "Tulis jawaban di sini",
        right_answer: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      this.updateQuestionsCache();
    } catch (error) {
      console.error("Failed to add answer:", error);
    }
  }

  /**
   * Modifies an answer at the specified question and answer indices.
   * @param {number} questionIndex - The index of the question.
   * @param {number} answerIndex - The index of the answer.
   * @param {(answer: AnswerData) => void} callback - The function to modify the answer.
   */
  modifyAnswer(questionIndex: number, answerIndex: number, callback: (answer: AnswerData) => void): void {
    try {
      callback(this.questions[questionIndex].answers[answerIndex]);
      this.updateQuestionsCache();
    } catch (error) {
      console.error("Failed to modify answer:", error);
    }
  }

  /**
   * Deletes an answer at the specified question and answer indices.
   * If the deleted answer was the last right answer, assigns the first answer as the new right answer.
   * @param {number} questionIndex - The index of the question.
   * @param {number} answerIndex - The index of the answer.
   */
  deleteAnswer(questionIndex: number, answerIndex: number): void {
    try {
      this.questions[questionIndex].answers.splice(answerIndex, 1);

      // If there are no more right answers, assign the first answer as the new right answer
      if (this.questions[questionIndex].answers.filter(answer => answer.right_answer).length === 0 && this.questions[questionIndex].answers.length > 0) {
        this.questions[questionIndex].answers[0].right_answer = true;
      }

      this.updateQuestionsCache();
    } catch (error) {
      console.error("Failed to delete answer:", error);
    }
  }

  /**
   * Clears all questions and adds a new empty question.
   */
  clearQuestions(): void {
    try {
      this.questions = [];
      this.addQuestion();
    } catch (error) {
      console.error("Failed to clear questions:", error);
    }
  }

  /**
   * Publishes the assignment by sending a POST request to the API.
   * If successful, updates the local storage with the new assignment data.
   *
   * @param {string} title - The title of the assignment.
   * @param {string} description - The description of the assignment.
   * @param {string} classroom_id - The ID of the classroom.
   * @param {string} deadline - The deadline of the assignment.
   * @throws {Error} - If there is an error while publishing the assignment.
   */
  async publishAssignment(title: string, description: string, classroom_id: string, deadline: string): Promise<void> {
    const questions: QuestionData[] = this.getQuestions();

    try {
      if (questions.length < 1) {
        throw new Error("Tidak ada pertanyaan yang ditambahkan.");
      }

      // ? I already implemented good type checking on client side. Not sure if this is necessary, but just for safe measure.
      for (const question of questions) {
        if (question.question === "") {
          throw new Error("Salah satu soal tidak memiliki pertanyaan.");
        }
        if (question.answers.length < 1) {
          throw new Error("Salah satu soal tidak memiliki jawaban.");
        }

        let rightAnswer: number = 0;
        for (const answer of question.answers) {
          if (answer.right_answer) {
            rightAnswer++;
          }
          if (answer.answer === "") {
            throw new Error("Salah satu soal tidak memiliki jawaban yang terisi.");
          }
        }
        if (rightAnswer !== 1) {
          throw new Error("Salah satu soal tidak memiliki jawaban yang benar atau memiliki lebih dari satu jawaban yang benar.");
        }
      }
    } catch (err) {
      alert(err);
    } finally {
      const data: AssignmentData = {
        id: "",
        classroom_id,
        title,
        description,
        deadline,
        questions: questions,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      try {
        const res = await api.post(`/assignments/create_full_assignment`, data);
        const assignments: AssignmentData[] = JSON.parse(localStorage.getItem("assignmentsData") || "[]");
        localStorage.setItem("assignmentsData", JSON.stringify([...assignments, res.data]));
      } catch (err) {
        console.error(err);
        alert((err as { response: { data: { message: string } } }).response.data.message);
      }
    }
  }
}