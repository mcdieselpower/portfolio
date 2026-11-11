// Progressive enhancement: navigation stays visible if JavaScript is unavailable.
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 740px)');
function syncNavigation() {
  menu.hidden = !mobile.matches;
  navigation.hidden = mobile.matches;
  menu.setAttribute('aria-expanded', String(!navigation.hidden));
}
menu.addEventListener('click', () => {
  navigation.hidden = !navigation.hidden;
  menu.setAttribute('aria-expanded', String(!navigation.hidden));
});
navigation.addEventListener('click', event => {
  if (mobile.matches && event.target.closest('a')) {
    navigation.hidden = true;
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && !navigation.hidden) {
    navigation.hidden = true;
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});
mobile.addEventListener('change', syncNavigation);
syncNavigation();
