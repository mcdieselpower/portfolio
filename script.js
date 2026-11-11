const projects = {
  beats: { title: 'Beats Magazine — Redesign', intro: 'Revisiting my original music magazine with a clearer, more confident editorial design.', repository: 'Beats', sections: [['The starting point', 'I built the original Beats during my design studies in 2018–2019. The redesign keeps its original music imagery and archive content while simplifying the busy backgrounds, uneven story hierarchy, and small text.'], ['The design', 'Warm off-white and charcoal give the photography room to lead. Orange accents, oversized editorial headlines, rounded images, and consistent spacing connect the homepage and refreshed reading layouts.'], ['The implementation', 'Separate HTML, CSS, and JavaScript files, responsive layouts, a mobile navigation menu, keyboard focus states, and reduced-motion support. The View website link opens the approved archive edition included with this portfolio.'], ['Project context', 'A personal student-project redesign, with no invented performance results. Original placeholder article copy is clearly labeled. The redesigned project is now saved to GitHub.']] },
  super: { title: 'Super Review — Redesign', intro: 'A gaming editorial archive rebuilt with a bold dark layout and a clearer browsing experience.', repository: 'Super-Review-Website', sections: [['The starting point', 'My original 2018 student project used game imagery and editorial categories, but several stories linked only to images and navigation was inconsistent. The redesign preserves that collection while connecting the browsing experience.'], ['The design', 'Dark surfaces, red accents, oversized condensed typography, rounded imagery, and a split hero give the magazine a distinctive gaming identity. Shared styles connect the homepage, section pages, and reading layouts.'], ['The implementation', 'Twenty connected HTML pages, including twelve story entries. JavaScript handles mobile navigation, keyboard closing, local search with an empty state, and a video player that loads on request. Responsive styles and reduced-motion preferences are included.'], ['Project context', 'A personal student-project redesign, now saved to GitHub. Original writing is marked as historical; missing article bodies are identified as archive entries rather than invented reviews. External video availability can change.']] },
  hulu: { title: 'Hulu UI Study', intro: 'A practice project exploring a streaming interface in React.', repository: 'Hulu_clone', sections: [['The project', 'A Hulu interface clone built with a React-based stack. It is an independent learning exercise, with no affiliation with Hulu.'], ['Built with', 'The repository specifies React 17, Next.js 11, Tailwind CSS 2, Heroicons, and React Flip Move.'], ['Context', 'An earlier front-end practice project. The original dependencies need review before a modern production deployment. Source code is available below; a live demo has not been verified.']] }
};
const dialog = document.querySelector('#project-dialog');
let trigger;
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  trigger = button;
  const project = projects[button.dataset.project];
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-intro').textContent = project.intro;
  const content = document.querySelector('#dialog-content');
  content.replaceChildren();
  project.sections.forEach(([heading, copy]) => {
    const h = document.createElement('h3'); h.textContent = heading;
    const p = document.createElement('p'); p.textContent = copy;
    content.append(h, p);
  });
  document.querySelector('#dialog-link').href = `https://github.com/mcdieselpower/${project.repository}`;
  dialog.showModal();
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => trigger?.focus());
document.querySelector('#year').textContent = new Date().getFullYear();

// Paste your Formspree form endpoint here. This is a public form ID, not a secret.
// Keep the receiving email configured in Formspree, never in browser source.
const CONTACT_ENDPOINT = 'https://formspree.io/f/xeagqayk';
const contactForm = document.querySelector('#contact-form');
const contactStatus = document.querySelector('#contact-status');
const sendButton = contactForm.querySelector('[type="submit"]');
const contactReady = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(CONTACT_ENDPOINT);
let sending = false;
if (contactReady) {
  contactForm.action = CONTACT_ENDPOINT;
  sendButton.disabled = false;
  contactStatus.textContent = 'Your name, email, and message will be sent through Formspree to reach me.';
}
contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (!contactReady || sending || !contactForm.reportValidity()) return;
  if (contactForm.elements._gotcha.value) {
    contactStatus.textContent = 'Your message could not be sent. Please reload and try again.';
    return;
  }
  sending = true;
  sendButton.disabled = true;
  sendButton.textContent = 'Sending...';
  contactForm.setAttribute('aria-busy', 'true');
  contactStatus.textContent = 'Sending your message...';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST', body: new FormData(contactForm),
      headers: { Accept: 'application/json' }, signal: controller.signal
    });
    const result = await response.json();
    if (!response.ok || result.ok !== true) throw new Error('Submission rejected');
    contactStatus.textContent = 'Thanks! Your message has been sent.';
    contactForm.reset();
  } catch {
    contactStatus.textContent = 'Delivery could not be confirmed. Your message is still here. Please try again shortly.';
  } finally {
    clearTimeout(timeout);
    sending = false;
    sendButton.disabled = false;
    sendButton.textContent = 'Send message';
    contactForm.removeAttribute('aria-busy');
  }
});

// Scale the real project preview into its card without changing its layout.
const previewCards = document.querySelectorAll('.site-preview');
function sizeProjectPreviews() { previewCards.forEach(card => card.style.setProperty('--preview-scale', card.clientWidth / 1200)); }
sizeProjectPreviews();
if ('ResizeObserver' in window) { const previewObserver = new ResizeObserver(sizeProjectPreviews); previewCards.forEach(card => previewObserver.observe(card)); } else { window.addEventListener('resize', sizeProjectPreviews); }
