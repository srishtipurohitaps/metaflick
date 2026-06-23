import { omdbSearch, omdbDetail, buildCard, buildModalHTML, initModal, initParticles, initCursor } from './shared.js';

const ACCENT = '--pjo';
const DEFAULT_QUERY = 'Percy Jackson';

const grid        = document.getElementById('results-grid');
const heading     = document.getElementById('results-heading');
const countEl     = document.getElementById('results-count');
const searchInput = document.getElementById('search-input');
const searchBtn   = document.getElementById('search-btn');

let currentQuery = DEFAULT_QUERY;

initCursor();
initParticles('particles-canvas', 'rgb(14, 165, 233)'); 
const {openModal} = initModal ();

async function runSearch(query) {
    currentQuery = query;
    head.textContent = query;
    grid.innerHTML = '<div class="loading-state">Searching the Olympian Archives…</div>';
    countEl.textContent = '';

    const data = await omdbSearch(query);
    grid.innerHTML = '';

    if (data.Response === 'False' || !data.Search?.length) {
        grid.innerHTML = `<div class="empty-state">No results found for "<strong>${query}</strong>". Try another hero, god, or myth.</div>`;
    return;
  }

  countEl.textContent = `${data.Search.length} results`;
  data.Search.forEach(movie => {
    const card = buildCard(movie, ACCENT);
    card.addEventListener('click', () => openDetail(movie.imdbID));
    grid.appendChild(card);
  });
}

async function openDetail(imdbID) {
    openModal('<div class="modal-loading">Loading…</div>');
  const detail = await omdbDetail(imdbID);
  openModal(buildModalHTML(detail));
}

document.querySelectorAll('.phase-btn').forEach(btn => {
btn.addEventListener('click', () => {
    document.querySelectorAll('.phase-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    runSearch(btn.dataset.query);
  });
});

searchBtn.addEventListener('click', () => {
    const q =  searchInput.value.trim();
    if (q) runSearch(q);
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = searchInput.value.trim();
    if (q) runSearch(q);
  }
});

runSearch(DEFAULT_QUERY);