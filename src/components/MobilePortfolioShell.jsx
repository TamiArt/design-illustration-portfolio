import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { artistMainPhotoImage, resumeCreativeFields } from '../data/portfolio';
import { CategoryIcon, ContactIcon } from './Icons';
import ResumePanel from './ResumePanel';

const resumeAboutCopy =
  'Художник и дизайнер визуальных решений. Создаю авторские визуалы на стыке живописи, иллюстрации и digital-подачи.';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 6.5 16 12l-8 5.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function MobilePortfolioShell({
  activeSection,
  displayCategoryId,
  heroCard,
  onCloseOverlay,
  onMenuClick,
  onOpenSection,
  onPreviewSelect,
  sections,
  selectedPreview,
  selectedPreviewIndex,
  themeStyle,
}) {
  const isHomeState = !displayCategoryId;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const highlightedFields = resumeCreativeFields.slice(0, 4);

  useEffect(() => {
    if (!isHomeState) {
      setIsMenuVisible(false);
    }
  }, [isHomeState]);

  function handleOpenMenu() {
    setIsMenuVisible(true);
  }

  function handleCloseMenu() {
    setIsMenuVisible(false);
  }

  function handleOpenCategory(categoryId) {
    setIsMenuVisible(false);
    onMenuClick(categoryId);
  }

  if (isHomeState && !isMenuVisible) {
    return (
      <section className="mobile-shell mobile-shell--poster" style={themeStyle}>
        <div className="mobile-shell__device mobile-shell__device--poster">
          <div className="mobile-shell__poster">
            <div className="mobile-shell__poster-hero">
              <div className="mobile-shell__poster-page-preview" aria-hidden="true">
                <div className="mobile-shell__poster-page-preview-scale">
                  <ResumePanel className="artist-panel--mobile-preview" onPdfExport={() => {}} />
                </div>
              </div>

              <div className="mobile-shell__poster-circle">
                <img
                  src={artistMainPhotoImage}
                  alt="Татьяна Ципелева"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                />
              </div>

              <div className="mobile-shell__poster-about">
                <span>ОБО МНЕ</span>
                <p>{resumeAboutCopy}</p>
              </div>

              <button
                type="button"
                className="mobile-shell__poster-arrow"
                onClick={handleOpenMenu}
                aria-label="Открыть меню"
              >
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isHomeState && isMenuVisible) {
    return (
      <section className="mobile-shell mobile-shell--poster" style={themeStyle}>
        <div className="mobile-shell__device mobile-shell__device--poster">
          <div className="mobile-shell__menu-screen">
            <div className="mobile-shell__menu-topbar">
              <button
                type="button"
                className="mobile-shell__menu-back"
                onClick={handleCloseMenu}
              >
                Назад
              </button>
              <Link className="mobile-shell__menu-contact" to="/contacts">
                Контакты
              </Link>
            </div>

            <div className="mobile-shell__menu-intro">
              <span>Навигация</span>
              <h2>Выберите раздел</h2>
            </div>

            <div className="mobile-shell__menu-grid">
              {sections.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`mobile-shell__menu-tile mobile-shell__menu-tile--${item.theme}`}
                  onClick={() => handleOpenCategory(item.id)}
                >
                  <span className="mobile-shell__menu-tile-icon">
                    <CategoryIcon type={item.id} />
                  </span>
                  <strong>{item.title}</strong>
                  <small>{highlightedFields[index] ?? item.subtitle}</small>
                </button>
              ))}

              <Link className="mobile-shell__menu-tile mobile-shell__menu-tile--contact" to="/contacts">
                <span className="mobile-shell__menu-tile-icon">
                  <ContactIcon type="email" />
                </span>
                <strong>Контакты</strong>
                <small>Способы связи</small>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mobile-shell mobile-shell--detail-screen" style={themeStyle}>
      <div className="mobile-shell__device">
        <div className="mobile-shell__detail-stage">
          <div className="mobile-shell__detail-header">
            <button type="button" className="mobile-shell__detail-back" onClick={onCloseOverlay}>
              На главную
            </button>
            <Link className="mobile-shell__detail-contact" to="/contacts">
              Контакты
            </Link>
          </div>

          <article className="mobile-shell__panel mobile-shell__panel--detail">
            <div className="mobile-shell__panel-glow" aria-hidden="true" />

            <div className="mobile-shell__panel-topbar">
              <span className="mobile-shell__panel-label">{selectedPreview.label}</span>

              <button
                type="button"
                className="mobile-shell__panel-link"
                onClick={onOpenSection}
              >
                Открыть
              </button>
            </div>

            <div className="mobile-shell__panel-visual">
              <img
                src={selectedPreview.image}
                alt={selectedPreview.title}
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </div>

            <div className="mobile-shell__panel-copy">
              <h1>{activeSection.title}</h1>
              <h2>{activeSection.subtitle}</h2>
              <p>{activeSection.description}</p>
              <p>{selectedPreview.text}</p>
            </div>

            <div className="mobile-shell__panel-thumbs">
              {activeSection.images.slice(0, 4).map((entry, index) => (
                <button
                  key={`${activeSection.id}-mobile-panel-${entry.title}`}
                  type="button"
                  className={`mobile-shell__panel-thumb${
                    selectedPreviewIndex === index ? ' mobile-shell__panel-thumb--active' : ''
                  }`}
                  onClick={() => onPreviewSelect(index)}
                  aria-pressed={selectedPreviewIndex === index}
                >
                  <img src={entry.image} alt={entry.title} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
