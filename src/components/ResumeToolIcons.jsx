import { softwareSkills } from '../data/portfolio';

function getToolClass(short) {
  return short.toLowerCase();
}

const programIconMap = {
  Ai: '/program/ai.png',
  Ps: '/program/ph.png',
  Pr: '/program/pr.png',
  Lr: '/program/lr.png',
};

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
          <img
            className="resume-tool-icons__image"
            src={programIconMap[skill.short]}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}
