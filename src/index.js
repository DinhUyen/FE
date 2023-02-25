import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { GlobalState } from './views/auth/signin/FirebaseLogin';

import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect, useContext } from "react-router-dom";

import { Provider } from 'react-redux';
import { ConfigContext, ConfigProvider } from './contexts/ConfigContext';

import './index.scss';

import App from './App';
import store from './store';
const root = ReactDOM.createRoot(document.getElementById("root"));
const login = true;
root.render(
<Provider store={store}>
    <ConfigProvider>
    
      <App />
    </ConfigProvider>
  </Provider>

);
