/* eslint-disable react/prop-types */
import { cacheData } from "../utils/Cache";

function Notification() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center p-4 my-3 tw-bg-white tw-rounded-lg border-1 tw-border-grey">
        <img src="TaskCard.svg" alt="Task" className="tw-w-[48px] tw-h-[48px] me-3" />
        <span>Dadhang S.Pd mengunggah tugas baru: Alat & Bahan yang diperlu...</span>
      </div>
    </>
  )
}

function Stats({ text, num, img, color = 'black' }) {
  return (
    <>
      <div className={`p-4 my-3 tw-bg-white tw-rounded-lg border-1 tw-border-grey`} style={{ color }}>
        <div className="d-flex align-items-center">
          <img src={img} alt={text} className="tw-w-[32px] tw-h-[32px] me-3" />
          <span className="tw-font-semibold tw-text-2xl">{text}</span>
        </div>
        <br />
        <span className={`tw-font-semibold tw-text-4xl tw-text-${color}`}>{num}</span>
      </div>
    </>
  )
}

export default function Dashboard() {
  return (
    <>
      <div className="container p-4">
        <div className="row">
          {/* Main content: Greetings and quick notifications */}
          <main className="col-7">
            {/* Greetings */}
            <h1 className="tw-text-3xl tw-font-bold mb-3">👋 Hai, <span className="tw-text-secondary">{cacheData.userData.name}!</span></h1>
            <p className="tw-text-sm tw-opacity-50">Apa yang ingin kamu kerjakan hari ini?</p>

            <br />

            {/* Assignment notifications */}
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="tw-font-semibold tw-text-2xl">📚 Tugas</h2>
              <span className="tw-text-blue">Lihat semua →</span>
            </div>
            <Notification/>
            <Notification/>
            <Notification/>
          </main>

          {/* Empty gap */}
          <div className="col-1"></div>

          {/* Aside content: Stats */}
          <aside className="col-4">
            <Stats text="Total Tugas" num="5" img="Total.svg" />
            <Stats text="Terselesaikan" num="5" img="Completed.svg" />
            <Stats text="Terlambat" num="5" img="Late.svg" />
            <Stats text="Rata-rata nilai" num="5%" img="C.svg" color="secondary" />
          </aside>
        </div>
      </div>
    </>
  )
}