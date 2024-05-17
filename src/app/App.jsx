import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import ClassRoom from "./pages/ClassRoom";
import Navbar from "./components/Navbar";

const App = () => {
  const routes = ['dashboard', 'class'];
  const [page, setPage] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const route = params.get('route');
    if (route && routes.includes(route)) {
      setPage(route);
    } else {
      setPage('dashboard');
    }
  }, []);
  return (
    <>
      {page === 'dashboard' && (
        <Navbar>
          <Dashboard />
        </Navbar>
      )}
      {page === 'class' && (
        <Navbar>
          <ClassRoom />
        </Navbar>
      )}
    </>
  );
};

export default App;
