import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Classrooms from "./pages/Classrooms";

export default function App() {
  const page = sessionStorage.getItem("page");

  useEffect(() => {
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
          {/* {page === "classroom" && <Classroom />} */}
          {/* {page === "assignment" && <Assignment />} */}
        </div>
      </div>
    </>
  )
}