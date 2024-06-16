import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Classrooms from "./Classrooms";
import Dashboard from "./Dashboard";

import { page } from "../utils/Page";
import Assignments from "./Assignments";

// eslint-disable-next-line react/prop-types
export default function MainApp({ cacheData, updateCacheData }) {
  const cacheProps = { cacheData, updateCacheData };

  return (
    <>
      {page !== "quiz" && (
        <div className="row tw-min-w-screen tw-min-h-screen m-0 g-0">
          {/* Sidebar occupies two columns */}
          <Sidebar/>
          {/* Main content occupies remaining columns */}
          <div className="col-10">
            <Navbar {...cacheProps}/>
            {page === "dashboard" && <Dashboard {...cacheProps} />}
            {page === "classrooms" && <Classrooms {...cacheProps} />}
            {page === "assignments" && <Assignments {...cacheProps} />}
          </div>
        </div>
      )}
    </>
  )
}
