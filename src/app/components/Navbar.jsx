// eslint-disable-next-line react/prop-types
const Navbar = ({ children }) => {
    return (
      <>
        <div className="tw-drawer lg:tw-drawer-open">
          <input id="sidebar" type="checkbox" className="tw-drawer-toggle" />
          <div className="tw-drawer-content flex flex-col container-fluid">
            {/* Page content here */}
            {children}
          </div>
          <div className="tw-drawer-side overflow-hidden">
            <label htmlFor="sidebar" aria-label="close sidebar" className="tw-drawer-overlay"></label>
            <ul className="tw-menu tw-bg-[#FCFBF9] tw-text-base-content tw-my-auto flex-nowrap tw-start-0 tw-top-0 tw-h-screen">
              {/* Sidebar content here */}
              <li className="my-4">
                <a className="tw-btn tw-btn-ghost tw-rounded-none" href="">
                  <img src="Logo.png" width="48px" height="56px" alt="logo" />
                </a>
              </li>
              <div className="mt-auto">
                <li className="mt-auto mb-4">
                  <button className="tw-btn tw-btn-ghost tw-rounded-none" onClick={() => window.location.search = '?route=dashboard'}>
                    <img
                      src="Dashboard/house.svg"
                      alt="Home"
                      height="24px"
                      width="24px"
                    />
                  </button>
                </li>
                <li className="my-4">
                  <a className="tw-btn tw-btn-ghost tw-rounded-none" onClick={() => window.location.search = '?route=userprofile&userroute=assignments'}>
                    <img
                      src="Dashboard/tugas.svg"
                      alt="Assignments"
                      height="24px"
                      width="24px"
                    />
                  </a>
                </li>
                <li className="my-4">
                  <a className="tw-btn tw-btn-ghost tw-rounded-none" onClick={() => window.location.search = '?route=userprofile&userroute=classrooms'}>
                    <img
                      src="Dashboard/kelas.svg"
                      alt="Classes"
                      height="24px"
                      width="24px"
                    />
                  </a>
                </li>
                <li className="my-4">
                  <a className="tw-btn tw-btn-ghost tw-rounded-none" onClick={() => window.location.search = '?route=userprofile&userroute=dashboard'}>
                    <img
                      src="Dashboard/person.svg"
                      alt="Profile"
                      height="24px"
                      width="24px"
                    />
                  </a>
                </li>
              </div>
              <li className="mt-lg-auto mt-5 mb-3" onClick={() => {localStorage.clear();location.reload();}
              }>
                <a className="tw-btn tw-btn-ghost tw-rounded-none mt-auto mb-5" href="#">
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
    )
}

// Navbar.propTypes = {
//   children: PropTypes.node.isRequired
// };

export default Navbar;