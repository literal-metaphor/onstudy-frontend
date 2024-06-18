/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import { api } from "./utils/API";
import MainApp from "./pages/MainApp";

export default function App({ cacheData, updateCacheData, syncWithServer }) {
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

    if (cacheData.userData) {
      const remember_token = cacheData.userData.remember_token;
      verify(remember_token).then((isVerified) => {
        setAuth(isVerified);
        setLoading(false);
      });
    } else {
      setAuth(false);
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render based on auth and loading states
  return (
    <>
      {!loading && (auth ? <MainApp cacheData={cacheData} updateCacheData={updateCacheData} syncWithServer={syncWithServer} /> : <Auth/>)}
    </>
  );
}