/* eslint-disable react/prop-types */
function MenuItem({ onClick, src, alt, text}) {
  return (
    <li onClick={onClick} className="tw-btn tw-btn-ghost my-1 tw-w-full d-flex justify-content-start tw-transition tw-duration-300 tw-rounded-lg">
      <img src={src} alt={alt} className="tw-w-[24px] tw-h-[24px] me-1" />
      <div className="tw-font-semibold tw-text-sm">{text}</div>
    </li>
  )
}

const menuItems = [
  { page: 'dashboard', src: 'Beranda.svg', alt: 'Beranda', text: 'Beranda' },
  { page: 'assignments', src: 'Tugas.svg', alt: 'Tugas', text: 'Tugas' },
  { page: 'classrooms', src: 'Kelas.svg', alt: 'Kelas', text: 'Kelas' },
];

function handleMenuClick(page) {
  sessionStorage.setItem('page', page);
  location.reload();
}

function handleLogout() {
  localStorage.clear();
  sessionStorage.clear();
  location.reload();
}

export default function Sidebar() {
  return (
    <>
      {/* Placeholder sidebar */}
      <div className="col-2"></div>

      {/* Actual sidebar */}
      <div className="col-2 position-fixed start-0 tw-bg-white tw-min-h-screen p-2 d-flex flex-column justify-content-between align-items-center border-1 tw-border-grey">
        {/* Logo */}
        <div className="d-flex align-items-center mt-4">
          <img src="Logo.svg" alt="Logo" className="tw-w-[32px] tw-h-[32px] me-3" />
          <span className="tw-font-semibold tw-text-xl">on<span className="tw-text-secondary">Study</span></span>
        </div>

        {/* Sidebar menu */}
        <ul className="tw-w-full px-3">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuClick(item.page)}
              src={item.src}
              alt={item.alt}
              text={item.text}
              className=""
            />
          ))}
        </ul>

        {/* Settings and logout */}
        <ul className="tw-w-full px-3">
          <MenuItem
            onClick={null}
            src="Pengaturan.svg"
            alt="Pengaturan"
            text="Pengaturan"
          />
          <MenuItem
            onClick={handleLogout}
            src="Logout.svg"
            alt="Logout"
            text="Logout"
          />
        </ul>
      </div>
    </>
  )
}