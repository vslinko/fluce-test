import {element} from 'deku'

export default function Layout({currentUser, children}) {
  return (
    <div>
      {children}
      {currentUser && <div>Welcome, {currentUser.username}!</div>}
    </div>
  )
}
