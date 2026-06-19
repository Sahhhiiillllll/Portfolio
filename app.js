// ============================================================
// CINEMATIC INTERACTIONS + TECH STACK ICONS
// ============================================================

(function () {
  // ---------- 1. Scroll progress bar ----------
  const progress = document.getElementById('scrollProgress');
  function updateProgress() {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progress) progress.style.width = scrolled + '%';
  }
  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ---------- 2. Cursor spotlight glow ----------
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      glow.classList.add('active');
    }, { passive: true });
    document.addEventListener('mouseleave', () => glow.classList.remove('active'));
  }

  // ---------- 3. Magnetic glow buttons (follow cursor highlight) ----------
  document.querySelectorAll('.btn-primary').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      btn.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
  });

  // ---------- 4. Stagger index for cascading reveal ----------
  document.querySelectorAll('.skills-grid, .projects-grid, .exp-timeline, .edu-timeline, .courses-grid')
    .forEach((group) => {
      const children = group.querySelectorAll(':scope > .reveal');
      children.forEach((child, i) => child.style.setProperty('--stagger', i));
    });

  // ---------- 5. Tech stack icon injection (Devicon-based) ----------
  // Maps visible tag text -> Devicon class. Falls back to a glowing dot if no icon exists.
  const ICON_MAP = {
    'python': 'devicon-python-plain colored',
    'c/c++': 'devicon-cplusplus-plain colored',
    'c++': 'devicon-cplusplus-plain colored',
    'rust': 'devicon-rust-original',
    'matlab': 'devicon-matlab-plain colored',
    'sql (postgresql)': 'devicon-postgresql-plain colored',
    'javascript': 'devicon-javascript-plain colored',
    'typescript': 'devicon-typescript-plain colored',
    'html/css': 'devicon-html5-plain colored',
    'dart': 'devicon-dart-plain colored',
    'latex': 'devicon-latex-original colored',
    'pytorch': 'devicon-pytorch-original colored',
    'tensorflow': 'devicon-tensorflow-original colored',
    'xgboost': 'devicon-python-plain colored',
    'lightgbm': 'devicon-python-plain colored',
    'cirq': 'devicon-python-plain colored',
    'pennylane': 'devicon-python-plain colored',
    'qiskit': 'devicon-python-plain colored',
    'react': 'devicon-react-original colored',
    'next.js': 'devicon-nextjs-plain',
    'node.js': 'devicon-nodejs-plain colored',
    'fastapi': 'devicon-fastapi-plain colored',
    'geopandas': 'devicon-pandas-original colored',
    'pandas': 'devicon-pandas-original colored',
    'numpy': 'devicon-numpy-original colored',
    'matplotlib': 'devicon-python-plain colored',
    'streamlit': 'devicon-python-plain colored',
    'git': 'devicon-git-plain colored',
    'github': 'devicon-github-original',
    'docker': 'devicon-docker-plain colored',
    'google cloud platform (gcp)': 'devicon-googlecloud-plain colored',
    'qgis': 'devicon-python-plain colored',
    'vs code': 'devicon-vscode-plain colored',
    'pycharm': 'devicon-pycharm-plain colored',
    'cursor': 'devicon-visualstudio-plain colored',
    'rest apis': 'devicon-fastapi-plain colored',
    'interactive dashboards': 'devicon-streamlit-original colored'
  };

  document.querySelectorAll('.tag').forEach((tag) => {
    const label = tag.textContent.trim();
    const key = label.toLowerCase();
    const iconClass = ICON_MAP[key];
    const iconEl = document.createElement(iconClass ? 'i' : 'span');
    if (iconClass) {
      iconEl.className = 'tag-icon ' + iconClass;
    } else {
      iconEl.className = 'tag-icon-dot';
    }
    tag.textContent = '';
    tag.appendChild(iconEl);
    tag.appendChild(document.createTextNode(label));
  });
})();
