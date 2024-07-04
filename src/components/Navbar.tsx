import { useState } from "react";
import { api, store } from "../utils/API";
import { UserData } from "../utils/types/UserData";

export default function Navbar() {
  const [userData, setUserData] = useState<UserData>(() => {
    const userDataString = localStorage.getItem("userData");
    return JSON.parse(userDataString!);
  });

  async function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    try {
      // Format file into an API-readable form data
      const formData = new FormData();
      const photo = e.target.files && e.target.files[0];
      if (formData && photo) {
        formData.append("photo", photo);
        formData.append("id", userData.id);
        formData.append("name", userData.name);

        const response = await api.post("/users/update_profile", formData);

        localStorage.setItem("userData", JSON.stringify(response.data));
        setUserData(response.data)
      }
    } catch (err) {
      console.log(err);
      alert("Kesalahan saat upload foto");
    }
  }

  async function updateName(e: React.FocusEvent<HTMLInputElement>) {
    e.preventDefault();
    try {
      // Format input into an API-readable form data
      const formData = new FormData();
      formData.append("id", userData.id);
      formData.append("name", e.target.value);

      const response = await api.post("/users/update_profile", formData)

      console.log(response);

      localStorage.setItem("userData", JSON.stringify(response.data));
      setUserData(response.data)
    } catch(err) {
      alert("Kesalahan saat update nama");
    }
  }

  return (
    <>
      {/* Profile (hidden) modal */}
      <dialog id="profile_modal" className="modal">
        <div className="modal-box w-fit">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          {/* Profile content */}
          <div className="container w-fit p-2 flex flex-col justify-center items-center">
            <form encType="multipart/form-data">
              <label className="w-[48px] h-[48px] rounded-full mb-3 relative">
                <img src={`${userData.photo ? store+userData.photo : "UserPlaceholder.svg"}`} alt="User Profile" className="w-[48px] h-[48px] object-cover hover:opacity-75 hover:cursor-pointer rounded-full" />
                <br />
                <input onChange={uploadPhoto} type="file" accept="image/*" className="hidden opacity-0 absolute top-0" />
              </label>
            </form>
            <div className="relative mb-2">
              <input
                type="text"
                className="input input-bordered w-full py-2"
                defaultValue={userData.name}
                onBlur={function(e){if(!e.target.value)e.target.value=userData.name;updateName(e)}}
              />
              <img src="Edit.svg" alt="Edit name" className="w-[12px] h-[12px] absolute top-2 right-2" />
            </div>
            <span className="text-sm opacity-50">{userData.email}</span>
          </div>
        </div>
      </dialog>

      <div className="w-full h-min py-4 px-8 bg-white position-sticky top-0 border-b border-grey flex items-center justify-between">
        {/* Search bar */}
        <label className="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-50"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          <input type="text" className="grow" placeholder="Cari" />
        </label>

        {/* User profile */}
        <div className="flex items-center">
          <div onClick={function(){(document.getElementById('profile_modal') as HTMLDialogElement)?.showModal();}} className="flex items-center hover:cursor-pointer hover:bg-grey transition duration-300 active:scale-95 p-2 rounded-lg me-3">
            <img src={`${userData.photo ? store+userData.photo : "UserPlaceholder.svg"}`} alt="Profile" className="w-[48px] h-[48px] me-3 rounded-full" />
            <div className="flex flex-col">
              <span className="flex items-center text-lg">{userData.name} <img src="Edit.svg" alt="Edit profile" className="w-[12px] h-[12px] ms-1" /></span>
              <span className="text-sm">{userData.email}</span>
            </div>
          </div>
          <img src="Sync.svg" alt="Sync cache" className={`w-[32px] h-[32px] hover:opacity-75 hover:cursor-pointer transition duration-300 active:scale-90`} />
        </div>
      </div>
    </>
  )
}