import { BrowserRouter as Routing, Routes, Route } from "react-router-dom"
import App from "./app/App";
import Auth from "./auth/Auth";
import Guard from "./auth/Guard";
import Landing from "./Landing";

const Router = () => {
  return (
    <>
      <Routing>
        <Guard/>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/app" element={<App />} />
          <Route exact path="/devapp" element={<App />} />
          <Route exact path="/auth" element={<Auth />} />
        </Routes>
      </Routing>
    </>
  )
}

export default Router
