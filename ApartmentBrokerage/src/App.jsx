import { useState } from 'react'
import ReactDOM from "react-dom/client";
import {  Outlet, Link,BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import LogIn from './components/AdminPage/LoginIn'
import ServicesList from './components/Services/ServicesList'
import AdminHome from './components/AdminPage/AdminHome'
import UserHome from './components/UserPage/UserHome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    </>
  )
}

export default App
