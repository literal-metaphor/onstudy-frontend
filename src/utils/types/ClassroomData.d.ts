import { UserData } from "./UserData";

export interface ClassroomData {
  id: string;
  name: string;
  subject: "Sains" | "Matematika" | "Bahasa" | "Informatika" | "Sosial" | "Seni";
  teacher: UserData;
  students: UserData[];
  created_at: string;
  updated_at: string;
}