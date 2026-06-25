import { omdbSearch, omdbDetail, buildCard, buildModalHTML, initModal, initParticles, initCursor } from './shared.js';

const ACCENT = '--marvel';
const DEFAULT_QUERY = 'Avengers';

const grid        = document.getElementById('results-grid');
const heading     = document.getElementById('results-heading');
const countEl     = document.getElementById('results-count');
const searchInput = document.getElementById('search-input');
const searchBtn   = document.getElementById('search-btn');

initCursor();
initParticles('particles-canvas', 'rgb(220, 38, 38)');

