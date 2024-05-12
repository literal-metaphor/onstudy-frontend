import { BrowserRouter as Routing, Routes, Route } from "react-router-dom"
import App from "./app/App";
import Auth from "./auth/Auth";
import Guard from "./auth/Guard";
import Landing from "./Landing";

const Router = () => {
  return (
    <>
      <Guard/>
      <Routing>
        <Routes>
          <Route exact path="/" Component={Landing} />
          <Route exact path="/app" Component={App} />
          <Route exact path="/auth" Component={Auth} />
        </Routes>
      </Routing>
    </>
  )
}

export default Router