import { CategoryIcon } from './Icons';
import ResumePanel from './ResumePanel';

export default function DesktopPortfolioStage({
  activeSection,
  activeStory,
  displayCategoryId,
  isOverlayVisible,
  onMenuClick,
  onOpenSection,
  onPreviewSelect,
  openCategoryId,
  sections,
  selectedPreview,
  selectedPreviewIndex,
  themeStyle,
}) {
  function handlePdfExport() {
    document.body.classList.add('pdf-export-mode');

    function handleAfterPrint() {
      document.body.classList.remove('pdf-export-mode');
      window.removeEventListener('afterprint', handleAfterPrint);
    }

    window.addEventListener('afterprint', handleAfterPrint);
    window.print();
  }

  return (
    <section
      className={`linked-stage${isOverlayVisible ? ' linked-stage--open' : ''}`}
      style={themeStyle}
    >
      <aside className="linked-stage__menu">
        <div className="linked-stage__menu-list">
          {sections.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`linked-stage__tab${
                openCategoryId === item.id ? ' linked-stage__tab--active' : ''
              }`}
              onClick={() => onMenuClick(item.id)}
            >
              <span
                className={`linked-stage__tab-icon linked-stage__tab-icon--${item.theme}`}
                title={item.title}
                aria-label={item.title}
              >
                <CategoryIcon type={item.id} />
              </span>
              <span className="linked-stage__tab-copy">
                <strong>{item.title}</strong>
                <small>{item.subtitle}</small>
              </span>
            </button>
          ))}
        </div>
      </aside>

      <div className="linked-stage__stack">
        <ResumePanel
          id="about"
          onPdfExport={handlePdfExport}
          portraitFetchPriority="high"
        />

        {displayCategoryId ? (
          <article
            className={`linked-stage__body linked-stage__body--overlay${
              isOverlayVisible ? ' linked-stage__body--visible' : ''
            }`}
          >
            <div className="linked-stage__body-main" key={activeSection.id}>
              <div className="linked-stage__body-topbar">
                <button type="button" className="linked-stage__open-button" onClick={onOpenSection}>
                  Открыть раздел
                </button>
              </div>

              <div className="linked-stage__feature-layout">
                <div className="linked-stage__visual">
                  <img
                    src={selectedPreview.image}
                    alt={selectedPreview.title}
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                  />
                </div>

                <div className="linked-stage__copy">
                  <h1>{activeSection.title}</h1>
                  <h2>{activeSection.subtitle}</h2>
                  <p>{activeSection.description}</p>
                  <p>{activeStory.intro}</p>
                </div>
              </div>

              <div className="linked-stage__carousel">
                <div className="linked-stage__carousel-track">
                  {activeSection.images.map((entry, index) => (
                    <button
                      key={`${activeSection.id}-${entry.title}`}
                      type="button"
                      className={`linked-stage__carousel-card${
                        selectedPreviewIndex === index ? ' linked-stage__carousel-card--active' : ''
                      }`}
                      onClick={() => onPreviewSelect(index)}
                      aria-pressed={selectedPreviewIndex === index}
                    >
                      <img src={entry.image} alt={entry.title} loading="lazy" decoding="async" />
                      <span className="linked-stage__carousel-copy">
                        <strong>{entry.title}</strong>
                        <small>{entry.label}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
