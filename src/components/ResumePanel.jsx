import {
  artistPanelPortraitImage,
  resumeCreativeFields,
  resumeExperience,
  resumeHighlights,
  resumeProcessSteps,
  resumeServices,
  softwareSkills,
} from '../data/portfolio';
import ResumeToolIcons from './ResumeToolIcons';

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 3.8h6.5L19 8.3v11a1.7 1.7 0 0 1-1.7 1.7H8a1.7 1.7 0 0 1-1.7-1.7V5.5A1.7 1.7 0 0 1 8 3.8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path d="M14.5 3.8v4.5H19" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
      <path
        d="M8.8 15.2h1.1a1.3 1.3 0 1 0 0-2.6H8.8v4.2M13 12.6v4.2M13 16.8h1.2a1.4 1.4 0 0 0 0-2.8H13M16.8 12.6h2.8M16.8 14.6H19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export default function ResumePanel({
  className = '',
  id,
  onPdfExport,
  portraitFetchPriority = 'auto',
}) {
  return (
    <div className={`artist-panel${className ? ` ${className}` : ''}`} id={id}>
      <div className="artist-panel__toolbar">
        <span className="artist-panel__toolbar-chip">Мое резюме</span>
        <div className="artist-panel__toolbar-actions">
          <button
            type="button"
            className="artist-panel__toolbar-pdf"
            onClick={onPdfExport}
          >
            <PdfIcon />
            <span>PDF</span>
          </button>
        </div>
      </div>

      <div className="artist-panel__layout">
        <div className="artist-panel__content">
          <div className="artist-panel__intro">
            <div className="artist-panel__identity">
              <span className="artist-panel__eyebrow">
                Художник • дизайнер визуальных решений
              </span>
              <h1>Татьяна Ципелева</h1>
              <p className="artist-panel__summary">
                Создаю авторские визуальные решения на стыке живописи,
                иллюстрации и интерьерного скетчинга. В работе соединяю
                художественный подход, композиционную точность и продуманную
                подачу результата.
              </p>

              <article className="artist-panel__intro-card">
                <span className="artist-panel__intro-label">Профиль</span>
                <p>
                  Работаю с частными и коммерческими задачами: от картин на
                  заказ и авторских серий до AI-визуалов, скетчей и материалов
                  для digital и print.
                </p>
                <ul className="artist-panel__bullet-list">
                  {resumeServices.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          <div className="artist-panel__meta-grid">
            {resumeHighlights.map((item) => (
              <article className="artist-panel__meta-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>

          <div className="artist-panel__compact-columns">
            <section className="artist-panel__section artist-panel__section--fields">
              <div className="artist-panel__section-head">
                <h2>Направления</h2>
                <p>Основные сферы, в которых я работаю как художник и дизайнер.</p>
              </div>
              <div className="artist-panel__field-grid">
                {resumeCreativeFields.map((field) => (
                  <article className="artist-panel__field-card" key={field}>
                    <span className="artist-panel__field-mark" />
                    <span>{field}</span>
                  </article>
                ))}
              </div>
            </section>

            <div className="artist-panel__compact-stack">
              <section className="artist-panel__section artist-panel__section--formats">
                <div className="artist-panel__section-head">
                  <h2>Форматы работы</h2>
                  <p>Типы задач, в которых я могу быть полезна заказчику.</p>
                </div>
                <div className="artist-panel__experience-grid">
                  {resumeExperience.map((item) => (
                    <article className="artist-panel__experience-card" key={item.title}>
                      <span>{item.label}</span>
                      <strong>{item.title}</strong>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="artist-panel__visual-column">
          <div className="artist-panel__frame">
            <ResumeToolIcons className="artist-panel__contact-stack" />

            <div className="artist-panel__floating artist-panel__floating--badge">
              artami
              <br />
              studio
            </div>

            <div className="artist-panel__portrait-wrap">
              <img
                className="artist-panel__portrait"
                src={artistPanelPortraitImage}
                alt="Авторская портретная работа"
                loading="eager"
                decoding="async"
                fetchpriority={portraitFetchPriority}
              />
            </div>

            <div className="artist-panel__floating artist-panel__floating--controls">
              <button type="button" aria-label="UI element" />
              <button type="button" aria-label="UI element" />
              <button type="button" aria-label="UI element" />
              <button type="button" aria-label="UI element" />
            </div>

            <div className="artist-panel__slider">
              <span />
            </div>
          </div>

          <section className="artist-panel__section artist-panel__section--software artist-panel__section--software-visual">
            <div className="artist-panel__section-head">
              <h2>Инструменты</h2>
              <p>Рабочая среда, в которой я собираю визуальные проекты.</p>
            </div>
            <div className="artist-panel__software-row">
              {softwareSkills.map((skill, index) => (
                <article
                  className={`artist-panel__software-badge${
                    index > 2 ? ' artist-panel__software-badge--dark' : ''
                  }`}
                  key={skill.short}
                >
                  <strong>{skill.short}</strong>
                  <small>{skill.label}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="artist-panel__section artist-panel__section--process artist-panel__section--process-visual">
            <div className="artist-panel__section-head artist-panel__section-head--process">
              <h2>Этапы работы</h2>
              <p>От постановки задачи до финальной визуальной отрисовки.</p>
            </div>
            <div className="artist-panel__process-grid">
              {resumeProcessSteps.map((item) => (
                <article className="artist-panel__process-card" key={item.step}>
                  <span>{item.step} этап</span>
                  <strong>{item.title}</strong>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
