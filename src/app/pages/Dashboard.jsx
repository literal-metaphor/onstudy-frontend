import ClassCard from "../components/ClassCard";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  return (
    <div className="row">
        <div className="col-8 container mt-5 ms-5 lg:tw-h-screen">
          <div className="d-flex flex-column justify-content-start align-items-start">
            <div className="row">
              <div className="d-flex align-items-center p-0">
                <label htmlFor="sidebar" className="tw-btn tw-btn-ghost tw-drawer-button lg:tw-hidden">
                  <svg className="tw-w-[24px] tw-h-[24px] tw-b-transparent lg-tw-hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#4F6F52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </label>
                <p className="fw-medium fs-1">Hai, User</p>
              </div>
            </div>
            <form className="row mt-3">
              <div className="input-group p-0 border tw-rounded-lg w-100">
                <input
                  id="cari_kelas"
                  type="text"
                  className="form-control tw-bg-[#fff] tw-border-0"
                  placeholder="Cari kelas"
                />
                <span
                  className="input-group-text tw-bg-[#fff] tw-border-0 hover:tw-cursor-text"
                  onClick={() => window.document.getElementById("cari_kelas").focus()}
                >
                  <img
                    src="Dashboard/search.svg"
                    className="tw-w-[20px] tw-h-[20px]"
                    alt="Search"
                  />
                </span>
              </div>
            </form>
          </div>
          <div className="row gap-4 d-flex poppins mt-5 tw-h-[50vh] tw-overflow-x-hidden overflow-y-scroll">
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
          </div>
        </div>
        <div className="col-3 mt-5 d-flex flex-column">
            <h1 className="fw-medium fs-2 poppins">Tugas</h1>
            <div className="dropdown my-4 ">
              <button
                className="btn tw-h-[45px] tw-w-[90%] tw-bg-[#EBEBEB] hover:tw-outline-[#0F0F0F] dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Kelas
              </button>
              <ul className="dropdown-menu tw-w-[90%]">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            {/* List Tugas */}
            <br className="mt-2"/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
        </div>
     
  </div>
  )
}

export  default Dashboard;