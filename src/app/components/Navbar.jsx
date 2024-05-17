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
          <div className="tw-drawer-side">
            <label htmlFor="sidebar" aria-label="close sidebar" className="tw-drawer-overlay"></label> 
            <ul className="tw-menu tw-p-4 tw-text-base-content position-fixed tw-h-screen tw-start-0 tw-top-0">
              {/* Sidebar content here */}
              <li className="my-4">
                <a className="tw-btn tw-btn-ghost" href="">
                  <img src="Logo.png" width="48px" height="48px" alt="logo" />
                </a>
              </li>
              <li className="mt-auto mb-4">
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
              <li className="mt-auto" onClick={
                () => {
                  localStorage.clear();
                  location.reload();
                }
              }>
                <a className="tw-btn tw-btn-ghost mt-auto mb-5" href="#">
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