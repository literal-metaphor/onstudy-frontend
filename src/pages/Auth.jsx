import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import "../utils/Firebase";
import { api } from "../utils/API";

export default function Auth() {
  async function handleAuth(email, name, password) {
    try {
      const response = await api.post('/users/auth', { email, name, password });
      localStorage.setItem('user', JSON.stringify(response.data));
      location.reload();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function googleOauth() {
    // Initialize Google Firebase Auth
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      // Sign in with popup
      const result = await signInWithPopup(auth, provider);
      handleAuth(result.user.email, result.user.displayName, result.user.uid);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        {/* Main container */}
        <div className="container p-5 my-5 border-1 tw-border-grey tw-bg-white tw-rounded-md tw-w-max tw-h-max">
          {/* Logo and main title */}
          <div className="d-flex align-items-center">
            <img src="Logo.svg" alt="Logo" className="tw-w-[48px] tw-h-[48px] me-3" />
            <div className="tw-font-semibold">
              <h1 className="tw-text-xl">on<span className="tw-text-secondary">Study</span></h1>
              <h4 className="tw-text-sm">Penilaian Simpel, Fokus Belajar Optimal</h4>
            </div>
          </div>

          <br /><br />
          {/* Login form */}
          <h1 className="tw-text-xl tw-font-semibold mb-2">Autentikasi Akun</h1>
          <form onSubmit={function(e) {
            e.preventDefault();

            // Parse form before submitting
            const formData = new FormData(e.currentTarget);

            handleAuth(formData.get("email"), "Pengguna Baru", formData.get("password"));
          }}>
            {/* Inputs */}
            <label className="tw-form-control tw-w-full">
              <div className="tw-label">
                <span className="tw-label-text">Email</span>
              </div>
              <input name="email" required type="email" placeholder="Email" className="tw-input tw-input-bordered tw-w-full" />
            </label>
            <label className="tw-form-control tw-w-full">
              <div className="tw-label">
                <span className="tw-label-text">Password</span>
              </div>
              <input name="password" required type="password" placeholder="Password" className="tw-input tw-input-bordered tw-w-full" />
            </label>
            <p className="tw-text-blue tw-text-sm tw-float-right mt-2 tw-cursor-pointer">Lupa password?</p>

            <br /><br />
            {/* Actions */}
            <div className="d-flex align-items-center gap-2">
              <button type="submit" className="tw-flex-1 py-3 tw-bg-success tw-rounded-md tw-text-white hover:tw-opacity-75">Lanjutkan</button>
              <button type="reset" className="tw-flex-1 py-3 border-1 tw-border-grey tw-rounded-md tw-text-black hover:tw-bg-grey">Reset</button>
            </div>
          </form>

          <br /><div className="tw-divider"/><br />

          {/* OAuth with Google */}
          <button onClick={googleOauth} className="d-flex align-items-center w-100 px-3 py-3 border-1 tw-border-grey tw-rounded-md tw-text-black hover:tw-bg-grey">
            <img src="Google.svg" alt="Google" className="tw-w-[24px] tw-h-[24px] me-2" />
            <span>Lanjutkan dengan Google</span>
          </button>

          <br /><br />

          {/* TOS */}
          <p className="w-100">Dengan mendaftar, Anda menyetujui <span className="tw-text-blue hover:tw-cursor-pointer">Kebijakan Layanan dan Privasi</span> kami.</p>
        </div>
      </div>
    </>
  )
}