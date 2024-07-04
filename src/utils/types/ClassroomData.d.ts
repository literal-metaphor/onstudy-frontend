import { UserData } from "./UserData";
import { AssignmentData } from "./AssignmentData";

export interface ClassroomData {
  id: string;
  name: string;
  subject: "Sains" | "Matematika" | "Bahasa" | "Informatika" | "Sosial" | "Seni";
  teacher: UserData;
  students: UserData[];
  assignments: AssignmentData[];
  created_at: string;
  updated_at: string;
}