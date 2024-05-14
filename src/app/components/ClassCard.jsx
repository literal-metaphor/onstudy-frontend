const ClassCard = () => {
  return (
    <div className="tw-card tw-card-side col-lg-5 col-11 m-2 tw-bg-[#DCF3ED] text-primary-content">
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
  )
}

export default ClassCard