import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import Classrooms from "./Classrooms";
import Assignments from "./Assignments";
import Classroom from "./Classroom";
import { page } from "../utils/Page";
import CreateAssignment from "./CreateAssignment";

// eslint-disable-next-line react/prop-types
export default function MainApp({ cacheData, updateCacheData, syncWithServer }) {
  const noNavPages = ["quiz", "createAssignment", "loading"];
  const cacheProps = { cacheData, updateCacheData, syncWithServer };

  return (
    <>
    {page === "createAssignment" && <CreateAssignment {...cacheProps} />}
      {!noNavPages.includes(page) && (
        <div className="row tw-min-w-screen tw-min-h-screen m-0 g-0">
          {/* Sidebar occupies two columns */}
          <Sidebar/>
          {/* Main content occupies remaining columns */}
          <div className="col-10">
            <Navbar {...cacheProps}/>
            {page === "dashboard" && <Dashboard {...cacheProps} />}
            {page === "classrooms" && <Classrooms {...cacheProps} />}
            {page === "assignments" && <Assignments {...cacheProps} />}
            {page === "classroom" && <Classroom {...cacheProps} />}
          </div>
        </div>
      )}
    </>
  )
}
