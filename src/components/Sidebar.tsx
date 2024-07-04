const menuItems = [
  { page: 'dashboard', src: 'Beranda.svg', text: 'Beranda' },
  { page: 'assignments', src: 'Tugas.svg', text: 'Tugas' },
  { page: 'classrooms', src: 'Kelas.svg', text: 'Kelas' },
];

function MenuItem({ onClick, src, text }: { onClick: () => void, src: string, text: string }) {
  return (
    <li onClick={onClick} className="btn btn-ghost my-1 w-full flex justify-start transition duration-300 rounded-lg">
      <img src={src} alt={text} className="w-[24px] h-[24px] me-1" />
      <div className="font-semibold text-sm">{text}</div>
    </li>
  )
}

export default function Sidebar() {
  function handleMenuClick(page: string) {
    sessionStorage.setItem('page', page);
    location.reload();
  }

  function handleLogout() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }

  return (
    <>
      <div className="fixed start-0 bg-white min-h-screen p-4 flex flex-col justify-between items-center">
        {/* Logo */}
        <div className="flex justify-start items-center mt-4">
          <img src="Logo.svg" alt="Logo" className="w-[32px] h-[32px] me-4" />
          <span className="font-semibold text-xl">on<span className="text-secondary">Study</span></span>
        </div>

        {/* Sidebar menu */}
        <ul className="w-full px-4">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuClick(item.page)}
              src={item.src}
              text={item.text}
            />
          ))}
        </ul>

        {/* Settings and logout */}
        <ul className="w-full px-4">
          <MenuItem
            onClick={() => null}
            src="Pengaturan.svg"
            text="Pengaturan"
          />
          <MenuItem
            onClick={handleLogout}
            src="Logout.svg"
            text="Logout"
          />
        </ul>
      </div>
    </>
  )
}