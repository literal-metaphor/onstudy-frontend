import ClassCard from "./components/ClassCard";

const App = () => {
  return (
    <>
      <div className="tw-drawer lg:tw-drawer-open">
        <input id="sidebar" type="checkbox" className="tw-drawer-toggle" />
        <div className="tw-drawer-content d-flex flex-column align-items-center justify-content-center">
        <section className="container-fluid">
        <div className="row">
          {/* <nav className="lg:tw-h-[100%] col-lg-1 col-sm-12 sm:tw-w-[100%] sm:tw-h-[10%] navbar navbar-expand-lg d-flex flex-column position-fixed start-0 px-2 py-4 bg-gray-100">
            <a href="" className="navbar-brand mx-auto mt-4 pt-1 mb-auto">
              <img
                src="Logo.png"
                width="48px"
                className="mx-auto"
                alt="logo"
              />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav align-items-center d-flex flex-column mx-auto">
                <li className="nav-item my-4">
                  <a className="nav-link btn btn-outline-secondary" href="#">
                    <img
                      src="Dashboard/house.svg"
                      alt="Home"
                      height="24px"
                      width="24px"
                    />
                  </a>
                </li>
                <li className="nav-item my-4">
                  <a className="nav-link btn btn-outline-secondary" href="#">
                    <img
                      src="Dashboard/tugas.svg"
                      alt="Assignments"
                      height="24px"
                      width="24px"
                    />
                  </a>
                </li>
                <li className="nav-item my-4">
                  <a className="nav-link btn btn-outline-secondary" href="#">
                    <img
                      src="Dashboard/kelas.svg"
                      alt="Classes"
                      height="24px"
                      width="24px"
                    />
                  </a>
                </li>
                <li className="nav-item my-4">
                  <a className="nav-link btn btn-outline-secondary" href="#">
                    <img
                      src="Dashboard/person.svg"
                      alt="Profile"
                      height="24px"
                      width="24px"
                    />
                  </a>
                </li>
              </ul>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.pathname = "/auth";
                }}
                className="btn btn-outline-secondary mx-auto mt-auto mb-4"
              >
                <img src="Dashboard/logout.svg" alt="Logout" height="24" width="24" />
              </button>
            </div>
          </nav> */}

          <div className="col-1 me-1"/>

          <div className="col-7 container mt-5 ps-4 pe-2">
            <h1 className="row fw-medium fs-1 poppins">Hai, User</h1>
            <form className="row mt-3">
              <div class="input-group p-0 border tw-rounded-lg w-50">
                <input type="text" class="form-control tw-bg-[#fff] tw-border-0" placeholder="Cari kelas"/>
                <span class="input-group-text tw-bg-[#fff] tw-border-0" id="basic-addon2">
                  <img src="Dashboard/search.svg" className="tw-w-[20px] tw-h-[20px]" alt="Search" />
                </span>
              </div>
            </form>
            <div className="row d-flex poppins mt-5">
              <ClassCard/>
              <ClassCard/>
              <ClassCard/>
              <ClassCard/>
              <ClassCard/>
              <ClassCard/>
            </div>
          </div>

          <div className="col-3 mt-5 d-flex flex-column">
            <div className="position-fixed end-0 w-25">
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
            <div className="tw-bg-[#EBEBEB]">

            </div>
            </div>
          </div>
        </div>
      </section>
        </div>
        <div className="tw-drawer-side position-fixed tw-w-10 tw-bg-[#FCFBF9]">
          <label htmlFor="sidebar" className="tw-drawer-overlay"></label>
          <ul className="tw-menu tw-p-4 w-100 tw-min-h-full tw-text-base-content">
            {/* Sidebar content here */}
            <li className="my-4">
              <a className="tw-btn tw-btn-ghost" href="">
                <img
                  src="Logo.png"
                  width="48px"
                  className="mx-auto"
                  alt="logo"
                />
              </a>
            </li>
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
            <li className="my-4">
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
