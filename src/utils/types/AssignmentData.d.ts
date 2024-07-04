import { QuestionData } from "./QuestionData";

export interface AssignmentData {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  questions: QuestionData[];
  created_at: string;
  updated_at: string;
}