import { useRef } from "react";
import { api } from "../utils/API";

function Classroom({ id, name, teacher, subject}: { id: string, name: string, teacher: string, subject: string }) {

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

export default function Classrooms() {
  const createClassroomRef = useRef<HTMLButtonElement>(null);
  const joinClassroomRef = useRef<HTMLButtonElement>(null);

  async function createClassroom(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      // Create classroom
      const response = await api.post("/classrooms/create", formData);
      const classroom = response.data;

      // Join classroom as teacher
      await api.post("/user_classrooms/create", { user_id: cacheData.userData.id, classroom_id: response.data.id, role: "Teacher" });

      // Update classroom cache
      if (JSON.parse(localStorage.getItem("classrooms"))) {
        let classrooms = JSON.parse(localStorage.getItem("classrooms"));
        classroom["teacher"] = cacheData.userData;
        localStorage.setItem("classrooms", JSON.stringify([...classrooms, classroom]));
      } else {
        let classrooms = classroom;
        classroom["teacher"] = cacheData.userData;
        localStorage.setItem("classrooms", JSON.stringify([classrooms]));
      }

      updateCacheData();
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  async function handleJoinClassroom(e) {
    e.preventDefault();

    // Render loading on button
    joinClassroomRef.current.innerHTML = '<div class="animate-spin" id="join_classroom_loading">⟳</div>';
    joinClassroomRef.current.disabled = true;
    joinClassroomRef.current.className = "w-full py-3 bg-primary rounded-md text-white opacity-75";

    try {
      // Join classroom as student
      await api.post('/user_classrooms/create', { user_id: cacheData.userData.id, classroom_id: e.target.id.value, role: "Student" });
      const classroom = await api.get('/classrooms/read', { id: e.target.id.value }).then((res) => res.data);

      // Update classroom cache
      if (JSON.parse(localStorage.getItem("classrooms"))) {
        let classrooms = JSON.parse(localStorage.getItem("classrooms"));
        classroom["teacher"] = await api.get('user_classrooms/get_teacher', { id: e.target.id.value, role: "Teacher" }).then((res) => res.data);
        localStorage.setItem("classrooms", JSON.stringify([...classrooms, classroom]));
      } else {
        let classrooms = classroom;
        classroom["teacher"] = await api.get('user_classrooms/get_teacher', { id: e.target.id.value, role: "Teacher" }).then((res) => res.data);
        localStorage.setItem("classrooms", JSON.stringify([classrooms]));
      }
    } catch (err) {
      console.log(err);
      alert("Kode tidak valid");
    } finally {
      // Loading done
      joinClassroomRef.current.innerHTML = 'Masuk';
      joinClassroomRef.current.disabled = false;
      joinClassroomRef.current.className = "w-full py-3 bg-primary rounded-md text-white hover:opacity-75";
    }
  }

  return (
    <>
      {/* Join classroom modal */}
      <dialog id="join_modal" className="modal">
        <div className="modal-box w-fit">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          <div className="container w-fit p-4 flex flex-col justify-center items-center overflow-y-hidden">
            <form onSubmit={handleJoinClassroom} encType="multipart/form-data" className="p-4">
              <input
                type="text"
                name="id"
                className="input input-bordered w-full py-2 mb-4"
                placeholder="Salin kode kelas di sini..."
              />
              <button ref={joinClassroomRef} type="submit" className="w-full py-3 bg-primary rounded-md text-white hover:opacity-75">Masuk</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="container p-8">
        <div className="grid grid-cols-12">
          {/* Classrooms list */}
          <div className="col-span-8 border-r border-grey pe-4">
            {/* Filter */}
            <div className="flex items-center btn w-fit">
              <span className="text-3xl font-semibold me-3">Semua Kelas</span>
              <img src="ArrowDown.svg" alt="Arrow Down" className="w-[16px] h-[16px]" />
            </div>

            {/* Classrooms */}
            <div className="grid grid-cols-2">
              <p className="my-4">Kamu masih belum bergabung dengan kelas apapun.</p>
              {/* <Classroom id="0" name="Belum ada kelas" teacher="Belum ada kelas" subject="Sains" />
              <Classroom id="1" name="Belum ada kelas" teacher="Belum ada kelas" subject="Matematika" />
              <Classroom id="2" name="Belum ada kelas" teacher="Belum ada kelas" subject="Informatika" /> */}
              {/* {Array.isArray(cacheData.classroomsData) ? cacheData.classroomsData.map(function(val, i) {
                return (
                  <Classroom key={i} id={val.id} name={val.name} teacher={val.teacher.name} subject={val.subject} />
                )
              }) : null} */}
            </div>
          </div>

          {/* Create new classroom */}
          <div className="col-span-4 ps-8 pt-3">
            <h1 className="font-semibold text-2xl mb-4">Buat Kelas Baru</h1>
            <form onSubmit={createClassroom}>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Nama kelas</span>
                </div>
                <input name="name" required type="text" placeholder="Nama kelas" className="input input-bordered w-full" />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Mata Pelajaran</span>
                </div>
                <select name="subject" className="select select-bordered">
                  <option value="Sains" selected>Sains</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Bahasa">Bahasa</option>
                  <option value="Informatika">Informatika</option>
                  <option value="Sosial">Sosial</option>
                  <option value="Seni">Seni</option>
                </select>
              </label>

              <br />

              <div className="flex items-center gap-2">
                <button ref={createClassroomRef} type="submit" className="flex-1 py-3 bg-primary rounded-md text-white hover:opacity-75">Buat</button>
                <button type="reset" className="flex-1 py-3 border border-grey rounded-md text-black hover:bg-grey">Reset</button>
              </div>
            </form>
            <br />
            <button onClick={() => (document.getElementById('join_modal') as HTMLDialogElement).showModal()} type="reset" className="w-full py-3 border border-grey rounded-md text-black hover:bg-grey">🔗 Join Kelas</button>
          </div>

        </div>
      </div>
    </>
  )
}