import { useState } from "react";
import App from "../App";

function getCacheData() {
  return {
    userData: JSON.parse(localStorage.getItem("user")),
  };
}

// eslint-disable-next-line react/prop-types
export function Cache() {
  const [cacheData, setCacheData] = useState(getCacheData());

  function updateCacheData() {
    // TODO: add option to sync with server
    setCacheData(getCacheData());
  }

  return <App cacheData={cacheData} updateCacheData={updateCacheData} />;
}
