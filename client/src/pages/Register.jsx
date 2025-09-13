import React, { useState } from 'react'
import { api } from '../api'

export default function Register() {
  const [username, setUsername] = useState('alice')
  const [password, setPassword] = useState('password123')
  const [msg, setMsg] = useState('')

  async function submit(e) {
    e.preventDefault()
    setMsg('')
    try {
      await api('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      })
      setMsg('Registered! Now go to Login.')
    } catch (e) {
      setMsg(String(e))
    }
  }

  return (
    <div>
      <h2>Register</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={submit}>
        <div><input value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" /></div>
        <div><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" /></div>
        <button>Register</button>
      </form>
    </div>
  )
}
