import { Tilt } from 'react-tilt'

const ClassCard = () => {
  return (
    <Tilt className="hover:tw-cursor-pointer tw-w-[42%]">
      <div onClick={() => window.location.search = '?route=class'} className="tw-card w-100 tw-card-side col-lg-6 col-12 tw-bg-[#DCF3ED] text-primary-content">
        <div className="tw-card-body d-flex flex-column justify-content-between">
          <div>
            <div className="tw-text-sm tw-text-regular tw-card-title fs-1">IPA</div>
            <div className="tw-text-sm tw-text-regular mt-3">Guru Gembul</div>
          </div>
          <div className="tw-card-actions justify-start">
            <button className="tw-btn tw-btn-ghost tw-border-[#89D2BF] tw-min-h-[2rem] tw-h-[2rem]">
              Lihat Kelas
            </button>
          </div>
        </div>
        <img
          src="Dashboard/ipa.svg"
          className="tw-w-[192px] tw-h-[192px] p-4"
          alt="sains"
        />
      </div>
    </Tilt>
  )
}

export default ClassCard