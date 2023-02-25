import Sidebar from './components/Sidebar'
import { BrowserRouter, Route, Switch, Redirect, Routes } from "react-router-dom";
import Layout from './layout/layout';
import dashboardRouters from './router';


function App() {
  return (
    <div className="main">
      <BrowserRouter>
    <Routes>
      {/* <Route path="/login" render={props=><SignIn/>}/>
      <Route path="/signup" render={props=><SignUp/>}/> */}
      {/* <Route path="/admin" render={(props) => login ? <SlidenavLayout {...props} />: <Redirect to="/login" />} /> */}
     
      {dashboardRouters.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <route.component />
                </Layout>
              }
            />
          );
        })}
    </Routes>
  </BrowserRouter>
    </div>
  )
}

export default App
