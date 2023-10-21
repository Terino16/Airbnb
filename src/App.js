import React from 'react';
import { Routes,Route} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from "./Layout";
import Login from './pages/Login'
import Home from "./pages/Home";
import Signup from './pages/Signup';
import { UserContextProvider } from './Usercontext';
import Airbnbyourhome from './pages/Airbnbyourhome';
import SingleProperty from './pages/SingleProperty';

function App() {
  return (
    <UserContextProvider>
    <Layout>
     <Routes>
      <Route index element={<Home/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/airbnbyourhome' element={<Airbnbyourhome/>}></Route>
      <Route path="/Property/:id" element={<SingleProperty/>}></Route>
     </Routes>
     </Layout>
    </UserContextProvider>
   
  );
}

export default App;
