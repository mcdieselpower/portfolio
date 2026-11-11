// Navigation remains visible when JavaScript is unavailable.
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const mobile = window.matchMedia('(max-width: 780px)');
function syncMenu() {
  menu.hidden = !mobile.matches;
  nav.hidden = mobile.matches;
  menu.setAttribute('aria-expanded', String(!nav.hidden));
}
menu.addEventListener('click', () => {
  nav.hidden = !nav.hidden;
  menu.setAttribute('aria-expanded', String(!nav.hidden));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && !nav.hidden) {
    nav.hidden = true;
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});
mobile.addEventListener('change', syncMenu);
syncMenu();

// Search the local archive without sending terms to an external service.
const searchForm = document.querySelector('.search-form');
if (searchForm) {
  const input = searchForm.querySelector('input');
  const cards = [...document.querySelectorAll('[data-search]')];
  const status = searchForm.querySelector('.search-status');
  const empty = document.querySelector('.empty-state');
  function filterStories() {
    const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach(card => {
      card.hidden = !terms.every(term => card.dataset.search.includes(term));
      if (!card.hidden) visible++;
    });
    status.textContent = `${visible} ${visible === 1 ? 'story' : 'stories'}${terms.length ? ' found' : ''}`;
    empty.hidden = visible > 0;
  }
  input.addEventListener('input', filterStories);
  searchForm.addEventListener('submit', event => { event.preventDefault(); filterStories(); });
}

// Keep third-party video inactive until the reader chooses to load it.
document.querySelectorAll('.load-video').forEach(button => button.addEventListener('click', () => {
  const stage = button.closest('[data-video]');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${stage.dataset.video}`;
  iframe.title = 'Spider-Man 2018 — video from the original Super Review archive';
  iframe.allow = 'encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  stage.replaceChildren(iframe);
  iframe.focus();
}));
