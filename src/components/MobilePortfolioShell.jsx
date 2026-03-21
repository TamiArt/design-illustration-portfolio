import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  artistMainPhotoImage,
  artistPanelPortraitImage,
  resumeCreativeFields,
} from '../data/portfolio';
import { CategoryIcon, ContactIcon } from './Icons';
import MobileAppHeader from './MobileAppHeader';
import ResumePanel from './ResumePanel';
import ResumeToolIcons from './ResumeToolIcons';

const resumeAboutCopy =
  'Создаю авторские визуалы на стыке живописи, иллюстрации и digital-подачи.';

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 4.2 4.9 9.8v8.3c0 .5.4 1 .9 1H10v-4.4c0-.5.4-.9.9-.9h2.2c.5 0 .9.4.9.9v4.4h4.2c.5 0 .9-.5.9-1V9.8L12 4.2Zm0 2.1 4.9 3.9v7H15v-3.8c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5v3.8H7.1v-7L12 6.3Z" />
    </svg>
  );
}

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
  onPdfExport,
  onPreviewSelect,
  sections,
  selectedPreview,
  selectedPreviewIndex,
  themeStyle,
}) {
  const isHomeState = !displayCategoryId;
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isResumeVisible, setIsResumeVisible] = useState(false);
  const highlightedFields = resumeCreativeFields.slice(0, 4);

  useEffect(() => {
    if (!isHomeState) {
      setIsMenuVisible(false);
      setIsResumeVisible(false);
    }
  }, [isHomeState]);

  function handleOpenMenu() {
    setIsResumeVisible(false);
    setIsMenuVisible(true);
  }

  function handleOpenResume(event) {
    event.stopPropagation();
    setIsMenuVisible(false);
    setIsResumeVisible(true);
  }

  function handleCloseResume() {
    setIsResumeVisible(false);
  }

  function handleHomeVisualKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOpenMenu();
    }
  }

  function handleCloseMenu() {
    setIsMenuVisible(false);
  }

  function handleOpenCategory(categoryId) {
    setIsResumeVisible(false);
    setIsMenuVisible(false);
    onMenuClick(categoryId);
  }

  function handleHomePdfClick(event) {
    event.stopPropagation();
    onPdfExport();
  }

  function handleGoBack() {
    onCloseOverlay();
  }

  function handleShowHome() {
    setIsMenuVisible(false);
    setIsResumeVisible(false);
    onCloseOverlay();
  }

  if (isHomeState && isResumeVisible) {
    return (
      <section className="mobile-shell mobile-shell--detail-screen" style={themeStyle}>
        <div className="mobile-shell__device">
          <div className="mobile-shell__detail-stage mobile-shell__detail-stage--resume">
            <MobileAppHeader onBack={handleCloseResume} onHome={handleShowHome} />

            <div className="mobile-shell__resume-fullscreen">
              <ResumePanel onPdfExport={onPdfExport} portraitFetchPriority="high" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isHomeState && !isMenuVisible) {
    return (
      <section className="mobile-shell mobile-shell--home" style={themeStyle}>
        <div className="mobile-shell__device mobile-shell__device--home">
          <div className="mobile-shell__home-screen">
            <div className="mobile-shell__header">
              <Link className="mobile-shell__brand" to="/">
                <span className="mobile-shell__brand-mark" aria-hidden="true">
                  <HomeIcon />
                </span>
                <div className="mobile-shell__brand-copy">
                  <strong>Татьяна Ципелева | arTami</strong>
                  <small>Художник • Дизайнер визуальных решений</small>
                </div>
              </Link>
              <Link className="mobile-shell__header-action" to="/contacts">
                Контакты
              </Link>
            </div>

            <div className="mobile-shell__home-body">
              <span className="mobile-shell__home-eyebrow">
                Художник • Дизайнер визуальных решений
              </span>

              <div
                className="mobile-shell__home-visual-trigger"
                role="button"
                tabIndex={0}
                onClick={handleOpenMenu}
                onKeyDown={handleHomeVisualKeyDown}
                aria-label="Открыть меню"
              >
                <div className="artist-panel__frame mobile-shell__home-frame">
                  <button
                    type="button"
                    className="mobile-shell__home-pdf-button"
                    onClick={handleHomePdfClick}
                    aria-label="Открыть полноценное резюме в PDF"
                  >
                    PDF
                  </button>

                  <ResumeToolIcons className="artist-panel__contact-stack mobile-shell__home-tool-stack" />

                  <div className="artist-panel__floating artist-panel__floating--badge">
                    artami
                    <br />
                    studio
                  </div>

                  <button
                    type="button"
                    className="mobile-shell__home-resume-trigger"
                    onClick={handleOpenResume}
                    aria-label="Просмотреть резюме"
                  >
                    Просмотреть резюме
                  </button>

                  <div className="artist-panel__portrait-wrap">
                    <img
                      className="artist-panel__portrait"
                      src={artistPanelPortraitImage}
                      alt="Татьяна Ципелева"
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                    />
                  </div>

                  <div className="artist-panel__floating artist-panel__floating--controls" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>

              <div className="mobile-shell__home-footer">
                <div className="mobile-shell__home-about">
                  <span>Обо мне</span>
                  <p>{resumeAboutCopy}</p>
                </div>

                <div className="mobile-shell__home-side">
                  <div className="mobile-shell__home-photo">
                    <img
                      src={artistMainPhotoImage}
                      alt="Татьяна Ципелева"
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  <button
                    type="button"
                    className="mobile-shell__home-next"
                    onClick={handleOpenMenu}
                    aria-label="Открыть меню"
                  >
                    <ArrowIcon />
                  </button>
                </div>
              </div>
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
            <MobileAppHeader className="mobile-shell__menu-topbar" onBack={handleCloseMenu} onHome={handleShowHome} />

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
          <MobileAppHeader onBack={handleGoBack} onHome={handleShowHome} />

          <article className="mobile-shell__panel mobile-shell__panel--detail">
            <div className="mobile-shell__panel-glow" aria-hidden="true" />

            <div className="mobile-shell__panel-topbar">
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
