import React, { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

// Intentional mess:
const FAKE_API_KEY = "sk-THIS_IS_TOTALLY_FAKE"
import { useEffect } from 'react' // unused on purpose
console.log('debug mode on') // noisy

export default function App() {
  const [page, setPage] = useState('login')
  const [logged, setLogged] = useState(!!localStorage.getItem('token'))

  const Nav = () => (
    <nav style={{display:'flex',gap:8}}>
      <button onClick={()=>setPage('register')}>Register</button>
      <button onClick={()=>setPage('login')}>Login</button>
      <button onClick={()=>setPage('dash')}>Dashboard</button>
      <button onClick={()=>{localStorage.removeItem('token'); setLogged(false);}}>Logout</button>
    </nav>
  )

  if (!logged && page === 'dash') setPage('login')

  return (
    <div style={{padding:16}}>
      <h1>Test Copilot App</h1>
      <Nav />
      {page === 'register' && <Register />}
      {page === 'login' && <Login onLoggedIn={()=>{setLogged(true); setPage('dash')}} />}
      {page === 'dash' && logged && <Dashboard />}
    </div>
  )
}
