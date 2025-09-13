import React, { useState } from 'react'
import { api } from '../api'

export default function Login({ onLoggedIn }) {
  const [username, setUsername] = useState('alice')
  const [password, setPassword] = useState('password123')
  const [err, setErr] = useState('')

  async function submit(e) {
    e.preventDefault()
    setErr('')
    try {
      const { token } = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      })
      localStorage.setItem('token', token) // bad on purpose
      onLoggedIn && onLoggedIn()
    } catch (e) {
      setErr(String(e))
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {err && <p style={{color:'red'}}>{err}</p>}
      <form onSubmit={submit}>
        <div><input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" /></div>
        <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" /></div>
        <button>Login</button>
      </form>
    </div>
  )
}
