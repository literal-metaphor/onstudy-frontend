import { useEffect, useState } from "react";

const UserProfile = () => {
  const routes = ['info', 'classrooms', 'assignments'];
  const [page, setPage] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const route = params.get('userroute');
    if (route && routes.includes(route)) {
      setPage(route);
    } else {
      setPage('info');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row">
      <div className="tw-drawer lg:tw-drawer-open">
        <input id="profile-sidebar" type="checkbox" className="tw-drawer-toggle" />
        <div className="tw-drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          {page === 'info' && (
          <div className="row">
            <div className="col-12 p-5 tw-h-screen">
              <div className="d-flex align-items-center">
                  <img src="http://placehold.co/100x100" className="rounded-circle me-4" alt="user profile" />
                  <div className="d-flex flex-column align-items-start">
                      <h1 className="fs-4 fw-semibold">Regina</h1>
                      <div className="d-flex mt-2">
                          <img src="Userprofile/sekolah.svg" className="tw-h-[24px] me-2" alt="sekolah icon" />
                          <p className="fs-6 fw-semibold pt-1">Sekolah</p>
                      </div>
                  </div>
              </div>
              <br className="my-4" /><br className="my-4" />
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <h1 className="fw-semibold fs-3">E-Mail</h1>
                    <p className="mt-4">opeopoe@emaol.com</p>
                  </div>
                  <div className="col-6">
                    <h1 className="fw-semibold fs-3">E-Mail</h1>
                    <p className="mt-4">opeopoe@emaol.com</p>
                  </div>
                </div>
                <br className="my-4" /><br className="my-4" />
                <div className="row">
                  <div className="col-6">
                    <h1 className="fw-semibold fs-3">E-Mail</h1>
                    <p className="mt-4">opeopoe@emaol.com</p>
                  </div>
                  <div className="col-6">
                    <h1 className="fw-semibold fs-3">E-Mail</h1>
                    <p className="mt-4">opeopoe@emaol.com</p>
                  </div>
                </div>
              </div>
              <br className="my-4" /><br className="my-4" />
              <button className="ms-2 btn btn-success py-2 px-4" onClick={() => {localStorage.clear();location.reload();}}>
                Logout
              </button>
            </div>
          </div>
          )}
        </div>
        <div className="tw-drawer-side overflow-hidden tw-border-r-2">
          <label
            htmlFor="profile-sidebar"
            aria-label="close sidebar"
            className="tw-drawer-overlay"
          ></label>
          <div className="tw-menu flex-column px-5 tw-h-[100vh]">
            {/* Sidebar content here */}
            <div className="d-flex flex-column justify-content-center align-items-center">
              <br className="my-4"/>
              <h1 className="fs-1 fw-bold">Profil <br/> Pengguna</h1>
            </div>
            <br className="my-4"/><br className="my-4"/>
            <div className="fw-bold roboto fs-6 d-flex flex-column align-items-start">
            <a onClick={() => window.location.search = '?route=userprofile&userroute=info'} className="tw-btn tw-btn-ghost my-2 w-100 tw-justify-start">
                <img
                  src="Userprofile/akun.svg"
                  className="tw-h-[36px] tw-w-[36px] me-2"
                  alt="akun"
                />
                Informasi Pengguna
              </a>
              <a onClick={() => window.location.search = '?route=userprofile&userroute=classrooms'} className="tw-btn tw-btn-ghost my-2 w-100 tw-justify-start">
                <img
                  src="Userprofile/kelas.svg"
                  className="tw-h-[36px] tw-w-[36px] me-2"
                  alt="kelas"
                />
                Kelas
              </a>
              <a onClick={() => window.location.search = '?route=userprofile&userroute=assignments'} className="tw-btn tw-btn-ghost my-2 w-100 tw-justify-start">
                <img
                  src="Userprofile/tugas.svg"
                  className="tw-h-[36px] tw-w-[36px] me-2"
                  alt="tugas"
                />
                Tugas
              </a>
              <button onClick={() => window.location.search = '?route=dashboard'} className="w-100 my-4 btn btn-success py-2 px-4">Back to dashboard</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
