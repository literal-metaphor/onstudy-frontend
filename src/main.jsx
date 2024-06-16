/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './Bootstrap.scss'
import * as bootstrap from 'bootstrap'
import { Cache } from './utils/Cache.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Cache/>
  </React.StrictMode>,
);
