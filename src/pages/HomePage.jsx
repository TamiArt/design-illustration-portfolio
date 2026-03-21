import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopPortfolioStage from '../components/DesktopPortfolioStage';
import MobilePortfolioShell from '../components/MobilePortfolioShell';
import ResumePanel from '../components/ResumePanel';
import {
  artistPanelPortraitImage,
  getCategoryThemeStyle,
  journalStories,
  portfolioSections,
} from '../data/portfolio';
import useViewportMatch from '../hooks/useViewportMatch';

const MOBILE_VIEW_QUERY = '(max-width: 760px)';
const SHOW_HOME_EVENT = 'portfolio:show-home';
const OVERLAY_CLOSE_DELAY = 320;

export default function HomePage() {
  const navigate = useNavigate();
  const isMobileView = useViewportMatch(MOBILE_VIEW_QUERY);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [displayCategoryId, setDisplayCategoryId] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState(0);
  const closeTimeoutRef = useRef(null);

  const activeSection =
    portfolioSections.find((item) => item.id === (displayCategoryId ?? openCategoryId)) ??
    portfolioSections[0];
  const activeStory = journalStories[activeSection.id];
  const selectedPreview = activeSection.images[selectedPreviewIndex] ?? activeSection.images[0];
  const isHomeHero = !displayCategoryId;
  const heroCard = isHomeHero
    ? {
        image: artistPanelPortraitImage,
        title: 'Мое резюме',
        category: 'Татьяна Ципелева | arTami',
        text: 'Художник • дизайнер визуальных решений',
        note: 'Обо мне, направления работы и визуальное портфолио',
      }
    : {
        image: selectedPreview.image,
        title: selectedPreview.title,
        category: activeSection.title,
        text: selectedPreview.text,
        note: activeSection.subtitle,
      };
  const mobileProgress = isHomeHero
    ? 84
    : Math.max(18, Math.round(((selectedPreviewIndex + 1) / activeSection.images.length) * 100));
  const themeStyle = getCategoryThemeStyle(activeSection.theme);

  useEffect(() => {
    setSelectedPreviewIndex(0);
  }, [displayCategoryId, openCategoryId]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  function clearCloseTimeout() {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
  }

  function closeOverlay() {
    if (!displayCategoryId && !openCategoryId) {
      return;
    }

    clearCloseTimeout();
    setIsOverlayVisible(false);

    closeTimeoutRef.current = window.setTimeout(() => {
      setOpenCategoryId(null);
      setDisplayCategoryId(null);
    }, OVERLAY_CLOSE_DELAY);
  }

  function openOverlay(categoryId) {
    clearCloseTimeout();
    setDisplayCategoryId(categoryId);
    setOpenCategoryId(categoryId);
    window.requestAnimationFrame(() => {
      setIsOverlayVisible(true);
    });
  }

  useEffect(() => {
    function handleShowHome() {
      closeOverlay();
    }

    window.addEventListener(SHOW_HOME_EVENT, handleShowHome);

    return () => {
      window.removeEventListener(SHOW_HOME_EVENT, handleShowHome);
    };
  }, [displayCategoryId, openCategoryId]);

  function handleMenuClick(categoryId) {
    if (openCategoryId === categoryId && isOverlayVisible) {
      closeOverlay();
      return;
    }

    openOverlay(categoryId);
  }

  function handleOpenSection() {
    navigate(`/journal?category=${activeSection.id}`);
  }

  function handleHeroCardClick() {
    if (displayCategoryId) {
      handleOpenSection();
      return;
    }

    openOverlay(portfolioSections[0].id);
  }

  function handleMobilePdfExport() {
    document.body.classList.add('pdf-export-mode');

    function handleAfterPrint() {
      document.body.classList.remove('pdf-export-mode');
      window.removeEventListener('afterprint', handleAfterPrint);
    }

    window.addEventListener('afterprint', handleAfterPrint);
    void document.body.offsetWidth;
    window.print();
  }

  if (isMobileView) {
    return (
      <main className="page home-page home-page--mobile">
        <MobilePortfolioShell
          activeSection={activeSection}
          displayCategoryId={displayCategoryId}
          heroCard={heroCard}
          isOverlayVisible={isOverlayVisible}
          mobileProgress={mobileProgress}
          onCloseOverlay={closeOverlay}
          onHeroCardClick={handleHeroCardClick}
          onMenuClick={handleMenuClick}
          onOpenSection={handleOpenSection}
          onPdfExport={handleMobilePdfExport}
          onPreviewSelect={setSelectedPreviewIndex}
          openCategoryId={openCategoryId}
          sections={portfolioSections}
          selectedPreview={selectedPreview}
          selectedPreviewIndex={selectedPreviewIndex}
          themeStyle={themeStyle}
        />
        <div className="home-page__mobile-print-resume" aria-hidden="true">
          <ResumePanel
            className="home-page__mobile-print-panel"
            onPdfExport={handleMobilePdfExport}
            portraitFetchPriority="high"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="page home-page">
      <DesktopPortfolioStage
        activeSection={activeSection}
        activeStory={activeStory}
        displayCategoryId={displayCategoryId}
        isOverlayVisible={isOverlayVisible}
        onMenuClick={handleMenuClick}
        onOpenSection={handleOpenSection}
        onPreviewSelect={setSelectedPreviewIndex}
        openCategoryId={openCategoryId}
        sections={portfolioSections}
        selectedPreview={selectedPreview}
        selectedPreviewIndex={selectedPreviewIndex}
        themeStyle={themeStyle}
      />
    </main>
  );
}
