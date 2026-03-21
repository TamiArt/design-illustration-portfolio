import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getSitePath, navigateToPreviousSiteEntry } from '../hooks/siteHistory';

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 4.2 4.9 9.8v8.3c0 .5.4 1 .9 1H10v-4.4c0-.5.4-.9.9-.9h2.2c.5 0 .9.4.9.9v4.4h4.2c.5 0 .9-.5.9-1V9.8L12 4.2Zm0 2.1 4.9 3.9v7H15v-3.8c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5v3.8H7.1v-7L12 6.3Z" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15.5 6.5 8.5 12l7 5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function MobileAppHeader({
  className = '',
  contactsTo = '/contacts',
  onBack,
  onHome,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isContactsPage = location.pathname === contactsTo;
  const currentSitePath = getSitePath(location);
  const isHomeRoute = location.pathname === '/' && !location.search && !location.hash;

  function handleBack() {
    navigateToPreviousSiteEntry({
      currentPath: currentSitePath,
      navigate,
      onFallback: onBack,
    });
  }

  function handleHome() {
    if (isHomeRoute && onHome) {
      onHome();
      return;
    }

    navigate('/');
  }

  return (
    <div className={`mobile-shell__detail-header${className ? ` ${className}` : ''}`}>
      <div className="mobile-shell__detail-nav">
        <button
          type="button"
          className="mobile-shell__detail-nav-button mobile-shell__detail-nav-button--back"
          onClick={handleBack}
          aria-label="Назад"
        >
          <BackIcon />
        </button>
        <button
          type="button"
          className="mobile-shell__detail-nav-button mobile-shell__detail-nav-button--home"
          onClick={handleHome}
          aria-label="На главную"
        >
          <HomeIcon />
        </button>
      </div>

      {isContactsPage ? (
        <span
          className="mobile-shell__detail-contact mobile-shell__detail-contact--active"
          aria-current="page"
        >
          Контакты
        </span>
      ) : (
        <Link className="mobile-shell__detail-contact" to={contactsTo}>
          Контакты
        </Link>
      )}
    </div>
  );
}
