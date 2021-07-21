import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {GreatReset} from "./Components/GreatReset/index"

ReactDOM.render(
  <React.StrictMode>
    <GreatReset></GreatReset>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

