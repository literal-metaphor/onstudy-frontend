/* eslint-disable react/prop-types */
const ClassCard = ({ id, title, teacher, subject }) => {
  function getImagePath(subject) {
    switch (subject) {
      case "Sains":
        return 'ipa';
      case "Matematika":
        return 'math';
      case "Bahasa":
        return 'bahasa';
      case "Teknologi":
        return 'inka';
      case "Sosial":
        return 'ips';
      case "Seni":
        return 'seni';
      default:
        return 'ipa';
    }
  }

  function getSubjectColor(subject) {
    switch (subject) {
      case "Sains":
        return '#DCF3ED';
      case "Matematika":
        return '#F3E4DF';
      case "Bahasa":
        return '#FDEECA';
      case "Teknologi":
        return '#DBDFF4';
      case "Sosial":
        return '#FDE9E0';
      case "Seni":
        return '#F8C8E5';
      default:
        return '#DCF3ED';
    }
  }

  return (
    <div className="hover:tw-scale-[95%] tw-transition tw-duration-300 hover:tw-cursor-pointer tw-w-[45%]">
        <div
          onClick={() => (window.location.search = "?route=class&" + id)}
          className="tw-card w-100 tw-card-side col-lg-6 col-12 text-primary-content"
          style={{ backgroundColor: getSubjectColor(subject) }}
        >
        <div className="tw-card-body d-flex flex-column justify-content-between">
          <div>
            <div className="tw-text-sm tw-text-regular tw-card-title fs-1">
              {title}
            </div>
            <div className="tw-text-sm tw-text-regular mt-3">{teacher}</div>
          </div>
          <div className="tw-card-actions justify-start">
            <button className="tw-btn tw-btn-ghost tw-border-[#89D2BF] tw-min-h-[2rem] tw-h-[2rem]">
              Lihat Kelas
            </button>
          </div>
        </div>
        <img
          src={`Dashboard/${getImagePath(subject)}.svg`}
          className="tw-w-[192px] tw-h-[192px] p-4"
   
          alt={subject}
        />
      </div>
    </div>
  );
};

export default ClassCard;
