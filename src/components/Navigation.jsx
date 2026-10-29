import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      {' | '}
      <Link to="/list">List</Link>
      {' | '}
      <Link to="/detail/1">Detail</Link>
    </nav>
  )
}

export default Navigation
