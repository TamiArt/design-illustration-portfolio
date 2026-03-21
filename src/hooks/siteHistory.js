const SITE_HISTORY_KEY = 'portfolio:site-history';
const MAX_SITE_HISTORY_ENTRIES = 24;
const EXCLUDED_PATH_PREFIXES = ['/resume-print'];

function canUseSessionStorage() {
  return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
}

function isTrackedSitePath(sitePath) {
  return !EXCLUDED_PATH_PREFIXES.some(
    (prefix) => sitePath === prefix || sitePath.startsWith(`${prefix}?`) || sitePath.startsWith(`${prefix}#`),
  );
}

function readSiteHistoryEntries() {
  if (!canUseSessionStorage()) {
    return [];
  }

  try {
    const rawValue = window.sessionStorage.getItem(SITE_HISTORY_KEY);
    const parsedValue = rawValue ? JSON.parse(rawValue) : [];

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter((entry) => typeof entry === 'string' && entry.length > 0);
  } catch {
    return [];
  }
}

function writeSiteHistoryEntries(entries) {
  if (!canUseSessionStorage()) {
    return;
  }

  window.sessionStorage.setItem(SITE_HISTORY_KEY, JSON.stringify(entries));
}

export function getSitePath(locationLike) {
  if (typeof locationLike === 'string') {
    return locationLike;
  }

  const pathname = locationLike?.pathname ?? '/';
  const search = locationLike?.search ?? '';
  const hash = locationLike?.hash ?? '';

  return `${pathname}${search}${hash}`;
}

export function recordSiteHistoryEntry(sitePath) {
  if (!canUseSessionStorage() || !isTrackedSitePath(sitePath)) {
    return;
  }

  const entries = readSiteHistoryEntries();

  if (entries.at(-1) === sitePath) {
    return;
  }

  writeSiteHistoryEntries([...entries, sitePath].slice(-MAX_SITE_HISTORY_ENTRIES));
}

export function getPreviousSiteHistoryEntry(currentPath) {
  const entries = readSiteHistoryEntries();

  if (entries.length === 0) {
    return null;
  }

  let currentIndex = entries.lastIndexOf(currentPath);

  if (currentIndex === -1) {
    currentIndex = entries.length;
  }

  for (let index = currentIndex - 1; index >= 0; index -= 1) {
    if (entries[index] !== currentPath) {
      return entries[index];
    }
  }

  return null;
}

export function discardCurrentSiteHistoryEntry(currentPath) {
  const entries = readSiteHistoryEntries();
  const currentIndex = entries.lastIndexOf(currentPath);

  if (currentIndex === -1) {
    return;
  }

  writeSiteHistoryEntries(entries.slice(0, currentIndex));
}

export function navigateToPreviousSiteEntry({
  currentPath,
  navigate,
  fallbackPath = '/',
  onFallback,
}) {
  const previousPath = getPreviousSiteHistoryEntry(currentPath);

  if (previousPath) {
    discardCurrentSiteHistoryEntry(currentPath);
    navigate(previousPath);
    return true;
  }

  if (onFallback) {
    onFallback();
    return false;
  }

  navigate(fallbackPath);
  return false;
}
