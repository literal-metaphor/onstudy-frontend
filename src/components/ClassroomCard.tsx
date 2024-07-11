export default function ClassroomCard({ id, name, teacher, subject}: { id: string, name: string, teacher: string, subject: string }) {
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
          <div style={{ backgroundColor: colors[subject as keyof typeof colors]||"#DCF3ED" }} className="flex justify-between items-center rounded-md p-4 h-full">
            <div className="flex justify-between flex-col h-full">
              <div>
                <h1 className="text-xl font-semibold mb-1">{name}</h1>
                <h6 className="text-sm opacity-50 font-normal">{teacher}</h6>
              </div>
              <button onClick={function(){ sessionStorage.setItem("page", "classroom"); sessionStorage.setItem("classroom_id", id); location.reload(); }} className="w-fit btn px-4 py-2 text-sm text-normal text-primary border-primary border-opacity-25 border-2 rounded-md flex justify-center items-center bg-transparent hover:bg-primary hover:text-white hover:opacity-75 transition duration-300">Lihat Kelas</button>
            </div>
            <img src={`${subject}.svg`} alt={subject} className="w-max h-max" />
          </div>
        </div>
      </>
    )
  }