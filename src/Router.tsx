import Auth from "./Auth"
import App from "./App";

export default function Routing() {
  return (
    <>
      {localStorage.getItem("userData") ? <App /> : <Auth />}
    </>
  )
}
