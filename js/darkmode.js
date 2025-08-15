const html = document.documentElement;
const toggleBtn = document.getElementById('modeToggle');
const icon = document.getElementById('icon');

const sunIcon = `
  <circle cx="12" cy="12" r="5"/>
  <g stroke="currentColor" stroke-width="2">
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </g>`;

const moonIcon = `
  <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z"/>`;

function setDarkMode(isDark) {
  if (isDark) {
    html.classList.add('dark');
    html.classList.remove('light');
    if (icon) icon.innerHTML = moonIcon;
    localStorage.setItem('darkMode', 'true');
  } else {
    html.classList.remove('dark');
    html.classList.add('light');
    if (icon) icon.innerHTML = sunIcon;
    localStorage.setItem('darkMode', 'false');
  }
}

// Load saved preference
const savedMode = localStorage.getItem('darkMode');
setDarkMode(savedMode === 'true');

// Toggle listener
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    setDarkMode(!isDark);
  });
}

