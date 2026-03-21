import { useLayoutEffect } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { journalStories, portfolioSections } from '../data/portfolio';

export default function JournalPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const activeCategory =
    portfolioSections.find((item) => item.id === categoryId) ?? portfolioSections[0];
  const story = journalStories[activeCategory.id];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  return (
    <main className={`page journal-page journal-page--${activeCategory.id}`}>
      <div className="journal-page__frame">
        <section className="journal-hero">
          <div className="journal-copy">
            <span className="eyebrow">Раздел портфолио</span>
            <h1>{activeCategory.title}</h1>
            <p>{story.intro}</p>

            <div className="journal-actions">
              <NavLink className="secondary-link secondary-link--button" to="/">
                Вернуться к дашборду
              </NavLink>
            </div>
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
