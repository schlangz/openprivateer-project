const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const clock = document.getElementById("clock");
function updateClock() {
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("en-GB", {hour12:false});
}
updateClock();
setInterval(updateClock, 1000);


// Screenshot archive lightbox
(() => {
  const shots = [...document.querySelectorAll('.archive-shot')];
  const box = document.getElementById('screenshot-lightbox');
  const image = document.getElementById('lightbox-image');
  const counter = document.getElementById('lightbox-counter');
  if (!shots.length || !box || !image) return;

  let current = 0;
  const show = (index) => {
    current = (index + shots.length) % shots.length;
    image.src = shots[current].dataset.full;
    image.alt = `OpenPrivateer screenshot ${String(current + 1).padStart(2, '0')}`;
    counter.textContent = `REC ${String(current + 1).padStart(2, '0')} / 10`;
  };
  const open = (index) => {
    show(index);
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  };
  const close = () => {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  };

  shots.forEach((shot, i) => shot.addEventListener('click', () => open(i)));
  box.querySelector('.lightbox-close').addEventListener('click', close);
  box.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
  box.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();

// Per-platform download links: "latest" is a single GitHub release, but not
// every release includes every platform (e.g. a Windows-only hotfix), so a
// plain /releases/latest/download/<name> link can 404 for a platform that
// release didn't build. This finds, per button, the newest release that
// actually contains that asset and points the link there instead. The
// static href already in the HTML is the no-JS/fetch-failure fallback.
(() => {
  const links = [...document.querySelectorAll('.download-keypad a[data-asset]')];
  if (!links.length) return;

  fetch('https://api.github.com/repos/schlangz/openprivateer-project/releases?per_page=10')
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(releases => {
      links.forEach(link => {
        const name = link.dataset.asset;
        for (const release of releases) {
          const asset = (release.assets || []).find(a => a.name === name);
          if (asset) {
            link.href = asset.browser_download_url;
            return;
          }
        }
        // No matching asset in any fetched release: leave the static fallback href.
      });
    })
    .catch(() => { /* offline or rate-limited: static fallback hrefs stand */ });
})();
