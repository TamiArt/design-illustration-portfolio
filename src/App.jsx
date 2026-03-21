import { NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JournalPage from './pages/JournalPage';
import ContactsPage from './pages/ContactsPage';

const SHOW_HOME_EVENT = 'portfolio:show-home';

function SiteHeader() {
  function handleHomeClick() {
    window.dispatchEvent(new Event(SHOW_HOME_EVENT));
  }

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" onClick={handleHomeClick}>
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4.2 4.9 9.8v8.3c0 .5.4 1 .9 1H10v-4.4c0-.5.4-.9.9-.9h2.2c.5 0 .9.4.9.9v4.4h4.2c.5 0 .9-.5.9-1V9.8L12 4.2Zm0 2.1 4.9 3.9v7H15v-3.8c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5v3.8H7.1v-7L12 6.3Z" />
          </svg>
        </span>
        <div>
          <strong>Татьяна Ципелева | arTami</strong>
          <span>Художник • Дизайнер визуальных решений</span>
        </div>
      </NavLink>

      <nav className="site-nav" aria-label="Основная навигация">
        <NavLink
          className={({ isActive }) =>
            `site-nav__link site-nav__link--cta${isActive ? ' site-nav__link--active' : ''}`
          }
          to="/contacts"
        >
          Контакты
        </NavLink>
      </nav>
    </header>
  );
}

function FloatingAura() {
  return (
    <div className="floating-aura" aria-hidden="true">
      <span className="floating-aura__shape floating-aura__shape--one" />
      <span className="floating-aura__shape floating-aura__shape--two" />
      <span className="floating-aura__shape floating-aura__shape--three" />
    </div>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <FloatingAura />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </div>
  );
}
