import { PlainData } from "./PlainData";

export interface AnswerData extends PlainData {
  id: string;
  question_id: string;
  answer: string;
  right_answer: boolean;
  created_at: string;
  updated_at: string;
}