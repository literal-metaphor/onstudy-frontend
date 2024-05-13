import { useEffect, useState } from "react";
import { MouseParallaxChild, MouseParallaxContainer } from "react-parallax-mouse";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import "../utils/Firebase";
import { api } from "../utils/API";

const Auth = () => {
  const [page, setPage] = useState("SignUp");
  const [agreed, setAgreed] = useState(false);
  const [authError, setAuthError] = useState(false);
  useEffect(() => {
    if (authError !== false) {
      document.getElementById("auth_error_modal").showModal();
    }
  }, [authError])

  // Methods
  function HandleSignIn(e) {
    e.preventDefault();
    if (!agreed) return;
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const username = formData.get("username").replace(/\W/g, '');
    const password = formData.get("password");
    if (!email || !username || !password) return;
    api.post("/auth/register", {
      email,
      username,
      password
    })
    .then((res) => {
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("token", res.data.user.remember_token);
      window.location.pathname = "/app";
    })
    .catch((err) => {
      console.error(err);
      setAuthError(err.response.data.message || err.response.data[0].message || "Tidak diketahui, mohon coba lagi menggunakan metode lain");
    })
  }
  function HandleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) return;
    api.post("/auth/login", {
      email,
      password
    })
    .then((res) => {
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("token", res.data.user.remember_token);
      window.location.pathname = "/app";
    })
    .catch((err) => {
      setAuthError(err.response.data.message || err.response.data[0].message || "Tidak diketahui, mohon coba lagi menggunakan metode lain");
    })
  }
  async function GoogleAuth() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const username = result.user.displayName.replace(/\W/g, '');
      console.log(username);
      const password = result.user.uid;
      if (!email || !username || !password) return;
      api.post(`/auth/${page === "SignUp" ? "register" : "login"}`, {
        email,
        username,
        password
      })
      .then((res) => {
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("token", res.data.user.remember_token);
        window.location.pathname = "/app";
      })
      .catch((err) => {
        setAuthError(err.response.data.message || err.response.data[0].message || "Tidak diketahui, mohon coba lagi menggunakan metode lain");
      })
    } catch (err) {
      setAuthError("Tidak diketahui, mohon coba lagi menggunakan metode lain");
      return;
    }
  }
  async function FacebookAuth() {
    alert("Under construction!");
    // !Facebook doesn't allow non-verified entity to request user's email
  }
  async function TwitterAuth() {
    alert("Under construction!");
    // !Twitter doesn't allow non-verified entity to request user's email
    // const auth = getAuth();
    // const provider = new TwitterAuthProvider();
    // try {
    //   const result = await signInWithPopup(auth, provider);
    //   const email = result.user.email;
    //   const username = result.user.displayName.replace(/\W/g, '');
    //   const password = result.user.uid;
    //   if (!email || !username || !password) throw new Error();
    //   api.post(`/auth/${page === "SignUp" ? "register" : "login"}`, {
    //     email,
    //     username,
    //     password
    //   })
    //   .then((res) => {
    //     localStorage.setItem("userId", res.data.user.id);
    //     localStorage.setItem("token", res.data.user.remember_token);
    //     window.location.pathname = "/app";
    //   })
    //   .catch((err) => {
    //     setAuthError(err.response.data.message || err.response.data[0].message || "Tidak diketahui, mohon coba lagi menggunakan metode lain");
    //   })
    // } catch (err) {
    //   setAuthError("Tidak diketahui, mohon coba lagi menggunakan metode lain");
    //   return;
    // }
  }

  return (
    <>
      <div className="container-fluid py-5 py-lg-0 lg:tw-h-screen tw-bg-[#4F6F52]">
        {/* TOS modal */}
        <dialog id="tos_modal" className="tw-modal roboto">
          <div className="tw-modal-box p-0">
            <h2 className="fs-2 fw-bold tw-sticky tw-top-0 tw-bg-white p-4">Syarat dan Ketentuan onStudy</h2>
            <p className="px-4 py-2">
              Terima kasih telah mengunjungi situs resmi onStudy di <a className="text-primary" href="#">https://onstudy.net</a>. Dengan mengakses dan menggunakan layanan yang tersedia di situs ini, berarti Anda telah menyetujui untuk terikat oleh syarat dan ketentuan yang ditetapkan oleh onStudy. Jika Anda tidak setuju dengan syarat dan ketentuan ini, harap untuk tidak menggunakan layanan kami.

              <br /><br />

              Informasi yang Diberikan Semua informasi yang terdapat di situs ini disediakan hanya untuk tujuan informasi. Kami tidak menjamin keakuratan, kelengkapan, atau keandalan informasi yang diberikan. Seluruh informasi yang diberikan di situs ini dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu.

              <br /><br />

              Penggunaan Konten Seluruh konten yang terdapat di situs ini, termasuk namun tidak terbatas pada teks, gambar, grafik, logo, dan video adalah milik dari onStudy dan dilindungi oleh undang-undang hak cipta. Tidak diperkenankan untuk menyalin, mendistribusikan, atau menggunakan konten tanpa izin tertulis dari onStudy.

              <br /><br />

              Kebijakan Privasi Kami menghargai privasi pengguna dan menjaga kerahasiaan informasi yang diberikan kepada kami. Untuk informasi lebih lanjut mengenai kebijakan privasi kami, silakan lihat pada halaman Kebijakan Privasi di situs kami.

              <br /><br />

              Tautan Eksternal Situs ini dapat berisi tautan ke situs eksternal yang tidak dikendalikan oleh onStudy. Kami tidak bertanggung jawab atas isi atau privasi dari situs tersebut.

              <br /><br />

              Perubahan Syarat dan Ketentuan onStudy berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu. Dengan terus menggunakan layanan kami setelah perubahan tersebut, berarti Anda telah menyetujui syarat dan ketentuan yang baru.

              <br /><br />

              Kontak Jika Anda memiliki pertanyaan atau masukan mengenai syarat dan ketentuan ini, silakan hubungi kami melalui email <a className="text-primary" href="#">onstudy@contact.com</a>.
            </p>
            <div className="tw-modal-action p-4">
              <form method="dialog">
                <button className="tw-btn">Tutup</button>
              </form>
            </div>
          </div>
        </dialog>
        {/* Failed auth alert modal */}
        <dialog id="auth_error_modal" className="tw-modal roboto">
          <div className="tw-modal-box p-0">
            <h2 className="fs-2 fw-bold tw-sticky tw-bg-white tw-top-0 p-4">Kesalahan Autentikasi!</h2>
            <p className="px-4 py-2">Alasan: {authError.length>100?authError.slice(0,100)+"...":authError}</p>
            <div className="tw-modal-action p-4">
              <form method="dialog">
                <button onClick={()=>setAuthError(false)} className="tw-btn">Tutup</button>
              </form>
            </div>
          </div>
        </dialog>
        <MouseParallaxContainer className="tw-h-full" globalFactorX={0.1} globalFactorY={0.1}>
          <div className="row gx-4 tw-h-full">
            {/* Aside content */}
            <aside className="tw-h-full col-12 pb-5 pb-lg-0 col-lg-4 d-flex flex-column justify-content-center align-items-center">
                <MouseParallaxChild className="p-4" factorX={0.3} factorY={0.5}>
                  <div className="poppins">
                    <h1 className="fs-1 fw-bold text-center px-4">
                      <span className="tw-text-[#65B741]">onStudy</span>
                      <span className="tw-text-[#F5EFE6]">, Belajar jadi lebih seru!</span>
                    </h1>
                  </div>
                </MouseParallaxChild>
                <MouseParallaxChild className="p-4" factorX={0.3} factorY={0.5}>
                  <img src="Auth/Aside.svg" alt="Study desk / Meja belajar" />
                </MouseParallaxChild>
            </aside>
            {/* Main form */}
            <main className="tw-h-full col-12 col-lg-8 p-5 d-flex flex-column justify-content-center align-items-center lg:tw-rounded-l-3xl tw-bg-[#fff]">
              <div className="position-relative w-100 h-100 d-flex justify-content-center align-items-center">
              {/* Sign Up */}
              <form onSubmit={HandleSignIn} className={`w-100 px-4 tw-transition tw-duration-300 ${page !== "SignUp" && "tw-translate-x-[100vw] position-absolute"}`}>
                <h1 className="fs-2 mb-5 fw-bold">Daftar</h1>
                <div className="mb-4">
                  <input required name="email" placeholder="Email" autoComplete="new-password" type="email" className="form-control tw-bg-[#F5EFE6]"/>
                </div>
                <div className="mb-4">
                  <input required name="username" placeholder="Username" autoComplete="new-password" type="text" className="form-control tw-bg-[#F5EFE6]"/>
                </div>
                <div className="mb-4">
                  <input required name="password" placeholder="Password" autoComplete="new-password" type="password" className="form-control tw-bg-[#F5EFE6]"/>
                </div>
                <div className="mb-4 form-check">
                  <input required readOnly onClick={()=>setAgreed(!agreed)} autoComplete="new-password" type="checkbox" className="form-check-input hover:tw-cursor-pointer" checked={agreed}/>
                  <label className="form-check-label hover:tw-cursor-pointer roboto"><span onClick={()=>setAgreed(!agreed)}>Saya menyutujui</span> <span className="text-primary" onClick={()=>document.getElementById('tos_modal').showModal()}>Persyaratan Layanan onStudy</span></label>
                </div>
                <button disabled={!agreed} type="submit" className="roboto btn btn-success w-100 mt-4 py-2 px-4 rounded tw-font-normal tw-text-white roboto tw-transition tw-duration-300">Daftar</button>
              </form>
              {/* Login */}
              <form onSubmit={HandleLogin} className={`w-100 px-4 text-center tw-transition tw-duration-300 ${page !== "Login" && "tw-translate-x-[100vw] position-absolute"}`}>
                <h1 className="fs-2 mb-5 fw-bold text-start">Login</h1>
                <div className="mb-3">
                  <input required name="email" placeholder="Email" autoComplete="new-password" type="email" className="form-control tw-bg-[#F5EFE6]"/>
                </div>
                <div className="mb-3">
                  <input required name="password" placeholder="Password" autoComplete="new-password" type="password" className="form-control tw-bg-[#F5EFE6]"/>
                </div>
                <button type="submit" className="roboto btn btn-success w-100 my-4 py-2 px-4 rounded tw-font-normal tw-text-white roboto tw-transition tw-duration-300">Masuk</button>
                <a className="text-primary roboto" href="#">Lupa Password?</a>
              </form>
              </div>
              {/* Divider */}
              <div className="tw-divider py-4 roboto">Atau</div>
              {/* Third-Party */}
              <div className="d-flex justify-content-center align-items-center flex-wrap">
                <button onClick={GoogleAuth} disabled={!agreed && page !== "Login"} className="tw-btn tw-btn-ghost mx-4 my-2"><img className="rounded-circle" src="Auth/Google.svg" alt="Google logo" width={36} height={36} /></button>
                <button onClick={FacebookAuth} disabled={!agreed && page !== "Login"} className="tw-btn tw-btn-ghost mx-4 my-2"><img className="rounded-circle" src="Auth/Facebook.svg" alt="Facebook logo" width={36} height={36} /></button>
                <button onClick={TwitterAuth} disabled={!agreed && page !== "Login"} className="tw-btn tw-btn-ghost mx-4 my-2"><img className="rounded-circle" src="Auth/X.svg" alt="X logo" width={36} height={36} /></button>
              </div>
              <br />
              {/* Change Page */}
              {page === "Login" && (
                <p className="roboto">Belum Punya Akun? <span className="hover:tw-cursor-pointer text-primary" onClick={() => setPage("SignUp")}>Daftar</span></p>
              )}
              {page === "SignUp" && (
                <p className="roboto">Sudah Punya Akun? <span className="hover:tw-cursor-pointer text-primary" onClick={() => setPage("Login")}>Masuk</span></p>
              )}
            </main>
          </div>
        </MouseParallaxContainer>
      </div>
    </>
  )
}

export default Auth