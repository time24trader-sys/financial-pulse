// app.js (clean)

// ===== Config (from window.CONFIG with fallbacks) =====
const CFG = window.CONFIG || {};
const X_HANDLE = CFG.X_HANDLE || 'time24trader';
const SUBSTACK_URL = CFG.SUBSTACK_URL || 'https://financialpulse24.substack.com';
const EMAIL = CFG.EMAIL || 'time24trader@gmail.com';
const ARTICLES_LIMIT = CFG.ARTICLES_LIMIT || 4; // za kasnije ako treba

// ===== Helpers =====
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => root.querySelectorAll(sel);

// ===== Init =====
function init() {
  initLinks();
  setYear();
  loadArticles('#articlesContainer');
  setupThemeToggle();
  setupSmoothScroll();
  setupContactForm();
  setupDisclaimer();
}

// ----- Links / Meta -----
function initLinks() {
  $('#xLink')?.setAttribute('href', `https://x.com/${X_HANDLE}`);
  $('#xLink2')?.setAttribute('href', `https://x.com/${X_HANDLE}`);
  $('#xLink3')?.setAttribute('href', `https://x.com/${X_HANDLE}`);

  $('#substackLink')?.setAttribute('href', SUBSTACK_URL);
  $('#substackLink2')?.setAttribute('href', SUBSTACK_URL);

  const emailLinkEl = $('#emailLink');
  if (emailLinkEl && EMAIL) {
    emailLinkEl.setAttribute('href', `mailto:${EMAIL}?subject=Financial%20Pulse%20Inquiry`);
  }
}

function setYear() {
  const y = $('#year');
  if (y) {
    const yr = new Date().getFullYear();
    y.setAttribute('datetime', yr);
    y.textContent = yr;
  }
}

// ----- Articles -----
async function loadArticles(mountSelector) {
  const mount = $(mountSelector);
  if (!mount) return;
  try {
    const res = await fetch('articles.html');
    if (!res.ok) throw new Error('Failed to load articles');
    mount.innerHTML = await res.text();
  } catch (err) {
    console.error(err);
    mount.innerHTML = '<p>Could not load articles right now.</p>';
  }
}

// ----- Theme toggle -----
function setupThemeToggle() {
  const btn = $('#modeToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch {}
  });
}

// ----- Smooth scroll with header offset -----
function setupSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const HEADER_OFFSET = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
      // Omogući fokus i stavi ga nakon skrola (bolje za čitače ekrana)
        target.setAttribute('tabindex','-1');
        setTimeout(()=> target.focus({preventScroll:true}), 300);
    });
  });
}

// ----- Contact form (mailto fallback) -----
function setupContactForm() {
  const form = $('#contactForm');
  const msg  = $('#formMsg');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    // Mailto fallback ako nema action
    if (!form.action) {
      e.preventDefault();
      const body = encodeURIComponent(
        `Name: ${form.name.value}\nEmail: ${form.email.value}\n\n${form.message.value}`
      );
      window.location.href = `mailto:${EMAIL}?subject=Financial%20Pulse%20Inquiry&body=${body}`;
      if (msg) msg.textContent = 'Opening your email client…';
      return;
    }

    // Inače, POST
    e.preventDefault();
    if (msg) msg.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (!res.ok) throw new Error('Submit error');
      if (msg) msg.textContent = 'Thanks! I’ll get back to you shortly.';
      form.reset();
    } catch (err) {
      if (msg) msg.textContent = 'Could not send right now. Please email me directly.';
    }
  });
}

