import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {GreatReset} from "./Components/GreatReset/index"
import {AuthContextProvider as AuthProvider} from "./Context/AuthContext"


ReactDOM.render(
  <React.StrictMode>
    <GreatReset></GreatReset>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

