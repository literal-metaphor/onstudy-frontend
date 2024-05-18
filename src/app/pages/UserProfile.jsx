import {useEffect, useState} from "react";

const UserProfile = () => {
  const routes = ["info", "classrooms", "assignments"];
  const [page, setPage] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const route = params.get("userroute");
    if (route && routes.includes(route)) {
      setPage(route);
    } else {
      setPage("info");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // COMPONENTS
  const ProfileClassCard = () => {
    return (
      <>
        <div className="tw-card rounded rounded-5 tw-w-96 tw-h-[42%] g-5 mx-3 p-0 tw-card-side col-lg-6 col-12 tw-bg-[#DCF3ED] text-primary-content">
          <div className="tw-card-body roboto d-flex flex-column justify-content-between">
            <div>
              <div className="tw-text-sm tw-text-regular poppins tw-card-title fs-1">
                IPA
              </div>
              <div className="tw-text-sm tw-text-regular roboto mt-3">
                32 Murid
              </div>
              <p className="tw-mt-[3rem]">Jumlah Murid : 23</p>
              <p>Jumlah Tugas : 23</p>
            </div>
          </div>
        </div>
      </>
    );
  };
  const ProfileAssignmentList = () => {
    return (
      <>
        <div className="col-12 my-2 p-3 tw-rounded-lg d-flex justify-content-between align-items-center tw-bg-[#EEEEEE]">
          <p className="fs-4 fw-semibold">Nama Tugas</p>
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center mx-3">
              <img
                src="Userprofile/akun.svg"
                alt="completees"
                className="me-2 tw-w-[24px] tw-h-[24px]"
              />
              <p className="fs-5 fw-medium">23/32</p>
            </div>
            <div className="d-flex align-items-center mx-3">
              <img
                src="Userprofile/kelas.svg"
                alt="classroom"
                className="me-2 tw-w-[24px] tw-h-[24px]"
              />
              <p className="fs-5 fw-medium">Kelas</p>
            </div>
            <div className="d-flex align-items-center mx-3">
              <img
                src="Userprofile/clock.svg"
                alt="turning date"
                className="me-2 tw-w-[24px] tw-h-[24px]"
              />
              <p className="fs-5 fw-medium">DD/MM/YY</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="row">
      <div className="tw-drawer lg:tw-drawer-open">
        <input
          id="profile-sidebar"
          type="checkbox"
          className="tw-drawer-toggle"
        />
        <div className="tw-drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          {page === "info" && (
            <div className="row">
              <div className="col-12 p-5 tw-h-screen">
                <div className="d-flex align-items-center">
                  <img
                    src="http://placehold.co/100x100"
                    className="rounded-circle me-4"
                    alt="user profile"
                  />
                  <div className="d-flex flex-column align-items-start">
                    <h1 className="fs-4 fw-semibold">Regina</h1>
                    <div className="d-flex mt-2">
                      <img
                        src="Userprofile/sekolah.svg"
                        className="tw-h-[24px] me-2"
                        alt="sekolah icon"
                      />
                      <p className="fs-6 fw-semibold pt-1">Sekolah</p>
                    </div>
                  </div>
                </div>
                <br className="my-4" />
                <br className="my-4" />
                <div className="container">
                  <div className="row">
                    <div className="col-6">
                      <h1 className="fw-semibold fs-3">E-Mail</h1>
                      <p className="mt-4">opeopoe@emaol.com</p>
                    </div>
                    <div className="col-6">
                      <h1 className="fw-semibold fs-3">Jumlah Kelas</h1>
                      <p className="mt-4">17</p>
                    </div>
                  </div>
                  <br className="my-4" />
                  <br className="my-4" />
                  <div className="row">
                    <div className="col-6">
                      <h1 className="fw-semibold fs-3">Jumlah Tugas</h1>
                      <p className="mt-4">17</p>
                    </div>
                    <div className="col-6">
                      <h1 className="fw-semibold fs-3">Tugas Tuntas</h1>
                      <p className="mt-4">17</p>
                    </div>
                  </div>
                </div>
                <br className="my" />
                <button
                  className="ms-2  btn btn-success py-2 px-4"
                  onClick={() => {
                    localStorage.clear();
                    location.reload();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          {page === "classrooms" && (
            <div className="ms-4 mt-5 row">
              <h1 className="fw-bold poppins fs-3">Kelas</h1>
              <div className="w-100 container-fluid d-flex flex-column align-items-center justify-content-center tw-overflow-y-scroll pb-5">
                <div className="row">
                  <ProfileClassCard />
                  <ProfileClassCard />
                  <ProfileClassCard />
                  <ProfileClassCard />
                </div>
              </div>
            </div>
          )}
          {page === "assignments" && (
            <div className="row">
              <div className="col-12 p-5 tw-h-screen">
                <h1 className="fw-bold fs-3">Tugas</h1>
                <br className="my-4" />
                <div className="w-100 container d-flex flex-column align-items-center tw-overflow-y-scroll pb-5">
                  <div className="row">
                    <ProfileAssignmentList />
                    <ProfileAssignmentList />
                    <ProfileAssignmentList />
                    <ProfileAssignmentList />
                  </div>
                </div>
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
              <br className="my-4" />
              <h1 className="fs-1 poppins fw-bold">
                Profil <br /> Pengguna
              </h1>
            </div>
            <br className="my-4" />
            <br className="my-4" />
            <div className="fw-bold roboto fs-6 d-flex flex-column align-items-start">
              <a
                onClick={() =>
                  (window.location.search = "?route=userprofile&userroute=info")
                }
                className={`tw-btn tw-btn-ghost my-2 w-100 tw-justify-start ${
                  page === "info" &&
                  "tw-rounded-r-none hover:tw-rounded-r-md tw-border-r-2 tw-border-r-black"
                }`}
              >
                <img
                  src="Userprofile/akun.svg"
                  className="tw-h-[36px] tw-w-[36px] me-2"
                  alt="akun"
                />
                Informasi Pengguna
              </a>
              <a
                onClick={() =>
                  (window.location.search =
                    "?route=userprofile&userroute=classrooms")
                }
                className={`tw-btn tw-btn-ghost my-2 w-100 tw-justify-start ${
                  page === "classrooms" &&
                  "tw-rounded-r-none hover:tw-rounded-r-md tw-border-r-2 tw-border-r-black"
                }`}
              >
                <img
                  src="Userprofile/kelas.svg"
                  className="tw-h-[36px] tw-w-[36px] me-2"
                  alt="kelas"
                />
                Kelas
              </a>
              <a
                onClick={() =>
                  (window.location.search =
                    "?route=userprofile&userroute=assignments")
                }
                className={`tw-btn tw-btn-ghost my-2 w-100 tw-justify-start ${
                  page === "assignments" &&
                  "tw-rounded-r-none hover:tw-rounded-r-md tw-border-r-2 tw-border-r-black"
                }`}
              >
                <img
                  src="Userprofile/tugas.svg"
                  className="tw-h-[36px] tw-w-[36px] me-2"
                  alt="tugas"
                />
                Tugas
              </a>
              <br className="tw-my-[5rem]" />
              <br className="my-4" />
              <button
                onClick={() => (window.location.search = "?route=dashboard")}
                className="w-100 mt-auto my-4 btn btn-success py-2 px-4 d-flex align-items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="me-2 bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                  />
                </svg>
                Back to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
