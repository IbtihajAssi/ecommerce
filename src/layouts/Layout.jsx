import React from 'react'
import Footer from '../components/dashboard/footer/Footer'
import Navbarr from '../components/web/navbarr/Navbarr'
import { Outlet } from 'react-router-dom'


export default function Layout({users}) {
  return (
    <>
    <Navbarr  users={users} setUsers={setUsers} />
    <Outlet />
   <Footer />
    </>
  )
}
