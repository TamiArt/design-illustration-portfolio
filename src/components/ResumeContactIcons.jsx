import { contactLinks } from '../data/contact';
import { ContactIcon } from './Icons';

function isExternalLink(href) {
  return href.startsWith('http://') || href.startsWith('https://');
}

export default function ResumeContactIcons({ className = '', compact = false }) {
  return (
    <div
      className={`resume-contact-icons${compact ? ' resume-contact-icons--compact' : ''}${
        className ? ` ${className}` : ''
      }`}
      aria-label="Контакты"
    >
      {contactLinks.map((item) => (
        <a
          key={item.id}
          className={`resume-contact-icons__link resume-contact-icons__link--${item.id}`}
          href={item.href}
          aria-label={item.label}
          title={item.value}
          {...(isExternalLink(item.href) ? { target: '_blank', rel: 'noreferrer' } : {})}
        >
          <ContactIcon type={item.id} />
        </a>
      ))}
    </div>
  );
}
