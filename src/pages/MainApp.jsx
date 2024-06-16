import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Classrooms from "./Classrooms";
import Dashboard from "./Dashboard";

import { page } from "../utils/Page";

// eslint-disable-next-line react/prop-types
export default function MainApp({ cacheData, updateCacheData }) {
  return (
    <>
      {page !== "quiz" && (
        <div className="row tw-min-w-screen tw-min-h-screen m-0 g-0">
          {/* Sidebar occupies two columns */}
          <Sidebar/>
          {/* Main content occupies remaining columns */}
          <div className="col-10">
            <Navbar cacheData={cacheData} updateCacheData={updateCacheData} />
            {page === "dashboard" && <Dashboard cacheData={cacheData} />}
            {page === "classrooms" && <Classrooms cacheData={cacheData} />}
          </div>
        </div>
      )}
    </>
  )
}