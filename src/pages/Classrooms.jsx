/* eslint-disable react/prop-types */
function Classroom({ id, name, teacher, subject}) {
  const colors = {
    'Sains': "#DCF3ED",
    'Matematika': "#F3E4DF",
    'Bahasa': "#FDEECA",
    'Informatika': "#DBDFF4",
    'Sosial': "#FDE9E0",
    "Seni": "#F8C8E5",
  };
  return (
    <>
      <div className="col p-3">
        <div style={{ backgroundColor: colors[subject]||"#DCF3ED" }} className="d-flex justify-content-between align-items-center tw-rounded-md p-4 h-100">
          <div className="d-flex justify-content-between flex-column h-100">
            <div>
              <h1 className="tw-text-xl tw-font-semibold">{name}</h1>
              <h6 className="tw-text-sm tw-opacity-50 tw-font-normal">{teacher}</h6>
            </div>
            <button className="tw-btn px-3 py-2 tw-text-sm tw-text-normal tw-text-primary tw-border-primary tw-border-opacity-25 border-2 tw-rounded-md d-flex justify-content-center align-items-center tw-bg-transparent hover:tw-bg-primary hover:tw-text-white hover:tw-opacity-75 tw-transition tw-duration-300">Lihat Kelas</button>
          </div>
          <img src={`${subject}.svg`} alt={subject} className="tw-w-max tw-h-max" />
        </div>
      </div>
    </>
  )
}

export default function Classrooms({ cacheData, updateCacheData }) {
  return (
    <>
      <div className="container p-4">
        <div className="row">
          {/* Classrooms list */}
          <div className="col-8 tw-border-r tw-border-grey">
            {/* Filter */}
            <div className="d-flex align-items-center tw-btn tw-w-fit">
              <span className="tw-text-3xl tw-font-semibold me-3">Semua Kelas</span>
              <img src="ArrowDown.svg" alt="Arrow Down" className="tw-w-[16px] tw-h-[16px]" />
            </div>

            {/* Classrooms */}
            <div className="row row-cols-2">
              <Classroom id="1" name="Kelas 1" teacher="Dadhang S.Pd" subject="Sains" />
              <Classroom id="1" name="Kelas 1" teacher="Dadhang S.Pd" subject="Matematika" />
              <Classroom id="1" name="Kelas 1" teacher="Dadhang S.Pd" subject="Bahasa" />
              <Classroom id="1" name="Kelas 1" teacher="Dadhang S.Pd" subject="Informatika" />
              <Classroom id="1" name="Kelas 1" teacher="Dadhang S.Pd" subject="Sosial" />
              <Classroom id="1" name="Kelas 1" teacher="Dadhang S.Pd" subject="Seni" />
            </div>
          </div>

          {/* Create new classroom */}
          <div className="col-4 ps-4 pt-3">
            <h1 className="tw-font-semibold tw-text-2xl">Buat Kelas Baru</h1>
            <form>
              <label className="tw-form-control tw-w-full">
                <div className="tw-label">
                  <span className="tw-label-text">Nama kelas</span>
                </div>
                <input name="name" required type="text" placeholder="Nama kelas" className="tw-input tw-input-bordered tw-w-full" />
              </label>
              <label className="tw-form-control tw-w-full">
                <div className="tw-label">
                  <span className="tw-label-text">Mata Pelajaran</span>
                </div>
                <select name="subject" className="tw-select tw-select-bordered">
                  <option value="Sains" selected>Sains</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Bahasa">Bahasa</option>
                  <option value="Informatika">Informatika</option>
                  <option value="Sosial">Sosial</option>
                  <option value="Seni">Seni</option>
                </select>
              </label>

              <br />

              <div className="d-flex align-items-center gap-2">
                <button type="submit" className="tw-flex-1 py-3 tw-bg-primary tw-rounded-md tw-text-white hover:tw-opacity-75">Buat</button>
                <button type="reset" className="tw-flex-1 py-3 border-1 tw-border-grey tw-rounded-md tw-text-black hover:tw-bg-grey">Reset</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}