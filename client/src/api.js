const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export function getToken() {
  return localStorage.getItem('token') // bad on purpose
}

export async function api(path, opts = {}) {
  const headers = Object.assign({ 'content-type': 'application/json' }, opts.headers || {})
  const token = getToken()
  if (token) headers['authorization'] = 'Bearer ' + token
  const res = await fetch(BASE + path, { ...opts, headers })
  if (!res.ok) throw new Error(await res.text())
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}
