import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import ClassRoom from "./pages/ClassRoom";
import Navbar from "./components/Navbar";
import Material from "./pages/Material";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const routes = ['dashboard', 'class', 'material', 'userprofile'];
  const [page, setPage] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const route = params.get('route');
    if (route && routes.includes(route)) {
      setPage(route);
    } else {
      setPage('dashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {page === 'dashboard' && (
        <Navbar>
          <Dashboard />
        </Navbar>
      )}
      {page === 'userprofile' && (
          <UserProfile />
      )}
      {page === 'class' && (
        <Navbar>
          <ClassRoom />
        </Navbar>
      )}
      {page === 'material' && (
        <Navbar>
          <Material />
        </Navbar>
      )}
    </>
  );
};

export default App;