// ----- Disclaimer modal (EN/HR + session) -----
function setupDisclaimer() {
  const modal = $('#disclaimerModal');
  if (!modal) return;

  const chk = $('#discAgreeChk', modal);
  const btn = $('#discAcceptBtn', modal);
  const langBtns = $$('.lang-btn', modal);

  const LANG_KEY = 'fpLang'; // 'en' | 'hr'
  const DISC_STORAGE = 'session'; // 'session' | 'local'
  const DISC_KEY = 'fpDisclaimerAccepted';
  const DISC_DAYS = 30; // for 'local'

  const I18N = {
    en: {
      title: 'Disclaimer',
      p1: `<strong>Educational only — not advice.</strong> Financial Pulse provides general market education and commentary. Nothing here is financial, investment, tax, accounting, or legal advice, nor a recommendation to buy, sell, or hold any security or digital asset. Content is not tailored to your circumstances and must not be relied upon as a personal recommendation.`,
      p2: `<strong>Risks.</strong> Trading and investing in securities and cryptocurrencies involve substantial risk, including possible loss of principal. Past performance is not indicative of future results. Always do your own research and use your own judgment.`,
      p3: `<strong>Disclosures.</strong> The author may share personal trades/actions for illustration; these reflect the author’s own portfolio, risk tolerance, and knowledge and should not be copied. The author is not a licensed financial adviser or registered investment adviser. No adviser–client relationship is created.`,
      ackLabel: 'I have read and understand this disclaimer.',
      accept: 'Accept & Continue',
      readFull: 'Read full disclaimer',
    },
    hr: {
      title: 'Odricanje od odgovornosti',
      p1: `<strong>Samo u obrazovne svrhe — nije savjet.</strong> Financial Pulse pruža opće obrazovanje i komentar o tržištu. Ništa ovdje ne predstavlja financijski, investicijski, porezni, računovodstveni ili pravni savjet, niti preporuku za kupnju, prodaju ili držanje bilo kojeg vrijednosnog papira ili kriptoimovine. Sadržaj nije prilagođen vašim okolnostima i ne smije se smatrati osobnom preporukom.`,
      p2: `<strong>Rizici.</strong> Ulaganje i trgovanje vrijednosnim papirima i kriptoimovinom nose znatan rizik, uključujući mogući gubitak uloženog kapitala. Prošla izvedba nije jamstvo budućih rezultata. Uvijek provedite vlastito istraživanje i donosite vlastite odluke.`,
      p3: `<strong>Objave.</strong> Autor može dijeliti vlastite transakcije u edukativne svrhe; one odražavaju autorov portfelj, sklonost riziku i znanje i ne bi se trebale kopirati. Autor nije licencirani financijski savjetnik niti registrirani investicijski savjetnik. Ovim se ne uspostavlja odnos savjetnik–klijent.`,
      ackLabel: 'Pročitao/la sam i razumijem ovo odricanje od odgovornosti.',
      accept: 'Prihvaćam i nastavljam',
      readFull: 'Pročitaj puni disclaimer',
    }
  };

  // Storage helpers
  const now = () => Date.now();
  const days = (n) => n * 24 * 60 * 60 * 1000;

  function isAccepted() {
    if (DISC_STORAGE === 'session') {
      return sessionStorage.getItem(DISC_KEY) === '1';
    } else {
      try {
        const raw = localStorage.getItem(DISC_KEY);
        if (!raw) return false;
        const { ts } = JSON.parse(raw);
        return (now() - ts) <= days(DISC_DAYS);
      } catch {
        return false;
      }
    }
  }
  function markAccepted() {
    if (DISC_STORAGE === 'session') {
      sessionStorage.setItem(DISC_KEY, '1');
    } else {
      localStorage.setItem(DISC_KEY, JSON.stringify({ ts: now() }));
    }
  }

  // i18n
  function applyI18n(lang = 'en') {
    const dict = I18N[lang] || I18N.en;

    const titleEl = modal.querySelector('[data-i18n="title"]');
    const p1 = modal.querySelector('[data-i18n="p1"]');
    const p2 = modal.querySelector('[data-i18n="p2"]');
    const p3 = modal.querySelector('[data-i18n="p3"]');
    const ack = modal.querySelector('[data-i18n="ackLabel"]');
    const accept = modal.querySelector('[data-i18n="accept"]');
    const readFull = modal.querySelector('[data-i18n="readFull"]');

    if (titleEl) titleEl.textContent = dict.title;
    if (p1) p1.innerHTML = dict.p1;
    if (p2) p2.innerHTML = dict.p2;
    if (p3) p3.innerHTML = dict.p3;
    if (ack) ack.textContent = dict.ackLabel;
    if (accept) accept.textContent = dict.accept;
    if (readFull) readFull.textContent = dict.readFull;

    langBtns.forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false'));
    try { localStorage.setItem(LANG_KEY, lang); } catch {}
  }

  function initLang() {
    let stored;
    try { stored = localStorage.getItem(LANG_KEY); } catch {}
    const def = stored || (navigator.language?.toLowerCase().startsWith('hr') ? 'hr' : 'en');
    applyI18n(def);
  }

  langBtns.forEach(b => b.addEventListener('click', () => applyI18n(b.dataset.lang)));

  // Focus trap
  const focusableSelector =
    'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
  let lastActive = null;
  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    const nodes = Array.from(modal.querySelectorAll(focusableSelector));
    if (!nodes.length) return;
    const first = nodes[0];
    const last  = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  // Open/Close
  function openDisclaimer() {
    if (!modal || isAccepted() || modal.hidden === false) return;
    modal.hidden = false;
    document.body.classList.add('disc-lock');
    lastActive = document.activeElement;

    initLang();

    if (btn) btn.disabled = !(chk && chk.checked);

    setTimeout(() => (chk || btn)?.focus(), 0);
    modal.addEventListener('keydown', trapFocus);
  }
  function closeDisclaimer() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('disc-lock');
    modal.removeEventListener('keydown', trapFocus);
    if (lastActive && typeof lastActive.focus === 'function') lastActive.focus();
  }

  // Events
  chk?.addEventListener('change', () => { if (btn) btn.disabled = !chk.checked; });
  btn?.addEventListener('click', () => {
    if (!chk?.checked) return;
    markAccepted();
    closeDisclaimer();
  });

  // ESC closes only if checkbox checked (tvoja logika)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden && chk?.checked) {
      e.preventDefault();
      btn?.click();
    }
  });

  // Auto-open
  openDisclaimer();
}

// ===== Start =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}




