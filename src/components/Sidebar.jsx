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
        <ul className="tw-menu tw-w-full">
          <li onClick={function(){sessionStorage.setItem("page", "dashboard"); location.reload();}} className="my-1"><a><img src="Beranda.svg" alt="Beranda" className="tw-w-[24px] tw-h-[24px] me-1" /><div className="tw-font-semibold tw-text-sm">Beranda</div></a></li>
          <li onClick={function(){sessionStorage.setItem("page", "assignments"); location.reload();}} className="my-1"><a><img src="Tugas.svg" alt="Tugas" className="tw-w-[24px] tw-h-[24px] me-1" /><div className="tw-font-semibold tw-text-sm">Tugas</div></a></li>
          <li onClick={function(){sessionStorage.setItem("page", "classrooms"); location.reload();}} className="my-1"><a><img src="Kelas.svg" alt="Kelas" className="tw-w-[24px] tw-h-[24px] me-1" /><div className="tw-font-semibold tw-text-sm">Kelas</div></a></li>
        </ul>

        {/* Settings and logout */}
        <ul className="tw-menu tw-w-full">
          <li className="my-1"><a><img src="Pengaturan.svg" alt="Pengaturan" className="tw-w-[24px] tw-h-[24px] me-1" /><div className="tw-font-semibold tw-text-sm">Pengaturan</div></a></li>
          <li onClick={function(){localStorage.clear(); location.reload();}} className="my-1"><a><img src="Logout.svg" alt="Logout" className="tw-w-[24px] tw-h-[24px] me-1" /><div className="tw-font-semibold tw-text-sm">Logout</div></a></li>
        </ul>
      </div>
    </>
  )
}