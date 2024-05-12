const App = () => {
  return (
    <>
      <section className="container-fluid">
        <div className="row">
          <div className="sidebar col-1">
            <nav className="vh-100 d-flex flex-column position-fixed start-0 navbar">
              <a href="#" className="navbar-brand mx-auto mt-4 mb-auto">
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
              <button onClick={() => {localStorage.clear();window.location.pathname('/')}} className="tw-btn tw-btn-ghost mx-auto mt-auto mb-4">
                <img src="Dashboard/logout.svg" alt="Logout" />
              </button>
            </nav>
          </div>
          <div className="col-7"></div>
          <div className="col-4"></div>
        </div>
      </section>
    </>
  );
};

export default App;
