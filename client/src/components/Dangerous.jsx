import React from 'react'

// ⚠️ intentionally unsafe: directly injects HTML
export default function Dangerous({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString || '' }} />
}
