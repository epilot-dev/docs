// Opens the Pricing Playground sidebar link in a new tab.
// Docusaurus sidebar `link` items don't support target="_blank" natively.

if (typeof window !== 'undefined') {
  const PLAYGROUND_PATH = '/pricing-playground/';

  const observer = new MutationObserver(() => {
    document.querySelectorAll('.menu__link[href*="' + PLAYGROUND_PATH + '"]').forEach((link) => {
      if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}
