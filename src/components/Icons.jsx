export function CategoryIcon({ type }) {
  if (type === 'oil') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.2 18.4c0-2.4 1.9-4.3 4.3-4.3 1.1 0 2 .4 2.8 1 .7.5 1.2.6 2 .6a2.5 2.5 0 0 0 0-5c-.7 0-1.2.2-1.8.5-.8.5-1.7.8-2.8.8A4.2 4.2 0 1 1 15 7.8c0 .8-.2 1.4-.5 2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="m14.8 5.2 4 4M16.2 3.8l4 4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (type === 'ai') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3v4M12 17v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M3 12h4M17 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="12" r="3.3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (type === 'interior') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7.1 10.3a2.4 2.4 0 0 1 2.4-2.4h5a2.4 2.4 0 0 1 2.4 2.4v5.1H7.1v-5.1Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M5.2 12.9c0-1 .8-1.8 1.8-1.8h10c1 0 1.8.8 1.8 1.8v3.5H5.2v-3.5Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <path
          d="M6.6 16.4v2M17.4 16.4v2M9 7.9V6.8M15 7.9V6.8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (type === 'kids') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8.2 8.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm7.6 0a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="13.2" r="5.8" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M9.7 12.8h.1M14.2 12.8h.1"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
        <path
          d="M9.5 15.8c.8.8 1.6 1.1 2.5 1.1s1.7-.3 2.5-1.1"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <path d="M10.8 14.2a1.2 1.2 0 1 0 2.4 0 1.2 1.2 0 1 0-2.4 0Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="17" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 11.2 15.8 7.8M8 12.8l7.8 3.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function InterfaceIcon({ type }) {
  if (type === 'cloud') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8.4 18h7.3a3.3 3.3 0 0 0 .4-6.6 4.7 4.7 0 0 0-9.1-1.2A3.7 3.7 0 0 0 8.4 18Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === 'user') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="9" r="3" fill="currentColor" />
        <path
          d="M6.8 18.2c1.1-2.5 3-3.7 5.2-3.7s4.1 1.2 5.2 3.7"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (type === 'menu') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 8.5h10M9 12h8M11 15.5h6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (type === 'search') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="4.8" stroke="currentColor" strokeWidth="1.8" />
        <path d="m15 15 3.4 3.4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function ContactIcon({ type }) {
  if (type === 'email') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4.2" y="6.4" width="15.6" height="11.2" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="m5.6 8 6.4 5 6.4-5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  if (type === 'telegram') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="m19.8 5.3-2.6 12.5c-.2.9-.8 1.1-1.5.7l-4-3-1.9 1.8c-.2.2-.4.4-.8.4l.3-4.2 7.7-7c.3-.3-.1-.4-.4-.2L7 12.1l-4-1.3c-.9-.3-.9-.9.2-1.3l15.5-6c.7-.3 1.3.2 1.1 1.8Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (type === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.2" cy="7.8" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'x') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 5.5h3.4l3.2 4.5 4-4.5H18l-4.9 5.5 5.3 7.5H15l-3.5-5-4.4 5H5.8l5.3-5.9L6 5.5Z" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'vk') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 7.6c.2 4.7 2.7 8 6.8 8h.2v-2.8c1.6.2 2.8 1.4 3.3 2.8h2.3c-.6-2.3-2.1-3.6-3.1-4.1 1-.6 2.3-2 2.7-3.9H16c-.6 1.5-1.8 2.9-3 3V7.6h-2.1v5.2c-1.3-.3-2.9-2-3-5.2H6Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m20 4-9.5 9.5M20 4l-6.5 16-2.2-6.8L4.5 11 20 4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="7" width="10" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M7 15H6a2 2 0 0 1-2-2V6.2A2.2 2.2 0 0 1 6.2 4H13a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
