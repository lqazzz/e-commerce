import { NavLink, Outlet } from 'react-router-dom'
import { navigationLinks } from '../../constants/navigation'
import { cartSeed } from '../../constants/mockProducts'
import { useAuth } from '../../context/AuthContext'

function MainLayout() {
  const { customer, isAuthenticated, logout } = useAuth()

  return (
    <div className="app-shell">
      <div className="app-topbar">
        <p>Free delivery over $180</p>
        <p>24/7 support for order and returns</p>
      </div>

      <header className="app-header">
        <div className="app-brand-wrap">
          <span className="brand-mark" aria-hidden="true">
            NW
          </span>
          <div>
            <h1>Northwind Supply</h1>
            <p className="app-tagline">Functional goods for city life</p>
          </div>
        </div>

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

        <div className="header-actions">
          <button className="button button-ghost" type="button">
            Search
          </button>

          {isAuthenticated ? (
            <>
              <NavLink className="button button-ghost" to="/profile">
                {customer?.fullName?.split(' ')[0] || 'Account'}
              </NavLink>
              <button className="button button-danger" type="button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className="button button-ghost" to="/login">
                Login
              </NavLink>
              <NavLink className="button button-secondary" to="/register">
                Register
              </NavLink>
            </>
          )}

          <NavLink className="button button-primary" to="/cart">
            Cart ({cartSeed.length})
          </NavLink>
        </div>
      </header>

      <main className="app-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>Northwind Supply, 2026 storefront prototype</p>
        <p>Built with ReactJS and Vite</p>
      </footer>
    </div>
  )
}

export default MainLayout
