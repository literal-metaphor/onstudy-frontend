const App = () => {
  return (
    <>
      <section className="container-fluid">
        <div className="row">
          <div className="sidebar col-1">
            <nav className="vh-100 d-flex flex-column position-fixed start-0 navbar">
              <a href="#" className="navbar-brand mx-auto mt-4 pt-1 mb-auto">
                <img
                  src="Logo.png"
                  width="48px"
                  className="mx-auto"
                  alt="logo"
                />
              </a>
              <ul className="navbar-nav align-items-center mx-auto">
                <li className="nav-item my-4">
                  <a className="nav-link" href="#">
                    <img
                      src="Dashboard/house.svg"
                      alt="Home"
                      height="25px"
                      width="30px"
                    />
                  </a>
                </li>
                <li className="nav-item my-4">
                  <a className="nav-link" href="#">
                    <img
                      src="Dashboard/tugas.svg"
                      alt="Assignments"
                      height="24px"
                      width="30px"
                    />
                  </a>
                </li>
                <li className="nav-item my-4">
                  <a className="nav-link" href="#">
                    <img
                      src="Dashboard/kelas.svg"
                      alt="Classes"
                      height="25px"
                      width="30px"
                    />
                  </a>
                </li>
                <li className="nav-item my-4">
                  <a className="nav-link" href="#">
                    <img
                      src="Dashboard/person.svg"
                      alt="Profile"
                      height="25px"
                      width="30px"
                    />
                  </a>
                </li>
              </ul>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.pathname = "/auth";
                }}
                className="tw-btn tw-btn-ghost mx-auto mt-auto mb-4"
              >
                <img src="Dashboard/logout.svg" alt="Logout" />
              </button>
            </nav>
          </div>

          <div className="col-7 container mt-5">
            <h1 className="row fw-medium fs-1 poppins">Hello, User</h1>
            <form action="" className="row mt-3">
              <label className="tw-input tw-input-bordered tw-flex tw-item-center w-25 p-0">
                <input type="text" className="grow" placeholder="Search" />
                <img src="Dashboard/search.svg" height="21" alt="" />
              </label>
            </form>
            <div className="row d-flex poppins mt-5">
              <div className="tw-card tw-card-side w-50 bg-primary text-primary-content">
                <div className="tw-card-body">
                  <p className="tw-card-title fs-1">IPA</p>
                  <div>Guru</div>
                  <div className="tw-card-actions justify-start">
                    <button className="btn-outlined-sky-900 ">
                      Lihat Kelas
                    </button>
                  </div>
                </div>
                <img
                  src="Dashboard/ipa.svg"
                  className="tw-w-[192px] tw-h-[192px]"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-4 mt-5 d-flex flex-column">
            <h1 className="fw-medium fs-2 poppins">Tugas</h1>
            <div className="dropdown my-4 ">
              <button
                className="btn tw-h-[45px] w-75 tw-bg-[#EBEBEB] hover:tw-outline-[#0F0F0F] dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
               Kelas
              </button>
              <ul className="dropdown-menu w-75">
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
            .tw-bg-[#EBEBEB]
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
