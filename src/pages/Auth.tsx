import { useRef, useState } from 'react';
import { api } from '../utils/API';

export default function Auth() {
  const [register, setRegister] = useState(false);
  const authButtonRef = useRef<HTMLButtonElement>(null);

  async function handleAuth(email: string, name: string, password: string) {
    try {
      if (authButtonRef.current) {
        authButtonRef.current.innerHTML = "<div class='animate-spin'>⟳</div>";
        authButtonRef.current.disabled = true;
        authButtonRef.current.className += " opacity-75";
      }

      const response = register
      ? await api.post("/users/register", { email, name, password })
      : await api.post("/users/login", { email, password });

      localStorage.setItem("userData", response.data);
    } catch (err) {
      alert((err as { response: { data: { message: string } } }).response.data.message);
    } finally {
      if (authButtonRef.current) {
        authButtonRef.current.innerHTML = register ? "Register" : "Login";
        authButtonRef.current.disabled = false;
        authButtonRef.current.className = authButtonRef.current.className.replace(/ ?opacity-75/g, "");
      }
    }
  }

  async function googleOauth() {
    alert("Fitur masih dalam konstruksi");
  }

  return (
    <>
      <div className="w-screen flex justify-center items-center">
        {/* Main container */}
        <div className="container p-12 m-8 border border-grey bg-white rounded-md w-max h-max">
          {/* Logo and main title */}
          <div className="flex items-center">
            <img src="Logo.svg" alt="Logo" className="w-[48px] h-[48px] me-4" />
            <div className="font-semibold">
              <h1 className="text-xl">on<span className="text-secondary">Study</span></h1>
              <h4 className="text-sm">Penilaian Simpel, Fokus Belajar Optimal</h4>
            </div>
          </div>

          <br /><br />

          {/* Login form */}
          <h1 className="text-xl font-semibold mb-2">{register ? "Daftar" : "Login"}</h1>
          <p onClick={() => setRegister(!register)} className="text-blue text-sm float-left mt-2 hover:cursor-pointer hover:underline">{register ? "Sudah punya akun?" : "Belum punya akun?"}</p>

          <br /><br />

          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;
            handleAuth(form.email.value, form.fullname.value || "Pengguna baru", form.password.value);
          }}>
            {/* Inputs */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input name="email" required type="email" placeholder="Email" className="input input-bordered w-full" />
            </label>
            <label className={`form-control w-full ${register ? "" : "hidden"}`}>
              <div className="label">
                <span className="label-text">Nama</span>
              </div>
              <input name="fullname" type="text" placeholder="Nama" className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input name="password" required type="password" placeholder="Password" className="input input-bordered w-full" />
            </label>
            {!register && (<p className="text-blue text-sm float-right mt-2 hover:cursor-pointer">Lupa password?</p>)}

            <br /><br />

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button type="submit" ref={authButtonRef} className="transition duration-300 flex-1 py-3 bg-success rounded-md text-white hover:opacity-75">{register ? "Daftar" : "Login"}</button>
              <button type="reset" className="transition duration-300 flex-1 py-3 border border-grey rounded-md text-black hover:bg-grey">Reset</button>
            </div>
          </form>

          <div className="divider"/>

          {/* OAuth with Google */}
          <button onClick={googleOauth} className="flex items-center w-full px-3 py-3 border border-grey rounded-md text-black hover:bg-grey">
            <img src="Google.svg" alt="Google" className="w-[24px] h-[24px] me-2" />
            <span>Lanjutkan dengan Google</span>
          </button>

          <br />

          {/* TOS */}
          <div className="lg:w-[25vw] w-full">Dengan mendaftar, Anda menyetujui <span className="text-blue hover:cursor-pointer">Kebijakan Layanan dan Privasi</span> kami.</div>
        </div>
      </div>
    </>
  )
}