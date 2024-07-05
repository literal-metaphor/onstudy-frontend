import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Classrooms from "./pages/Classrooms";
import { api } from "./utils/API";
import { UserData } from "./utils/types/UserData";
import Classroom from "./pages/Classroom";

export default function App() {
  const page = sessionStorage.getItem("page");

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

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2 bg-white border-r border-grey min-h-screen">
          <Sidebar />
        </div>
        <div className="col-span-10">
          <Navbar/>
          {/* {page === "dashboard" && <Dashboard />} */}
          {page === "classrooms" && <Classrooms />}
          {/* {page === "assignments" && <Assignments />} */}
          {page === "classroom" && <Classroom />}
          {/* {page === "assignment" && <Assignment />} */}
        </div>
      </div>
    </>
  )
}