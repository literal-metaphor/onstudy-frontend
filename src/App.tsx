import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Classrooms from "./pages/Classrooms";
import { api } from "./utils/API";
import { UserData } from "./utils/types/UserData";
import Classroom from "./pages/Classroom";
import CreateAssignment from "./pages/CreateAssignment";
import { ClassroomData } from "./utils/types/ClassroomData";
import { AssignmentData } from "./utils/types/AssignmentData";
import Assignments from "./pages/Assignments";
import Assignment from "./pages/Assignment";
import Quiz from "./pages/Quiz";
import { encryptData } from "./utils/Encryptor";
import SyncStatusContext from "./components/SyncStatusContext";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const page = sessionStorage.getItem("page");
  // Create sync status state
  const [syncStatus, setSyncStatus] = useState<number>(1);
  // * Code: 1 = Loading, 2 = Successful, 3 = Failed

  async function syncUserData(): Promise<void> {
    const userData: UserData = JSON.parse(localStorage.getItem("userData")!);
    if (!userData) {
      throw new Error("Data pengguna tidak ditemukan.");
    }

    const response = await api.get(`/users/get_user_by_id/${userData.id}`);
    if (!response.data) {
      throw new Error(response.data.message);
    }

    const syncUserData: UserData = response.data;
    if (!syncUserData || typeof syncUserData !== 'object') {
      throw new Error("Data pengguna tidak bisa diproses.");
    }

    localStorage.setItem("userData", JSON.stringify(syncUserData));
  }

  async function syncClassroomsData(): Promise<void> {
    const userData: UserData = JSON.parse(localStorage.getItem("userData")!);
    if (!userData) {
      throw new Error("Data pengguna tidak ditemukan.");
    }

    const response = await api.get(`/classrooms/get_classrooms_by_user_id/${userData.id}`);
    if (!response.data) {
      throw new Error(response.data.message);
    }

    const classrooms: ClassroomData[] = response.data;
    if (!Array.isArray(classrooms) || classrooms.some((classroom: ClassroomData) => typeof classroom !== 'object')) {
       throw new Error("Data kelas tidak bisa diproses.");
    }

    // Obscure the remember_token of each teacher
    for (const classroom of classrooms) {
      classroom.teacher.remember_token = "********";
    }

    localStorage.setItem("classroomsData", JSON.stringify(classrooms));
  }

  async function syncAssignmentsData(): Promise<void> {
    const classroomsData: ClassroomData[] = JSON.parse(localStorage.getItem("classroomsData")!);
    if (!classroomsData) {
      throw new Error("Data kelas tidak ditemukan.");
    }

    for (const classroomData of classroomsData) {
      const response = await api.get(`/assignments/get_full_assignments_by_classroom_id/${classroomData.id}`);
      if (!response.data) {
        throw new Error(response.data.message);
      }

      const assignments: AssignmentData[] = response.data;
      if (!Array.isArray(assignments) || assignments.some((assignment: AssignmentData) => typeof assignment !== 'object')) {
        throw new Error("Data tugas tidak bisa diproses.");
      }

      localStorage.setItem(`assignmentsData`, JSON.stringify(encryptData(assignments)));
    }

  }

  const syncData = useCallback(async (): Promise<boolean> => {
    try {
      // Clear previous data
      // if (!localStorage.getItem("userData")) {
      //   !It's impossible for userData to be null and for the user to be able to access the app.
      //   localStorage.setItem("userData", JSON.stringify({}));
      // }
      if (!localStorage.getItem("classroomsData")) {
        localStorage.setItem("classroomsData", JSON.stringify([]));
      }
      if (!localStorage.getItem("assignmentsData")) {
        localStorage.setItem("assignmentsData", JSON.stringify([]));
      }

      // Sync new data from server
      await Promise.all([syncUserData(), syncClassroomsData(), syncAssignmentsData()]);

      setSyncStatus(2);

      return true;
    } catch (err) {
      console.error(err);
      alert(err);
      setSyncStatus(3);
      return false;
    }
  }, []);

  useEffect(() => {
    // Verify user token actually exists
    const userData = JSON.parse(localStorage.getItem("userData")!) as UserData;
    if (userData && userData.remember_token) {
      api.get(`/users/verify?remember_token=${userData.remember_token}`).catch(() => {
        localStorage.clear();
        location.reload();
      });
    }

    // If the page is not set, set it to "dashboard"
    if (!page) {
      sessionStorage.setItem("page", "dashboard");
      location.reload();
    }
  })

  useEffect(() => {
    syncData();
  })

  return (
    <>
      {!["createAssignment", "quiz", "loading"].includes(page!) && (
        <div className="grid grid-cols-12">
          <div className="col-span-2 bg-white border-r border-grey min-h-screen">
            <Sidebar />
          </div>
          <div className="col-span-10">
            <SyncStatusContext.Provider value={syncStatus}>
              <Navbar/>
            </SyncStatusContext.Provider>
            {page === "dashboard" && <Dashboard />}
            {page === "classrooms" && <Classrooms />}
            {page === "assignments" && <Assignments />}
            {page === "classroom" && <Classroom />}
            {page === "assignment" && <Assignment />}
          </div>
        </div>
      )}
      {page === "createAssignment" && <CreateAssignment />}
      {page === "quiz" && <Quiz />}
    </>
  )
}