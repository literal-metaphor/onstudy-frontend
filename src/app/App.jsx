import ClassCard from "./components/ClassCard";
import TaskCard from "./components/TaskCard";

const App = () => {
  return (
    <>
      <div className="tw-drawer lg:tw-drawer-open">
        <input id="sidebar" type="checkbox" className="tw-drawer-toggle" />
        <div className="tw-drawer-content d-flex flex-column align-items-center justify-content-center">
          <section className="container-fluid">
            <div className="row">
              <div className="col-7 offset-1 container mt-5">
                <h1 className="row fw-medium fs-1 poppins">Hai, User</h1>
                <form className="row mt-3">
                  <div className="input-group p-0 border tw-rounded-lg w-50">
                    <input
                      type="text"
                      class="form-control tw-bg-[#fff] tw-border-0"
                      placeholder="Cari kelas"
                    />
                    <span
                      class="input-group-text tw-bg-[#fff] tw-border-0"
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
          </section>
        </div>
        <div className="tw-drawer-side position-fixed overflow-hidden tw-bg-[#FCFBF9]">
          <label htmlFor="sidebar" className="tw-drawer-overlay"></label>

          <ul className="tw-menu tw-p-4 w-100 tw-min-h-full tw-text-base-content">
            {/* Sidebar content here */}
            <a className="tw-btn tw-btn-ghost p-0 mb-5" href="">
              <img src="Logo.png" width="48px" className="" alt="logo" />
            </a>
            <li className="my-4">
              <a className="tw-btn tw-btn-ghost" href="#">
                <img
                  src="Dashboard/house.svg"
                  alt="Home"
                  height="24px"
                  width="24px"
                />
              </a>
            </li>
            <li className="my-4">
              <a className="tw-btn tw-btn-ghost" href="#">
                <img
                  src="Dashboard/tugas.svg"
                  alt="Assignments"
                  height="24px"
                  width="24px"
                />
              </a>
            </li>
            <li className="my-4">
              <a className="tw-btn tw-btn-ghost" href="#">
                <img
                  src="Dashboard/kelas.svg"
                  alt="Classes"
                  height="24px"
                  width="24px"
                />
              </a>
            </li>
            <li className="my-4">
              <a className="tw-btn tw-btn-ghost" href="#">
                <img
                  src="Dashboard/person.svg"
                  alt="Profile"
                  height="24px"
                  width="24px"
                />
              </a>
            </li>
            <li className="mt-auto mb-5">
              <a className="tw-btn tw-btn-ghost" href="#">
                <img
                  src="Dashboard/logout.svg"
                  alt="Logout"
                  height="24px"
                  width="24px"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
