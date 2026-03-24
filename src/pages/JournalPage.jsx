import { useLayoutEffect } from 'react';
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import MobileAppHeader from '../components/MobileAppHeader';
import { journalStories, portfolioSections } from '../data/portfolio';
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

function UpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 17.5v-11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M7.5 11 12 6.5 16.5 11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function JournalPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const activeCategory =
    portfolioSections.find((item) => item.id === categoryId) ?? portfolioSections[0];
  const story = journalStories[activeCategory.id];
  const currentSitePath = getSitePath(location);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  function handleGoBack() {
    navigateToPreviousSiteEntry({
      currentPath: currentSitePath,
      navigate,
      fallbackPath: '/',
    });
  }

  function handleGoHome() {
    navigate('/');
  }

  function handleScrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className={`page journal-page journal-page--${activeCategory.id}`}>
      <div className="journal-page__frame">
        <MobileAppHeader className="mobile-page-header" />

        <section className="journal-hero">
          <div className="journal-copy">
            <span className="eyebrow">Раздел портфолио</span>
            <h1>{activeCategory.title}</h1>
            <p>{story.intro}</p>
          </div>

          <aside className="journal-note">
            <span className="journal-note__label">{activeCategory.subtitle}</span>
            <p>{activeCategory.description}</p>
          </aside>
        </section>

        <section className="journal-grid" aria-label={`Подборка работ: ${activeCategory.title}`}>
          {story.cards.map((entry, index) => (
            <JournalCard
              key={`${activeCategory.id}-${entry.title}`}
              entry={entry}
              eager={index < 2}
            />
          ))}
          <JournalCard
            entry={{
              type: 'cta',
              size: 'wide',
              title: story.cta.title,
              text: story.cta.text,
            }}
          />
        </section>

        <div className="journal-mobile-footer" aria-label="Быстрая навигация">
          <div className="journal-mobile-footer__plate">
            <button
              type="button"
              className="journal-mobile-footer__button"
              onClick={handleGoBack}
              aria-label="Назад"
            >
              <BackIcon />
            </button>
            <button
              type="button"
              className="journal-mobile-footer__button journal-mobile-footer__button--home"
              onClick={handleGoHome}
              aria-label="На главную"
            >
              <HomeIcon />
            </button>
            <button
              type="button"
              className="journal-mobile-footer__button"
              onClick={handleScrollTop}
              aria-label="Наверх"
            >
              <UpIcon />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function JournalCard({ entry, eager = false }) {
  if (entry.type === 'text') {
    return (
      <article className={`journal-card journal-card--${entry.size} journal-card--text`}>
        <span className="journal-card__pill">{entry.label ?? 'note'}</span>
        <h3>{entry.title}</h3>
        <p>{entry.text}</p>
      </article>
    );
  }

  if (entry.type === 'cta') {
    return (
      <article className={`journal-card journal-card--${entry.size} journal-card--cta`}>
        <div>
          <span className="journal-card__pill">заявка</span>
          <h3>{entry.title}</h3>
          <p>{entry.text}</p>
        </div>
        <NavLink className="primary-button primary-button--light" to="/contacts">
          Обсудить проект
        </NavLink>
      </article>
    );
  }

  return (
    <article className={`journal-card journal-card--${entry.size} journal-card--image`}>
      <img
        src={entry.image}
        alt={entry.title}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={eager ? 'high' : 'auto'}
      />
      <div className="journal-card__content">
        <span className="journal-card__pill">{entry.label ?? 'gallery'}</span>
        <h3>{entry.title}</h3>
        <p>{entry.text}</p>
      </div>
    </article>
  );
}
