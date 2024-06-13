import { cacheData } from "../utils/Cache"

export default function Navbar() {
  return (
    <>
      {/* Actual navbar */}
      <div className="w-100 tw-h-min p-4 tw-bg-white position-sticky top-0 border-1 tw-border-grey d-flex align-items-center justify-content-between">
        {/* Search bar */}
        <label className="tw-input tw-input-bordered tw-flex tw-items-center tw-gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="tw-w-4 tw-h-4 tw-opacity-50"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
          <input type="text" className="tw-grow" placeholder="Cari" />
        </label>

        {/* User profile */}
        <div className="d-flex align-items-center">
          <img src={`${cacheData.userData.photo || "UserPlaceholder.svg"}`} alt="Profile" className="tw-w-[48px] tw-h-[48px] me-3" />
          <div className="d-flex flex-column">
            <span className="d-flex align-items-center tw-text-lg">{cacheData.userData.name} <img src="Edit.svg" alt="Edit profile" className="tw-w-[12px] tw-h-[12px] ms-1" /></span>
            <span className="tw-text-sm">{cacheData.userData.email}</span>
          </div>
        </div>
      </div>
    </>
  )
}