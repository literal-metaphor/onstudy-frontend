import { PlainData } from "./PlainData";

export interface UserData extends PlainData {
  id: string;
  email: string;
  name: string;
  photo: string | null;
  remember_token: string;
  created_at: string;
  updated_at: string;
}