import createElement from '../../utilities/createElement'

/* Layout({currentUser: {username: string}, children: ReactElement}) : ReactElement */
export default function Layout({currentUser, children}) {
  return (
    <div>
      {children}
      {currentUser && <div>Welcome, {currentUser.username}!</div>}
    </div>
  )
}
