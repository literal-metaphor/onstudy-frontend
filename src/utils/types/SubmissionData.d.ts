import { PlainData } from "./PlainData";

export interface SubmissionData extends PlainData {
  id: string;
  assignment_id: string;
  user_id: string;
  grade: number;
  created_at: string;
  updated_at: string;
}