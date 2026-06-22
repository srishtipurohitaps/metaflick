import { omdbSearch, omdbDetail, buildCard, buildModalHTML, initModal, initParticles, initCursor } from './shared.js';

const ACCENT = '--pjo';
const DEFAULT_QUERY = 'Percy Jackson';

const grid        = document.getElementById('results-grid');

