
const CONFIG = {
  whatsappNumber: '+27763684516',   
  whatsappText: "Hi FM WebStudio, I'd like a quote for a website.",
  formEndpoint: 'https://formspree.io/f/xbgdnppw' 
};

/* WhatsApp link */
document.getElementById('wa').href =
  `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappText)}`;

/* Mobile menu */
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
function setMenu(open){
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
window.addEventListener('resize', () => { if (innerWidth > 820) setMenu(false); });

/* Highlight current section in nav */
const links = [...menu.querySelectorAll('a:not(.btn)')];
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => io.observe(s));

/* Pricing buttons pre-fill the message, then scroll to contact via their href */
document.querySelectorAll('[data-plan]').forEach(b => b.addEventListener('click', () => {
  const m = document.getElementById('message');
  if (!m.value.trim()) m.value = `Hi, I'm interested in the ${b.dataset.plan} package.`;
}));

/* Form validation */
const form = document.getElementById('form');
const status = document.getElementById('status');
const rules = {
  name:    v => v.trim().length >= 2 || 'Enter your name (at least 2 characters).',
  email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address, like name@example.com.',
  message: v => v.trim().length >= 10 || 'Write a message of at least 10 characters.'
};
function check(id){
  const el = form.elements[id], res = rules[id](el.value);
  const ok = res === true;
  el.closest('.field').classList.toggle('bad', !ok);
  el.setAttribute('aria-invalid', !ok);
  document.getElementById('e-' + id).textContent = ok ? '' : res;
  return ok;
}
Object.keys(rules).forEach(id => form.elements[id].addEventListener('blur', () => check(id)));

form.addEventListener('submit', async e => {
  e.preventDefault();
  status.textContent = '';
  const results = Object.keys(rules).map(check);
  if (results.includes(false)) { form.querySelector('[aria-invalid="true"]').focus(); return; }

  if (!CONFIG.formEndpoint) {
    status.style.color = '#92400e';
    status.textContent = 'Form is valid, but no form service is connected yet. Add one in script.js (CONFIG.formEndpoint).';
    return;
  }
  try {
    const res = await fetch(CONFIG.formEndpoint, {
      method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form)
    });
    if (!res.ok) throw new Error();
    status.style.color = '#166534';
    status.textContent = 'Message sent. Thank you, I will reply soon.';
    form.reset();
  } catch {
    status.style.color = '#b71c1c';
    status.textContent = 'Could not send your message. Please try WhatsApp or email instead.';
  }
});
