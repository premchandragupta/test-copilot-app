import React from 'react'

export default function ItemList({ items }) {
  if (!items?.length) return <p>No items yet.</p>
  return (
    <ul>
      {items.map((it, i) => (
        <li key={it._id || i}>
          <strong>{it.title}</strong> — {it.description}
        </li>
      ))}
    </ul>
  )
}
