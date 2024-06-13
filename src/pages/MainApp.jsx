import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { page } from "../utils/Page";
import Classrooms from "./Classrooms";
import Dashboard from "./Dashboard";

export default function MainApp() {
  return (
    <>
      {page !== "quiz" && (
        <div className="row tw-min-w-screen tw-min-h-screen m-0 g-0">
          {/* Sidebar occupies two columns */}
          <Sidebar/>
          {/* Main content occupies remaining columns */}
          <div className="col-10">
            <Navbar/>
            {page === "dashboard" && <Dashboard/>}
            {page === "classrooms" && <Classrooms/>}
          </div>
        </div>
      )}
    </>
  )
}