/* eslint-disable react/prop-types */
function Notification({ text }) {
  return (
    <>
      <div onClick={() => alert("Fitur masih dalam konstruksi")} className="d-flex align-items-center p-4 my-3 tw-bg-white tw-rounded-lg border-1 tw-border-grey tw-transition tw-duration-300 hover:tw-scale-95 hover:tw-cursor-pointer">
        <img src="TaskCard.svg" alt="Task" className="tw-w-[48px] tw-h-[48px] me-3" />
        <span>{text}</span>
      </div>
    </>
  )
}

function Stats({ text, num, img, color = 'black' }) {
  return (
    <>
      <div className={`p-3 mb-3  tw-bg-white tw-rounded-lg border-1 tw-border-grey w-100` } style={{ color }}>
        <div className="d-flex align-items-center">
          <img src={img} alt={text} className="tw-w-[1.25rem] tw-h-[1.25rem] me-3" />
          <span className="tw-font-semibold tw-text-1xl">{text}</span>
        </div>
        <div className="tw-mt-3"></div>
        <span className= {`tw-font-semibold tw-mt-3 tw-text-2xl tw-text-${color}`}>{num}</span>
      </div>
    </>
  )
}

export default function Dashboard({ cacheData, updateCacheData }) {
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
              <span onClick={() => {sessionStorage.setItem("page", "assignments")}} className="tw-text-blue">Lihat semua →</span>
            </div>
            {cacheData.classroomsData.map((classroom) => {
              const { teacher } = classroom;
              const assignments = classroom.assignments.map((assignment) => {
                return <Notification key={assignment.id} text={`${teacher.name} mengunggah tugas baru: ${assignment.title}`} />
              });
              return assignments;
            })}
            <span className="tw-text-black tw-opacity-50">Tidak ada tugas baru</span>
          </main>

          {/* Empty gap */}
          <div className="col-2"></div>

          {/* Aside content: Stats */}
          <aside className="col-3">
            <Stats text="Total Tugas" num="0" img="Total.svg" />
            <Stats text="Terselesaikan" num="0" img="Completed.svg" />
            <Stats text="Terlambat" num="0" img="Late.svg" />
            <Stats text="Rata-rata nilai" num="100%" img="A.svg" />
          </aside>
        </div>
      </div>
    </>
  )
}