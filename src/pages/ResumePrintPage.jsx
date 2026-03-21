import { useEffect, useRef } from 'react';
import ResumePanel from '../components/ResumePanel';

const AUTO_PRINT_PARAM = 'autoprint';

function waitForImages(container) {
  const images = Array.from(container.querySelectorAll('img'));

  if (images.length === 0) {
    return Promise.resolve();
  }

  return Promise.all(
    images.map(
      (image) =>
        new Promise((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }

          function handleDone() {
            image.removeEventListener('load', handleDone);
            image.removeEventListener('error', handleDone);
            resolve();
          }

          image.addEventListener('load', handleDone, { once: true });
          image.addEventListener('error', handleDone, { once: true });
        }),
    ),
  );
}

function waitForFonts() {
  if (!document.fonts?.ready) {
    return Promise.resolve();
  }

  return document.fonts.ready.catch(() => undefined);
}

export default function ResumePrintPage() {
  const pageRef = useRef(null);
  const afterPrintHandlerRef = useRef(null);
  const shouldAutoPrint = new URLSearchParams(window.location.search).get(AUTO_PRINT_PARAM) === '1';

  function clearPrintMode() {
    document.body.classList.remove('pdf-export-mode');

    if (afterPrintHandlerRef.current) {
      window.removeEventListener('afterprint', afterPrintHandlerRef.current);
      afterPrintHandlerRef.current = null;
    }
  }

  function handlePdfExport() {
    clearPrintMode();
    document.body.classList.add('pdf-export-mode');

    const handleAfterPrint = () => {
      clearPrintMode();
    };

    afterPrintHandlerRef.current = handleAfterPrint;
    window.addEventListener('afterprint', handleAfterPrint, { once: true });
    window.print();
  }

  useEffect(() => {
    if (!shouldAutoPrint) {
      return () => {
        clearPrintMode();
      };
    }

    let cancelled = false;

    Promise.all([waitForImages(pageRef.current ?? document.body), waitForFonts()]).then(() => {
      if (cancelled) {
        return;
      }

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (!cancelled) {
            const nextUrl = new URL(window.location.href);
            nextUrl.searchParams.delete(AUTO_PRINT_PARAM);
            window.history.replaceState(window.history.state, '', nextUrl);
            handlePdfExport();
          }
        });
      });
    });

    return () => {
      cancelled = true;
      clearPrintMode();
    };
  }, [shouldAutoPrint]);

  return (
    <main className="page home-page home-page--resume-print" ref={pageRef}>
      <ResumePanel portraitFetchPriority="high" onPdfExport={handlePdfExport} />
    </main>
  );
}
