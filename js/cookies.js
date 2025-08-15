/*!
 * Financial Pulse — Cookie Consent (vanilla, clean)
 * localStorage KEY: "fp_cookie_consent": {"v":"all"|"necessary","ts":<ms>}
 * Language auto: localStorage.fpLang || <html lang>
 * Public API: window.fpCookies.open(), .reset(), .status()
 */

(function () {
  // ===== Config & constants =====
  const KEY = 'fp_cookie_consent';
  const LANG_KEY = 'fpLang';
  const DEFAULT_TTL_DAYS = 180;
  const cfg = window.fpCookiesConfig || {};
  const ttlDays = Number.isFinite(cfg.ttlDays) ? cfg.ttlDays : DEFAULT_TTL_DAYS;
  const policyUrl = cfg.policyUrl || 'legal/privacy.html';

  // Language
  const docLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
  let storedLang = '';
  try { storedLang = (localStorage.getItem(LANG_KEY) || '').toLowerCase(); } catch {}
  const lang = (storedLang.startsWith('hr') || docLang.startsWith('hr')) ? 'hr' : 'en';

  const TEXTS = {
    en: {
      msg: `We use cookies to run the site and, with your consent, for analytics. You can change your choice anytime in`,
      link: `Privacy & Cookies`,
      reject: `Reject non-essential`,
      accept: `Accept all`,
      saved: `Cookie preference saved.`
    },
    hr: {
      msg: `Koristimo kolačiće za funkcioniranje stranice i, uz vašu privolu, za analitiku. Svoj odabir možete promijeniti u`,
      link: `Privatnost i kolačići`,
      reject: `Odbij nenužne`,
      accept: `Prihvati sve`,
      saved: `Postavke kolačića spremljene.`
    }
  };

  // ===== Utils =====
  const now = () => Date.now();
  const daysToMs = d => d * 24 * 60 * 60 * 1000;

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
    catch { return null; }
  }
  function setConsent(v) {
    localStorage.setItem(KEY, JSON.stringify({ v, ts: now() }));
  }
  function isExpired(obj) {
    if (!obj || !obj.ts) return true;
    return (now() - obj.ts) > daysToMs(ttlDays);
  }

  // ===== CSS inject (scoped force-dark, aligns with site tokens) =====
  function injectCSS() {
    let style = document.getElementById('fp-cookie-css');
    const css = `
#fpCookieBanner{
  position:fixed;left:0;right:0;bottom:0;z-index:9998;

  /* Scoped DARK tokens (independent of page theme) */
  --color-text:#e6eaf2;
  --color-muted:#9aa4b2;
  --color-card:#121826;
  --color-card-border:#1a2234;
  --color-brand:#39d98a;
  --color-brand-2:#3da7ff;
  color-scheme: dark;

  background: var(--color-card);
  border-top:1px solid var(--color-card-border);
  box-shadow:0 -6px 20px rgba(0,0,0,.3)
}
#fpCookieBanner .inner{
  max-width:980px;margin:0 auto;padding:14px 16px;
  display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap
}
#fpCookieBanner p{
  margin:0;color:var(--color-muted);line-height:1.5;flex:1 1 560px
}
#fpCookieBanner a{ color:var(--color-brand-2);text-decoration:underline }
#fpCookieBanner .actions{ display:flex;gap:8px;flex:0 0 auto }
#fpCookieBanner button{
  padding:8px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.25);
  background:transparent;color:var(--color-text);cursor:pointer
}
#fpCookieBanner .accept{
  background:var(--color-brand);border-color:rgba(57,217,138,.35);
  color:#0f1512;font-weight:700
}
#fpCookieBanner[hidden]{ display:none }
#fpCookieBanner .sr-only{
  position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;
  clip:rect(0,0,0,0);white-space:nowrap;border:0
}
@media (max-width:480px){ #fpCookieBanner .inner{ padding:12px } }
    `.trim();

    if (style) { style.textContent = css; return; }
    style = document.createElement('style');
    style.id = 'fp-cookie-css';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ===== DOM create =====
  function createBanner() {
    const existing = document.getElementById('fpCookieBanner');
    if (existing) return existing;

    const t = TEXTS[lang] || TEXTS.en;

    const wrap = document.createElement('div');
    wrap.id = 'fpCookieBanner';
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', 'Cookie consent');

    wrap.innerHTML = `
      <div class="inner">
        <p>${t.msg} <a href="${policyUrl}" rel="noopener noreferrer" target="_blank">${t.link}</a>.</p>
        <div class="actions">
          <button type="button" class="reject">${t.reject}</button>
          <button type="button" class="accept">${t.accept}</button>
        </div>
        <span class="sr-only" role="status" aria-live="polite"></span>
      </div>
    `;

    document.body.appendChild(wrap);

    const live = wrap.querySelector('.sr-only');
    const acceptBtn = wrap.querySelector('.accept');
    const rejectBtn = wrap.querySelector('.reject');

    acceptBtn?.addEventListener('click', () => {
      setConsent('all');
      announce(live, t.saved);
      hide();
      safeLoadAnalytics();
      safeCall(cfg.onAcceptAll);
    });
    rejectBtn?.addEventListener('click', () => {
      setConsent('necessary');
      announce(live, t.saved);
      hide();
      safeCall(cfg.onReject);
    });

    return wrap;
  }

  function announce(node, text){
    if (!node) return;
    node.textContent = text;
    // reset after a tick to allow repeated announcements
    setTimeout(() => { node.textContent = ''; }, 1000);
  }

  function safeCall(fn) { try { typeof fn === 'function' && fn(); } catch {} }

  let ANALYTICS_LOADED = false;
  function safeLoadAnalytics() {
    if (ANALYTICS_LOADED) return;
    ANALYTICS_LOADED = true;

    if (typeof cfg.loadAnalytics === 'function') {
      return safeCall(cfg.loadAnalytics);
    }
    // Example GA4 loader (keep commented)
    /*
    const id = 'G-XXXXXXX';
    const s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', id, { anonymize_ip: true });
    */
  }

  // ===== Show/Hide =====
  let lastActive = null;
  function show() {
    injectCSS();
    const banner = createBanner();
    lastActive = document.activeElement;
    banner.hidden = false;
    banner.querySelector('.accept')?.focus();
  }
  function hide() {
    const banner = document.getElementById('fpCookieBanner');
    if (banner) banner.hidden = true;
    if (lastActive && typeof lastActive.focus === 'function') lastActive.focus();
  }

  // ===== Init =====
  function init() {
    const c = getConsent();
    if (c && !isExpired(c)) {
      if (c.v === 'all') safeLoadAnalytics();
      return; // no banner
    }
    show();
  }

  // ===== API =====
  window.addEventListener('fp:openCookies', show);
  window.fpCookies = {
    open: show,
    reset: function(){ localStorage.removeItem(KEY); show(); },
    status: function(){ return getConsent(); }
  };

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

