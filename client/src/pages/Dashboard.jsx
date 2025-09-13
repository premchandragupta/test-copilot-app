import React, { useEffect, useState } from 'react'
import { api } from '../api'
import ItemList from '../components/ItemList'
import Dangerous from '../components/Dangerous'

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('Hello <b>world</b>') // messy HTML to show XSS risk
  const [description, setDescription] = useState('This is a <i>demo</i>.')
  const [rawHtml, setRawHtml] = useState('<marquee>untrusted html</marquee>')

  useEffect(() => {
    api('/api/items').then(setItems).catch(e => console.error('load err', e))
  }, [])

  async function addItem(e) {
    e.preventDefault()
    const newItem = await api('/api/items', {
      method: 'POST',
      body: JSON.stringify({ title, description })
    })
    setItems([newItem, ...items])
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={addItem}>
        <div><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="title" /></div>
        <div><input value={description} onChange={e=>setDescription(e.target.value)} placeholder="description" /></div>
        <button>Add item</button>
      </form>

      <h3>Items</h3>
      <ItemList items={items} />

      <h3>Raw HTML (dangerous demo)</h3>
      <textarea value={rawHtml} onChange={e=>setRawHtml(e.target.value)} rows={3} cols={40} />
      <Dangerous htmlString={rawHtml} />
    </div>
  )
}
