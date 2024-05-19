import { useEffect, useState } from "react";
import ClassCard from "../components/ClassCard";
import TaskNotification from "../components/TaskNotification";
import { api } from "../../utils/API";

const Dashboard = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [username, setUsername] = useState("");

  async function getAllJoinedClassrooms() {
    try {
      const res = await api.get('/userclass');
      const userClassData = res.data.data;
      const userId = localStorage.getItem("userId");
      const classrooms = [];

      // Create a map to store classroom information and their associated users
      const classroomMap = new Map();

      // First loop to get classroom data and initialize classroomMap
      for (const val of userClassData) {
        if (val.user_id === userId) {
          const classRes = await api.get('/classrooms/' + val.class_id);
          const classroomData = classRes.data.data;
          classroomMap.set(val.class_id, { ...classroomData, teacherName: null, students: [] });
        }
      }

      // Second loop to find the teacher and students for each classroom
      for (const val of userClassData) {
        if (classroomMap.has(val.class_id)) {
          if (val.role === 'Teacher') {
            const teacherRes = await api.get('/users/' + val.user_id);
            const teacherData = teacherRes.data.data;
            classroomMap.get(val.class_id).teacherName = teacherData.username;
          }
          // else if (val.role === 'Student') {
          //   const studentRes = await api.get('/users/' + val.user_id);
          //   const studentData = studentRes.data.data;
          //   classroomMap.get(val.class_id).students.push(studentData.username);
          // }
        }
      }

      // Convert classroomMap values to an array
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of classroomMap.entries()) {
        classrooms.push(value);
      }

      setClassrooms(classrooms);
    } catch (err) {
      console.error(err);
    }
  }

  async function getUsername() {
  try {
      const res = await api.get('/users/' + localStorage.getItem('userId'));
      const userData = res.data.data;
      setUsername(userData.username);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUsername();
    getAllJoinedClassrooms();
  }, []);

  function handleCreateClassroom(e)
  {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    // const photo = e.target.photo.files[0];

    // if (photo) {
    //   formData.append('file', photo);
    // }

    api.post('/classrooms', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      api.post('/userclass', {
        'user_id': localStorage.getItem('userId'),
        'class_id': res.data.data.id,
        'role': 'Teacher'
      })
      .then((res) => {
        alert("Kelas berhasil dibuat, kode kelas Anda adalah: " + res.data.data.id);
      })
      .catch((err) => {
        alert("Ada kesalahan pada pembuatan kelas: " + err.response.data.message);
        console.error(err);
      })
    })
    .catch((err) => {
      alert("Ada kesalahan pada pembuatan kelas: " + err.response.data.message);
      console.error(err);
    });
  }

  function handleJoinClassroom(e)
  {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    formData.append("user_id", localStorage.getItem('userId'));
    formData.append("role", "Student");

    api.post('/userclass', formData)
    .then(() => {
      alert('Berhasil masuk kelas');
    })
    .catch((err) => {
      console.error(err);
      alert('Ada kesalahan pada proses masuk kelas: ' + err.response.data.message);
    })
  }

  return (
    <>
      <dialog id="create_classroom" className="tw-modal">
        <div className="tw-modal-box">
          <h3 className="tw-font-bold tw-text-lg">Form Pembuatan Kelas</h3>
          <form onSubmit={handleCreateClassroom} className="py-4" encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="Nama Kelas" className="form-label">Nama Kelas</label>
              <input type="text" className="form-control" id="Nama Kelas" name="title" placeholder="Nama kelas..."/>
            </div>
            <div className="mb-3">
              <label htmlFor="Mata Pelajaran" className="form-label">Mata Pelajaran</label>
              <select className="form-select hover:tw-cursor-pointer" id="Mata Pelajaran" name="subject">
                <option value="Sains">Sains</option>
                <option value="Matematika">Matematika</option>
                <option value="Bahasa">Bahasa</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Sosial">Sosial</option>
                <option value="Seni">Seni</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="Deskripsi Kelas" className="form-label">Deskripsi Kelas (Opsional)</label>
              <textarea className="form-control" id="Deskripsi Kelas" name="description" placeholder="Deskripsi kelas... (Opsional)"/>
            </div>
            {/* <div className="mb-3">
              <label htmlFor="formFile" className="form-label">Foto Kelas (Opsional)</label>
              <input className="form-control" type="file" id="Foto Kelas" name="photo"/>
            </div> */}
            <br className="my-4" />
            <button type="submit" className="btn btn-primary">Buat Kelas</button>
            <button type="reset" className="btn">Reset</button>
          </form>
          <div className="tw-modal-action">
            <form method="dialog">
              <button className="tw-btn">Keluar</button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id="join_classroom" className="tw-modal">
        <div className="tw-modal-box">
          <h3 className="tw-font-bold tw-text-lg">Bergabung dengan Kelas</h3>
          <form onSubmit={handleJoinClassroom} className="py-4">
            <div className="mb-3">
              <label htmlFor="Nama Kelas" className="form-label">Kode Kelas</label>
              <input type="text" className="form-control" id="Nama Kelas" name="class_id" placeholder="Salin kode kelas di sini..."/>
            </div>
            <br className="my-4" />
            <button type="submit" className="btn btn-primary">Masuk Kelas</button>
            <button type="reset" className="btn">Reset</button>
          </form>
          <div className="tw-modal-action">
            <form method="dialog">
              <button className="tw-btn">Keluar</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="row">
        <div className="col-8 container mt-5 ms-5">
          <div className="row">
            <div className="row col-12">
              <div className="d-flex align-items-center p-0">
                <label htmlFor="sidebar" className="tw-btn tw-btn-ghost tw-drawer-button lg:tw-hidden">
                  <svg className="tw-w-[24px] tw-h-[24px] tw-b-transparent lg-tw-hidden" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#4F6F52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                </label>
                <p className="fw-medium fs-1">Hai, {username}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3 col-12">
              <form className="row">
                <div className="input-group p-0 border tw-rounded-lg w-100">
                  <input
                    id="cari_kelas"
                    type="text"
                    className="form-control tw-bg-[#fff] tw-border-0"
                    placeholder="Cari kelas"
                  />
                  <span
                    className="input-group-text tw-bg-[#fff] tw-border-0 hover:tw-cursor-text"
                    onClick={() => window.document.getElementById("cari_kelas").focus()}
                  >
                    <img
                      src="Dashboard/search.svg"
                      className="tw-w-[20px] tw-h-[20px]"
                      alt="Search"
                    />
                  </span>
                </div>
              </form>
              <div className="btn-group">
                <button onClick={() => document.getElementById('create_classroom').showModal()} type="button" className="btn btn-success">+ Buat Kelas Baru</button>
                <button type="button" className="btn btn-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a onClick={() => document.getElementById('create_classroom').showModal()} className="dropdown-item d-flex align-items-center hover:tw-cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2 bi bi-plus-square" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                    Buat Kelas Baru</a></li>
                  <li><a onClick={() => document.getElementById('join_classroom').showModal()} className="dropdown-item d-flex align-items-center hover:tw-cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2 bi bi-link-45deg" viewBox="0 0 16 16">
                      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
                      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
                    </svg>
                    Gabung Kelas Baru</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row gap-4 d-flex poppins mt-5 tw-h-[60vh] tw-overflow-x-hidden overflow-y-scroll">
            {classrooms.map((val) => {
              return (
                <ClassCard key={val.id} id={val.id} title={val.title} teacher={val.teacherName} subject={val.subject} />
              )
            })}
          </div>
        </div>
        <div className="col-3 mt-5 d-flex flex-column position-fixed end-0 me-1">
            <h1 className="fw-medium fs-2 poppins">Tugas</h1>
            <div className="dropdown my-4 ">
              <button
                className="btn tw-h-[45px] tw-w-[90%] tw-bg-[#EBEBEB] hover:tw-outline-[#0F0F0F] dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Kelas
              </button>
              <ul className="dropdown-menu tw-w-[90%]">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
            {/* List Tugas */}
            <br className="mt-2"/>
            <div className="tw-h-[60vh] tw-overflow-y-scroll">
              <TaskNotification/>
              <TaskNotification/>
              <TaskNotification/>
              <TaskNotification/>
            </div>
        </div>
      </div>
    </>
  )
}

export  default Dashboard;