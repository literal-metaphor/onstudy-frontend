import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import { api } from "./utils/API";
import MainApp from "./pages/MainApp";

export default function App() {
  // Guard script to prevent unauthorized access
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(function(){
    async function verify(remember_token) {
      try {
        const response = await api.get(`/users/verify?remember_token=${remember_token}`);
        return response.data.message === "Verified";
      } catch(err) {
        // Delete invalid data and cache
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
        return false;
      }
    }

    if (localStorage.getItem('user')) {
      const remember_token = JSON.parse(localStorage.getItem('user')).remember_token;
      verify(remember_token).then((isVerified) => {
        setAuth(isVerified);
        setLoading(false);
      });
    } else {
      setAuth(false);
      setLoading(false);
    }
  }, []);

  // Render based on auth and loading states
  return (
    <>
      {!loading && (auth ? <MainApp/> : <Auth/>)}
    </>
  );
}