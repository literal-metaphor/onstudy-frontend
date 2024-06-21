/* eslint-disable react/prop-types */
import { useState } from "react";
import { api } from "../utils/API";
import { store } from "../utils/Store";

export default function Navbar({ cacheData, updateCacheData, syncWithServer }) {
  const [loadingSync, setLoadingSync] = useState(false);

  async function uploadPhoto(e) {
    e.preventDefault();
    try {
      // Format file into an API-readable form data
      const formData = new FormData();
      const selectedFile = e.target.files && e.target.files[0];
      if (formData && selectedFile) {
        formData.append("photo", selectedFile);
        formData.append("id", cacheData.userData.id);
        formData.append("name", cacheData.userData.name);

        const res = await api.post("/users/profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        localStorage.setItem("user", JSON.stringify(res.data));
        updateCacheData();
      }
    } catch (err) {
      alert("Kesalahan saat upload foto");
    }
  }

  async function updateName(e) {
    e.preventDefault();
    if (e.target.value) {
      try {
        // Format input into an API-readable form data
        const formData = new FormData();
        formData.append("id", cacheData.userData.id);
        formData.append("name", e.target.value);
  
        const res = await api.post("/users/profile", formData)
  
        localStorage.setItem("user", JSON.stringify(res.data));
        updateCacheData();
      } catch(err) {
        alert("Kesalahan saat update nama");
      }
    }
  }

  return (
    <>
      {/* Profile (hidden) modal */}
      <dialog id="profile_modal" className="tw-modal">
        <div className="tw-modal-box tw-w-fit">
          <form method="dialog">
            <button className="tw-btn tw-btn-sm tw-btn-circle tw-btn-ghost tw-absolute tw-right-2 tw-top-2">✕</button>
          </form>

          {/* Profile content */}
          <div className="container tw-w-fit p-2 d-flex flex-column justify-content-center align-items-center">
            <form encType="multipart/form-data">
              <label className="tw-w-[48px] tw-h-[48px] tw-rounded-full mb-3 relative">
                <img src={`${cacheData.userData.photo ? store + cacheData.userData.photo : "UserPlaceholder.svg" || "UserPlaceholder.svg"}`} alt="User Profile" className="tw-w-[48px] tw-h-[48px] tw-object-cover hover:tw-opacity-75 hover:tw-cursor-pointer tw-rounded-full" />
                <input onChange={uploadPhoto} type="file" accept="image/*" className="tw-hidden tw-opacity-0 absolute top-0" />
              </label>
            </form>
            <div className="tw-relative mb-2">
              <input
                type="text"
                className="tw-input tw-input-bordered tw-w-full tw-py-2"
                defaultValue={cacheData.userData.name}
                onBlur={function(e){if(!e.target.value)e.target.value=cacheData.userData.name;updateName(e)}}
              />
              <img src="Edit.svg" alt="Edit name" className="tw-w-[12px] tw-h-[12px] tw-absolute tw-top-2 tw-right-2" />
            </div>
            <span className="tw-text-sm tw-opacity-50">{cacheData.userData.email}</span>
          </div>
        </div>
      </dialog>

      <div className="w-100 tw-h-min p-4 tw-bg-white position-sticky top-0 border-1 tw-border-grey d-flex align-items-center justify-content-between">
        {/* Search bar */}
        <label className="tw-input tw-input-bordered tw-flex tw-items-center tw-gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="tw-w-4 tw-h-4 tw-opacity-50"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          <input type="text" className="tw-grow" placeholder="Cari" />
        </label>

        {/* User profile */}
        <div className="d-flex align-items-center">
          <div onClick={function(){document.getElementById('profile_modal').showModal();}} className="d-flex align-items-center hover:tw-cursor-pointer hover:tw-bg-grey tw-transition tw-duration-300 active:tw-scale-95 p-2 tw-rounded-lg me-3">
            <img src={`${cacheData.userData.photo ? store + cacheData.userData.photo : "UserPlaceholder.svg" || "UserPlaceholder.svg"}`} alt="Profile" className="tw-w-[48px] tw-h-[48px] me-3 tw-rounded-full" />
            <div className="d-flex flex-column">
              <span className="d-flex align-items-center tw-text-lg">{cacheData.userData.name} <img src="Edit.svg" alt="Edit profile" className="tw-w-[12px] tw-h-[12px] ms-1" /></span>
              <span className="tw-text-sm">{cacheData.userData.email}</span>
            </div>
          </div>
          <img onClick={() => {
            setLoadingSync(true);
            setTimeout(()=>setLoadingSync(false),10000);
            syncWithServer();
          }} src="Sync.svg" alt="Sync cache" className={`tw-w-[32px] tw-h-[32px] hover:tw-opacity-75 hover:tw-cursor-pointer tw-transition tw-duration-300 active:tw-scale-90 ${loadingSync === true && "tw-animate-spin tw-pointer-events-none"}`} />
        </div>
      </div>
    </>
  )
}