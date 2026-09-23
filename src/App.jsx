import { NavLink, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from './i18n';
import ContactsPage from './pages/ContactsPage';
import HomePage from './pages/HomePage';
import { getSitePath, recordSiteHistoryEntry } from './hooks/siteHistory';
import JournalPage from './pages/JournalPage';
import ResumePrintPage from './pages/ResumePrintPage';

const SHOW_HOME_EVENT = 'portfolio:show-home';

function SiteHeader() {
  const { language, setLanguage } = useLanguage();
  function handleHomeClick() {
    window.dispatchEvent(new Event(SHOW_HOME_EVENT));
  }

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" onClick={handleHomeClick}>
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M7.25 10.17 12 6.35l4.75 3.82v6.16a1.1 1.1 0 0 1-1.1 1.1h-2.42v-3.48h-2.46v3.48H8.35a1.1 1.1 0 0 1-1.1-1.1v-6.16Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
        </span>
        <div>
          <strong>{language === 'en' ? 'Tatiana Tsipeleva | arTami' : 'Татьяна Ципелева | arTami'}</strong>
          <span>{language === 'en' ? 'Artist • Visual Designer' : 'Художник • Дизайнер визуальных решений'}</span>
        </div>
      </NavLink>

      <nav className="site-nav" aria-label={language === 'ru' ? 'Основная навигация' : 'Main navigation'}>
        <div className="language-switcher" role="group" aria-label={language === 'ru' ? 'Выбор языка' : 'Language selector'}>
          <button
            type="button"
            className={language === 'ru' ? 'language-switcher__button language-switcher__button--active' : 'language-switcher__button'}
            onClick={() => setLanguage('ru')}
            aria-pressed={language === 'ru'}
          >
            RU
          </button>
          <span className="language-switcher__divider" aria-hidden="true">/</span>
          <button
            type="button"
            className={language === 'en' ? 'language-switcher__button language-switcher__button--active' : 'language-switcher__button'}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
        </div>
        <NavLink
          className={({ isActive }) =>
            `site-nav__link site-nav__link--cta${isActive ? ' site-nav__link--active' : ''}`
          }
          to="/contacts"
        >
          {language === 'en' ? 'Contact' : 'Контакты'}
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
  const location = useLocation();
  const isResumePrintPage = location.pathname === '/resume-print';

  useEffect(() => {
    recordSiteHistoryEntry(getSitePath(location));
  }, [location]);

  return (
    <LanguageProvider>
      <div className={`app-shell${isResumePrintPage ? ' app-shell--resume-print' : ''}`}>
      {isResumePrintPage ? null : <FloatingAura />}
      {isResumePrintPage ? null : (
        <SiteHeader />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/resume-print" element={<ResumePrintPage />} />
      </Routes>
      </div>
    </LanguageProvider>
  );
}
