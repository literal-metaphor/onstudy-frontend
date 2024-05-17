import ClassCard from "../components/ClassCard";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  return (
    <div className="row">
        <div className="col-7 offset-1 container mt-5">
          <h1 className="row fw-medium fs-1 poppins">Hai, User</h1>
          <form className="row mt-3">
            <div className="input-group p-0 border tw-rounded-lg w-50">
              <input
                type="text"
                className="form-control tw-bg-[#fff] tw-border-0"
                placeholder="Cari kelas"
              />
              <span
                className="input-group-text tw-bg-[#fff] tw-border-0"
                id="basic-addon2"
              >
                <img
                  src="Dashboard/search.svg"
                  className="tw-w-[20px] tw-h-[20px]"
                  alt="Search"
                />
              </span>
            </div>
          </form>
          <div className="row gap-4 d-flex poppins mt-5">
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
          </div>
        </div>
        <div className="col-4 mt-5 d-flex flex-column">
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