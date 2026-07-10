export const OMDB_KEY = 'f10cc3c0';

export async function omdbSearch(query, page = 1) {
  const url = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`;
  const res  = await fetch(url);
  const data = await res.json();
  return data;
}
 
export async function omdbDetail(imdbID) {
  const url = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbID}&plot=full`;
  const res  = await fetch(url);
  return res.json();
}
 
export function buildCard(movie, accentVar) {
  const poster = movie.Poster !== 'N/A' ? movie.Poster : null;
  const card   = document.createElement('article');
  card.className = 'movie-card';
  card.dataset.imdbid = movie.imdbID;
  card.innerHTML = `
    <div class="card-poster">
      ${poster
        ? `<img src="${poster}" alt="${movie.Title}" loading="lazy"/>`
        : `<div class="card-no-poster">🎬</div>`}
    </div>
    <div class="card-info">
      <h3 class="card-title">${movie.Title}</h3>
      <span class="card-year">${movie.Year}</span>
    </div>
  `;
  card.style.setProperty('--card-accent', `var(${accentVar})`);
  return card;
}
 
export function buildModalHTML(d) {
  const poster = d.Poster !== 'N/A' ? d.Poster : null;
  return `
    <div class="modal-inner">
      <div class="modal-poster">
        ${poster
          ? `<img src="${poster}" alt="${d.Title}"/>`
          : `<div class="modal-no-poster">🎬</div>`}
      </div>
      <div class="modal-details">
        <h2 class="modal-title">${d.Title}</h2>
        <div class="modal-meta">
          <span>${d.Year}</span>
          ${d.Rated !== 'N/A' ? `<span>${d.Rated}</span>` : ''}
          ${d.Runtime !== 'N/A' ? `<span>${d.Runtime}</span>` : ''}
          ${d.Genre !== 'N/A' ? `<span>${d.Genre}</span>` : ''}
        </div>
        ${d.imdbRating !== 'N/A' ? `<div class="modal-rating">⭐ ${d.imdbRating} <small>/ 10</small></div>` : ''}
        ${d.Plot !== 'N/A' ? `<p class="modal-plot">${d.Plot}</p>` : ''}
        <div class="modal-credits">
          ${d.Director !== 'N/A' ? `<p><strong>Director:</strong> ${d.Director}</p>` : ''}
          ${d.Actors   !== 'N/A' ? `<p><strong>Cast:</strong> ${d.Actors}</p>` : ''}
          ${d.Awards   !== 'N/A' ? `<p><strong>Awards:</strong> ${d.Awards}</p>` : ''}
        </div>
      </div>
    </div>
  `;
}
 
export function initModal() {
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn  = document.getElementById('modal-close');
  const body      = document.getElementById('modal-body');
 
  function openModal(html) {
    body.innerHTML = html;
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
 
  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
 
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
 
  return { openModal };
}
 
export function initParticles(canvasId, color = '#ffffff') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx   = canvas.getContext('2d');
  let W, H, pts = [];
 
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
 
  function spawn() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.4,
      a: Math.random(),
      dx: (Math.random() - 0.5) * 0.3,
      dy: -(Math.random() * 0.4 + 0.1),
      da: (Math.random() - 0.5) * 0.003,
    };
  }
 
  function init() {
    pts = Array.from({ length: 60 }, spawn);
  }
 
  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = color.replace(')', `,${p.a})`).replace('rgb', 'rgba');
      ctx.fill();
      p.x += p.dx; p.y += p.dy; p.a += p.da;
      if (p.a <= 0 || p.y < -5) Object.assign(p, spawn(), { y: H + 5 });
    });
    requestAnimationFrame(draw);
  }
 
  window.addEventListener('resize', () => { resize(); init(); });
  resize(); init(); draw();
}

export function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  ;(function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    dot.style.transform  = `translate(${mx}px,${my}px)`;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(loop);
  })();
}