import createElement from '../../utilities/createElement'

type User = {username: string}
type Props = {currentUser: ?User, children: ReactElement}

/* Layout({currentUser: {username: string}, children: ReactElement}) : ReactElement */
export default function Layout(props: Props) : ReactElement {
  const {currentUser, children} = props

  return (
    <div>
      {children}
      {currentUser && <div>Welcome, {currentUser.username}!</div>}
    </div>
  )
}
