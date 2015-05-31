import React from 'react'

export default function Layout({currentUser, children}) {
  return (
    <div>
      {children}
      {currentUser && <div>Welcome, {currentUser.username}!</div>}
    </div>
  )
}
