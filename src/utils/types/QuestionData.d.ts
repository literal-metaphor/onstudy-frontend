import { AnswerData } from "./AnswerData";
import { PlainData } from "./PlainData";

export interface QuestionData extends PlainData {
  id: string;
  assignment_id: string;
  question: string;
  answers: AnswerData[];
  created_at: string;
  updated_at: string;
}