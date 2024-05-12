import { BrowserRouter as Routing, Routes, Route } from "react-router-dom"
import App from "./app/App";
import Auth from "./auth/Auth";
import Guard from "./auth/Guard";

const Router = () => {
  return (
    <>
      <Guard/>
      <Routing>
        <Routes>
          <Route path="/app" element={<App />} />
          <Route path="/devapp" element={<App />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Routing>
    </>
  )
}

export default Router