import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/list', label: 'Pokémon' },
  { to: '/teams', label: 'Teams' },
  { to: '/favorites', label: 'Favorieten' },
]

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Hoofdnavigatie">
      <div className="sidebar__brand">
        <span className="sidebar__logo" aria-hidden="true">
          ▢
        </span>
        <span className="sidebar__title">PTM</span>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
                }
              >
                <span className="sidebar__icon" aria-hidden="true" />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
