import React, { useEffect, useState } from 'react'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Layout from './layouts/Layout';
import Home from './components/web/home/Home';
import Categories from './components/web/categories/Categories';
import DashboardLayout from './layouts/DashboardLayout';
import Homedashboard from './components/dashboard/home/Home';
import Categoriesdashboard from './components/dashboard/categories/Categories';
import Register from './components/web/register/Register';
import { Login } from './components/web/login/Login';
import { jwtDecode } from 'jwt-decode';
const[users,setUsers]=useState(null);
const saveCurrentuser= ()=>{
  const token=localStorage.getItem("userToken");
  const decode=jwtDecode(token);
  setUsers(decode);
}
useEffect(()=>{
if(localStorage.getItem("userToken")){
  saveCurrentuser();
}
},[])
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout users={users} setUsers={setUsers} />,
   
    children:[
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <Login info={saveCurrentuser}/>
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'categories',
        element: <Categories/>
      },
      {
        path:'*',
        element:<h2>404 Page not found-----user</h2>
      }
    ]
  },
  {
   
    path: "/dashboard",
    element: <DashboardLayout/>,

    children:[
      {
        path: 'home',
        element: <Homedashboard />
      },
      {
        path: 'categories',
        element: <Categoriesdashboard/>
      },
      {
        path:'*',
        element:<h2>404 Page not found-----user</h2>
      }
    ] 
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
