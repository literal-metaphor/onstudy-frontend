// eslint-disable-next-line no-unused-vars
function Assignment({ id, title, description, classroom, teacher, deadline, counts }) {
  return (
    <>test</>
  )
}

export default function Assignments({ cacheData, updateCacheData }) {
  return (
    <>
      <div className="container p-4">
        <div className="row">
          {/* Assignments list */}
          <div className="col-8 tw-border-r tw-border-grey">
            {/* Filter */}
            <div className="d-flex align-items-center tw-btn tw-w-fit">
              <span className="tw-text-3xl tw-font-semibold me-3">Semua Tugas</span>
              <img src="ArrowDown.svg" alt="Arrow Down" className="tw-w-[16px] tw-h-[16px]" />
            </div>

            {/* Assignment Card */}
            {/* !This is literally a war crime, fix this later */}
            <div className="row ms-2 mt-5">
              <h2 className="tw-h2">Alat & Bahan yang diperlukan untuk membuat C4 </h2>
              <div className="my-3 d-flex flex-row">
                <img src="https://placehold.co/24x24" alt="Profile Guru" className='tw-rounded-full tw-h-[32px]'/>
                <p className="tw-text-gray ms-3 pt-1 text-secondary">Seni - Dhadang S.pd</p>
              </div>
              <p className="tw-text-base my-3">Kebutuhan akan senjata C4 terus bertambah seiring berjalannya waktu karena kebutuhan di pasar gelap. Oleh karena itu, pada tugas kali ini, kita akan membahas cara membuat C4 yang baik dan benar.</p>
              <p className="tw-text-base my-3 text-secondary">40 Soal - Deadline 24 Mei 2024 (2 hari dari sekarang)</p>
              <button className="tw-text-white mt-3 ms-2 tw-text-base btn btn-success col-2">Lihat Tugas</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}