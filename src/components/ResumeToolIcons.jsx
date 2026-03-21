import { softwareSkills } from '../data/portfolio';

function getToolClass(short) {
  return short.toLowerCase();
}

function ProcreateMark() {
  return (
    <svg className="resume-tool-icons__icon-svg" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="procreate-gradient-a" x1="12" y1="50" x2="49" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f6eb8d" />
          <stop offset="0.22" stopColor="#74f2a7" />
          <stop offset="0.48" stopColor="#39d8ff" />
          <stop offset="0.78" stopColor="#8e49ff" />
          <stop offset="1" stopColor="#ff50ba" />
        </linearGradient>
        <linearGradient id="procreate-gradient-b" x1="16" y1="51" x2="51" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff0a0" />
          <stop offset="0.2" stopColor="#86efb8" />
          <stop offset="0.44" stopColor="#5ec8ff" />
          <stop offset="0.76" stopColor="#ff5aa7" />
          <stop offset="1" stopColor="#7e52ff" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="59" height="59" rx="16" fill="#232323" />
      <rect x="2.5" y="2.5" width="59" height="59" rx="16" stroke="rgba(255,255,255,0.08)" />
      <path
        d="M14 49c6-15 14.7-25.9 33.4-38.8"
        stroke="url(#procreate-gradient-a)"
        strokeLinecap="round"
        strokeWidth="8"
      />
      <path
        d="M16.5 49.5c10-7 20.4-14 33.1-31.4"
        stroke="url(#procreate-gradient-b)"
        strokeLinecap="round"
        strokeWidth="7"
      />
      <path
        d="M21 47.8c8.7-1.7 18.1-7.1 27.8-18.1"
        stroke="url(#procreate-gradient-a)"
        strokeLinecap="round"
        strokeWidth="5"
        opacity="0.92"
      />
    </svg>
  );
}

function renderToolContent(short) {
  if (short === 'Pr') {
    return <ProcreateMark />;
  }

  return <span>{short}</span>;
}

export default function ResumeToolIcons({ className = '' }) {
  return (
    <div
      className={`resume-tool-icons${className ? ` ${className}` : ''}`}
      aria-label="Рабочие приложения"
    >
      {softwareSkills.map((skill) => (
        <div
          key={skill.short}
          className={`resume-tool-icons__item resume-tool-icons__item--${getToolClass(skill.short)}`}
          title={skill.label}
          aria-label={skill.label}
        >
          {renderToolContent(skill.short)}
        </div>
      ))}
    </div>
  );
}
