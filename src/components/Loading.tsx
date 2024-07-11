import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-center text-2xl font-bold">
      <ClipLoader
        color={`#212529`}
        loading={true}
        size={128}
      />
      <br />
      <h1 className="mt-4">Memuat...</h1>
    </div>
  )
}