import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';

import { FirebaseProvider } from './contexts/FirebaseContext';
import { Redirect } from "react-router-dom";
import routes, { renderRoutes } from './routes';
import { BASENAME } from './config/constant';
import { ConfigContext } from './contexts/ConfigContext';
import AdminLayout from "./layouts/AdminLayout";

const App = () => {
  // const history = useHistory()
  // const [login, setLogin] = useGlobalState();
  // useEffect(()=>{
  //   if(!login){
  //     history.push('/auth/login')
  //   }
  // },[login])
  return (
    <React.Fragment>
    {/* <Router>
    <Route path="/" render={(props) =>  <AdminLayout {...props} />} />
    </Router> */}
     <Router basename={BASENAME}>

        <FirebaseProvider>{renderRoutes(routes)}</FirebaseProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;
