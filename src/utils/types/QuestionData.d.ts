import { AnswerData } from "./AnswerData";

export interface QuestionData {
  id: string;
  question: string;
  number: number;
  answers: AnswerData[];
  created_at: string;
  updated_at: string;
}