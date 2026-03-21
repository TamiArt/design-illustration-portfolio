import { useState } from 'react';
import { contactLinks } from '../data/contact';
import { ContactIcon, CopyIcon } from './Icons';

function isExternalLink(href) {
  return href.startsWith('http://') || href.startsWith('https://');
}

async function copyMessage(text) {
  if (!navigator?.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export default function ContactHub({ className = '', theme = 'light', compact = false }) {
  const [copiedContactId, setCopiedContactId] = useState('');

  async function handleCopyContact(event, item) {
    event.preventDefault();
    event.stopPropagation();

    const isCopied = await copyMessage(item.value);

    if (!isCopied) {
      return;
    }

    setCopiedContactId(item.id);

    window.setTimeout(() => {
      setCopiedContactId((current) => (current === item.id ? '' : current));
    }, 1600);
  }

  return (
    <section
      className={`contact-hub contact-hub--${theme}${compact ? ' contact-hub--compact' : ''}${
        className ? ` ${className}` : ''
      }`}
    >
      <div className="contact-hub__layout">
        <div className="contact-hub__column">
          <div className="contact-hub__head">
            <h3>Способы связи</h3>
            <p>Все ссылки активны: можно сразу перейти в нужный канал и написать мне напрямую.</p>
          </div>

          <div className="contact-hub__list">
            {contactLinks.map((item) => (
              <article key={item.id} className="contact-hub__link">
                <a
                  className="contact-hub__link-main"
                  href={item.href}
                  {...(isExternalLink(item.href)
                    ? { target: '_blank', rel: 'noreferrer' }
                    : {})}
                >
                  <span className={`contact-hub__icon contact-hub__icon--${item.id}`} aria-hidden="true">
                    <ContactIcon type={item.id} />
                  </span>
                  <span className="contact-hub__link-copy">
                    <small>{item.label}</small>
                    <strong>{item.value}</strong>
                  </span>
                  <span className="contact-hub__link-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>

                <span className="contact-hub__link-actions">
                  <button
                    className={`contact-hub__copy-button${
                      copiedContactId === item.id ? ' contact-hub__copy-button--copied' : ''
                    }`}
                    type="button"
                    onClick={(event) => handleCopyContact(event, item)}
                    aria-label={
                      copiedContactId === item.id
                        ? `${item.label} скопирован`
                        : `Скопировать ${item.label}`
                    }
                    title={
                      copiedContactId === item.id
                        ? 'Скопировано'
                        : `Скопировать ${item.value}`
                    }
                  >
                    <CopyIcon />
                  </button>
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
