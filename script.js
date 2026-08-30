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
