import { useEffect, useState } from "react";
import { api } from "../utils/API";

export default function Guard() {
  const [auth, setAuth] = useState(null);

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
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
      });
    } else {
      setAuth(false);
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
    }
  }, []);

  useEffect(() => {
    if (auth === null) return;

    const publicRoutes = ['/auth'];
    const path = window.location.pathname;
    if (!publicRoutes.includes(path) && path !== "/app") {
      window.location.pathname = ('/app');
    }
    if (auth === false && !publicRoutes.includes(path)) {
      window.location.pathname = ('/auth');
    } else if (auth === true && publicRoutes.includes(path)) {
      window.location.pathname = ('/app')
    }
  }, [auth]);

  return null;
}