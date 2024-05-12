const App = () => {
  return (
    <>
      <section className="container-fluid">
        <div className="sidebar d-flex">
          <nav className="vh-100 flex-column navbar">
            <div className="d-flex flex-column">
              <a href="#" className="navbar-brand mx-auto">
                <img src="Logo.png" width="48px" className="mx-auto" alt="logo" />
              </a>
              <ul className="navbar-nav align-items-center mx-auto my-auto">
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
                      alt=""
                      width="30px"
                      height="24px"
                    />
                  </a>
                </li>
                <li className="nav-item my-4">
                  <a className="nav-link">
                    <img
                      src="Dashboard/kelas.svg"
                      height="25px"
                      width="30px"
                      alt=""
                    />
                  </a>
                </li>
                <li className="nav-item my-4">
                  <a className="nav-link">
                    <img
                      src="Dashboard/person.svg"
                      height="25px"
                      width="30px"
                      alt=""
                    />
                  </a>
                </li>
              </ul>
              <a href="" className="mx-auto my-4">
                <img src="Dashboard/logout.svg" alt="" />
              </a>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
};

export default App;
