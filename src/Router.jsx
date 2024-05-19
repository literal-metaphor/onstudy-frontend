import { BrowserRouter as Routing, Routes, Route } from "react-router-dom"
import App from "./app/App";
import Auth from "./auth/Auth";
// import Guard from "./auth/Guard";
import Landing from "./Landing";
import { useEffect, useState } from "react";
import { api } from "./utils/API";

const Router = () => {
  const [auth, setAuth] = useState(null);

  const clearAuthData = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const isAuthenticated = userId !== null && token !== null;

    if (isAuthenticated) {
      api.post(`/auth/verifyauth`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        setAuth(true);
      })
      .catch((err) => {
        console.error(err);
        setAuth(false);
        clearAuthData();
      });
    } else {
      setAuth(false);
      clearAuthData();
    }
  }, []);

  useEffect(() => {
    if (auth === null) return;

    const publicRoutes = ['/', '/auth'];
    const path = window.location.pathname;

    if (auth === false && !publicRoutes.includes(path)) {
      window.location.pathname = '/auth';
    } else if (auth === true && publicRoutes.includes(path)) {
      window.location.pathname= '/app';
    } else if (!publicRoutes.includes(path) && path !== "/app") {
      window.location.pathname = '/app';
    }

   }, [auth]);

   return (
    <>
      <Routing>
        {/* <Guard/> */}
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/app" element={<App />} />
          <Route exact path="/auth" element={<Auth />} />
        </Routes>
      </Routing>
    </>
  )
}

export default Router
