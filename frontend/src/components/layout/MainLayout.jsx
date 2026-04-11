import { NavLink, Outlet } from 'react-router-dom'
import { navigationLinks } from '../../constants/navigation'

function MainLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>E-Commerce Frontend</h1>
        <nav>
          <ul className="nav-list">
            {navigationLinks.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link-active' : 'nav-link'
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="app-content">
        <Outlet />
      </main>

      <footer className="app-footer">Built with ReactJS and Vite</footer>
    </div>
  )
}

export default MainLayout
