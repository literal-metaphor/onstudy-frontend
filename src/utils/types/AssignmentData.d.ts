import { PlainData } from "./PlainData";
import { QuestionData } from "./QuestionData";

export interface AssignmentData extends PlainData {
  id: string;
  classroom_id: string;
  title: string;
  description: string;
  deadline: string;
  questions: QuestionData[];
  created_at: string;
  updated_at: string;
}