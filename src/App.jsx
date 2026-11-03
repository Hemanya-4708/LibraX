
import { useState } from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import './App.css'

function App() {
  const [page, setPage] = useState('home')

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('currentUser')) || null
  })

  function handleLogin(user) {
    setCurrentUser(user)
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  function handleLogout() {
    setCurrentUser(null)
    localStorage.removeItem('currentUser')
    setPage('home')
  }

  return (
    <div className="app">
      {!currentUser && (
        <header className="landing-header">
          <div className="landing-logo" onClick={() => setPage('home')}>
            <span className="logo-icon">L</span>
            <span>LibraX</span>
          </div>

          <nav className="landing-nav">
            <button onClick={() => setPage('login')}>Login</button>
            <button
              className="nav-signup"
              onClick={() => setPage('signup')}
            >
              Sign Up
            </button>
          </nav>
        </header>
      )}

      {currentUser && (
        <header>
          <h1>LibraX</h1>
          <p>Online Library Management System</p>
        </header>
      )}

      <main>
        {currentUser ? (
          <>
            {currentUser.role === 'admin' ? (
              <AdminDashboard />
            ) : (
              <UserDashboard currentUser={currentUser} />
            )}

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {page === 'home' && (
              <section className="landing-hero">
                <div className="hero-content">
                  <span className="landing-tag">
                    YOUR DIGITAL LIBRARY
                  </span>

                  <h1>
                    Welcome to <span>LibraX</span>
                  </h1>

                  <h2>Your Gateway to Knowledge.</h2>

                  <p>
                    Discover new worlds, explore your favourite books
                    and manage your reading journey — all in one place.
                  </p>

                  <div className="landing-buttons">
                    <button
                      className="landing-primary"
                      onClick={() => setPage('login')}
                    >
                      Login <span>→</span>
                    </button>

                    <button
                      className="landing-secondary"
                      onClick={() => setPage('signup')}
                    >
                      Create Account
                    </button>
                  </div>

                  <div className="landing-note">
                    Discover. Read. Grow.
                  </div>
                </div>

                <div className="landing-art">
                  <div className="art-circle"></div>
                  <div className="book book-one">BOOK</div>
                  <div className="book book-two">READ</div>
                  <div className="book book-three">LEARN</div>
                  <div className="art-caption">
                    <span>✦</span> A world of knowledge awaits
                  </div>
                </div>
              </section>
            )}

            {page === 'login' && (
              <>
                <Login onLogin={handleLogin} />
                <div className="auth-navigation">
                  <button onClick={() => setPage('signup')}>
                    Create Account
                  </button>
                  <button onClick={() => setPage('home')}>
                    Back to Home
                  </button>
                </div>
              </>
            )}

            {page === 'signup' && (
              <>
                <Signup />
                <div className="auth-navigation">
                  <button onClick={() => setPage('login')}>
                    Already have an account? Login
                  </button>
                  <button onClick={() => setPage('home')}>
                    Back to Home
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </main>

      <footer>
        <p>© 2026 LibraX. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
