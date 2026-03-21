import { useId } from 'react';
import { softwareSkills } from '../data/portfolio';

function getToolClass(short) {
  return short.toLowerCase();
}

function ProcreateIcon() {
  const gradientId = useId().replace(/:/g, '');
  const glowId = `${gradientId}-glow`;

  return (
    <svg className="resume-tool-icons__icon-svg" viewBox="0 0 50 50" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="8" y1="35" x2="40" y2="14" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffe681" />
          <stop offset="0.25" stopColor="#ff8f58" />
          <stop offset="0.5" stopColor="#ff5fa2" />
          <stop offset="0.72" stopColor="#9f62ff" />
          <stop offset="1" stopColor="#53d5ff" />
        </linearGradient>
        <linearGradient id={glowId} x1="13" y1="37" x2="38" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <path
        d="M12 35.5c3.5-1 7.2-2.5 10.8-4.9 5.1-3.4 8.3-7.8 11.6-12.1 2.2-2.9 4.2-4.8 5.6-5.9-.5 2.2-1.7 5.2-4.1 8.5-3 4.2-6.6 6.9-10.7 9.3-3.6 2.2-7.6 4-12 5.3-4.2 1.2-7.6 1.7-9.8 1.9 1.8-.9 4.6-2 8.6-2.1Z"
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.6"
      />
      <path
        d="M15.4 36.5c5.6-1.2 10.8-3.4 15.4-6.8 2.6-2 5.7-5 8.6-9"
        stroke={`url(#${glowId})`}
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ToolIcon({ short }) {
  if (short === 'Pr') {
    return <ProcreateIcon />;
  }

  return <span aria-hidden="true">{short}</span>;
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
          <ToolIcon short={skill.short} />
        </div>
      ))}
    </div>
  );
}
