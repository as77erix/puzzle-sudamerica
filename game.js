/* ========================================
   🎮 Puzzle Sudamérica - Game Logic v2
   ======================================== */

// ==========================================
// CONFIG
// ==========================================
const UNSPLASH_ACCESS_KEY = 'Jxev90HPjzslJ7p06qmOmEILjjHYmKZaWDPWYJQVNBQ';
const UNSPLASH_CACHE_KEY = 'puzzle_unsplash_cache_v5';
const UNSPLASH_PARAMS = '?w=800&h=800&q=85&fit=crop&crop=attention&auto=format';

// Cache in memory + localStorage
const photoCache = JSON.parse(localStorage.getItem(UNSPLASH_CACHE_KEY) || '{}');

function saveCache() {
    localStorage.setItem(UNSPLASH_CACHE_KEY, JSON.stringify(photoCache));
}

async function imgUrl(slug) {
    if (slug.startsWith('http')) return slug;
    if (photoCache[slug]) return photoCache[slug];

    try {
        const res = await fetch(
            `https://api.unsplash.com/photos/${slug}?client_id=${UNSPLASH_ACCESS_KEY}`
        );
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        const baseUrl = data.urls.raw.split('?')[0];
        const url = baseUrl + UNSPLASH_PARAMS;
        photoCache[slug] = url;
        saveCache();
        return url;
    } catch {
        return `https://via.placeholder.com/900x600/1a2035/94a3b8?text=${encodeURIComponent(slug)}`;
    }
}

// ==========================================
// DATA
// ==========================================
const CATEGORIES = {
    paisajes: {
        id: 'paisajes',
        name: 'Paisajes',
        icon: '🏔️',
        description: 'Maravillas naturales del continente',
        gradientFrom: '#3b82f6',
        gradientTo: '#8b5cf6',
    },
    animales: {
        id: 'animales',
        name: 'Animales',
        icon: '🦁',
        description: 'Fauna única de Sudamérica',
        gradientFrom: '#10b981',
        gradientTo: '#f59e0b',
    },
    ciudades: {
        id: 'ciudades',
        name: 'Ciudades',
        icon: '🏙️',
        description: 'Metrópolis e historia viva',
        gradientFrom: '#ef4444',
        gradientTo: '#f59e0b',
    }
};

const IMAGES = {
    paisajes: {
        argentina: {
            flag: '🇦🇷', name: 'Argentina',
            items: [
                { id: 'perito_moreno', name: 'Glaciar Perito Moreno', location: 'Santa Cruz, Patagonia', photo: 'V34MPSwaK7k' },
                { id: 'iguazu', name: 'Cataratas del Iguazú', location: 'Misiones', photo: 'sK2s73nZwz0' },
                { id: 'fitz_roy', name: 'Monte Fitz Roy', location: 'El Chaltén, Patagonia', photo: 'HazDeRk87oA' },
                { id: 'nahuel_huapi', name: 'Lago Nahuel Huapi', location: 'Bariloche, Patagonia', photo: 'K_zV9qD53ZY' },
            ]
        },
        brasil: {
            flag: '🇧🇷', name: 'Brasil',
            items: [
                { id: 'cristo', name: 'Cristo Redentor', location: 'Río de Janeiro', photo: 'eVMLVyrf4g4' },
                { id: 'lencois', name: 'Lençóis Maranhenses', location: 'Maranhão', photo: 'lOXd57n2hHU' },
                { id: 'noronha', name: 'Fernando de Noronha', location: 'Pernambuco', photo: 'PUiEolgEgaE' },
                { id: 'amazonia', name: 'Selva Amazónica', location: 'Amazonas', photo: 'AycIWyyCuVo' },
            ]
        },
        chile: {
            flag: '🇨🇱', name: 'Chile',
            items: [
                { id: 'torres', name: 'Torres del Paine', location: 'Patagonia chilena', photo: 'rlHAG9QcldI' },
                { id: 'atacama', name: 'Desierto de Atacama', location: 'Región de Antofagasta', photo: 'Qc6EZC7NWWw' },
                { id: 'valle_luna', name: 'Valle de la Luna', location: 'Atacama', photo: 'TrWxMFWvk4Y' },
                { id: 'pascua', name: 'Isla de Pascua', location: 'Rapa Nui', photo: 'thwOv7I363Y' },
            ]
        },
        uruguay: {
            flag: '🇺🇾', name: 'Uruguay',
            items: [
                { id: 'polonio', name: 'Cabo Polonio', location: 'Rocha', photo: 'FAqQVlNeSUg' },
                { id: 'punta', name: 'Punta del Este', location: 'Maldonado', photo: 'jHz2WyDBVyo' },
                { id: 'colonia_sunset', name: 'Colonia del Sacramento', location: 'Colonia', photo: 'wwBk0aCa7Gs' },
            ]
        },
        colombia: {
            flag: '🇨🇴', name: 'Colombia',
            items: [
                { id: 'cocora', name: 'Valle del Cocora', location: 'Quindío', photo: 'akkbyynQtEg' },
                { id: 'tayrona', name: 'Parque Tayrona', location: 'Magdalena', photo: 'gc5OYAll-rc' },
                { id: 'cartagena_walls', name: 'Ciudad Amurallada', location: 'Cartagena', photo: 'PM95XBE1Xxk' },
                { id: 'cano_cristales', name: 'Caño Cristales', location: 'Meta', photo: '5hcxlXRW_KM' },
            ]
        },
        peru: {
            flag: '🇵🇪', name: 'Perú',
            items: [
                { id: 'machu_picchu', name: 'Machu Picchu', location: 'Cusco', photo: 'gQzlCU9_ItA' },
                { id: 'rainbow', name: 'Montaña de Colores', location: 'Cusco', photo: 'kTbZ0n9MzqI' },
                { id: 'huacachina', name: 'Huacachina', location: 'Ica', photo: 'Q-bULd2CYds' },
                { id: 'titicaca', name: 'Lago Titicaca', location: 'Puno', photo: 'xq0MW-DM6Cc' },
            ]
        },
        bolivia: {
            flag: '🇧🇴', name: 'Bolivia',
            items: [
                { id: 'uyuni', name: 'Salar de Uyuni', location: 'Potosí', photo: '1k-hqjlmBRE' },
                { id: 'laguna_colorada', name: 'Laguna Colorada', location: 'Potosí', photo: 'Ni0fXNmEPJ4' },
                { id: 'valle_luna_bo', name: 'Valle de la Luna', location: 'La Paz', photo: '0dqqcem_lWI' },
            ]
        },
        ecuador: {
            flag: '🇪🇨', name: 'Ecuador',
            items: [
                { id: 'galapagos', name: 'Islas Galápagos', location: 'Galápagos', photo: 'LJIjXgutX4g' },
                { id: 'cotopaxi', name: 'Volcán Cotopaxi', location: 'Cotopaxi', photo: 'GvLG8Q-KQ6A' },
                { id: 'amazon_ec', name: 'Selva Amazónica', location: 'Orellana', photo: 'zzzS45Cjhdw' },
            ]
        },
        venezuela: {
            flag: '🇻🇪', name: 'Venezuela',
            items: [
                { id: 'angel_falls', name: 'Salto Ángel', location: 'Bolívar', photo: 'TwojIl0NzMY' },
                { id: 'roraima', name: 'Tepuy Roraima', location: 'Gran Sabana', photo: 'lxmavRZKFJ4' },
            ]
        },
        paraguay: {
            flag: '🇵🇾', name: 'Paraguay',
            items: [
                { id: 'ypacarai', name: 'Lago Ypacaraí', location: 'Cordillera', photo: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Lago_Ypacarai_-_panoramio.jpg' },
                { id: 'trinidad', name: 'Ruinas de Trinidad', location: 'Itapúa', photo: 'zsdDAztLRiE' },
            ]
        },
    },
    animales: {
        sudamerica: {
            flag: '🌎', name: 'Sudamérica',
            items: [
                { id: 'jaguar', name: 'Jaguar', location: 'Pantanal, Brasil', photo: 'xpBGzErZeZs' },
                { id: 'tucan', name: 'Tucán', location: 'Selva tropical', photo: 'aIc0mwL-Tt0' },
                { id: 'tapir', name: 'Tapir', location: 'Amazonia', photo: '1m8mdst8JTE' },
                { id: 'condor', name: 'Cóndor Andino', location: 'Andes', photo: 'fGvDhUKTdUc' },
                { id: 'capibara', name: 'Capibara', location: 'Humedales', photo: 'kl617diIESw' },
                { id: 'pinguino', name: 'Pingüino de Magallanes', location: 'Tierra del Fuego', photo: 'zBVhMwd7g_A' },
                { id: 'llama', name: 'Llama', location: 'Andes', photo: 'OQykYSpB5qQ' },
                { id: 'flamingo', name: 'Flamenco Andino', location: 'Salar de Bolivia', photo: 't0_p8hlJiZw' },
                { id: 'guacamayo', name: 'Guacamayo', location: 'Amazonia', photo: 'nzBMNJvWZAE' },
                { id: 'oso_hormiguero', name: 'Oso Hormiguero', location: 'Pantanal, Brasil', photo: 'FmukIbiGMrk' },
                { id: 'anaconda', name: 'Anaconda', location: 'Amazonia', photo: 'BJZK8bc2mhE' },
            ]
        }
    },
    ciudades: {
        argentina: {
            flag: '🇦🇷', name: 'Argentina',
            items: [
                { id: 'obelisco', name: 'Obelisco', location: 'Buenos Aires', photo: 'ekA3fTefJMA' },
                { id: 'caminito', name: 'Caminito', location: 'La Boca, Buenos Aires', photo: 'fl3fdbbtj4Q' },
                { id: 'puerto_madero', name: 'Puerto Madero', location: 'Buenos Aires', photo: 'VXSlXVlLLY4' },
            ]
        },
        brasil: {
            flag: '🇧🇷', name: 'Brasil',
            items: [
                { id: 'pelourinho', name: 'Pelourinho', location: 'Salvador, Bahía', photo: 'BGD47PMGzyM' },
                { id: 'rio_sugarloaf', name: 'Pan de Azúcar', location: 'Río de Janeiro', photo: 'P40XjykprjM' },
                { id: 'sao_paulo', name: 'São Paulo', location: 'São Paulo', photo: '6OMe9rp3v9c' },
            ]
        },
        chile: {
            flag: '🇨🇱', name: 'Chile',
            items: [
                { id: 'santiago', name: 'Santiago', location: 'Región Metropolitana', photo: 'QH3rBhcJS54' },
                { id: 'valparaiso', name: 'Valparaíso', location: 'Valparaíso', photo: 'H6KJ2D0LphU' },
                { id: 'valparaiso2', name: 'Valparaíso Cerros', location: 'Valparaíso', photo: 'qGcIfPdQSb4' },
            ]
        },
        colombia: {
            flag: '🇨🇴', name: 'Colombia',
            items: [
                { id: 'bogota', name: 'Bogotá', location: 'Cundinamarca', photo: 'gdcT7prXMzE' },
                { id: 'cartagena_street', name: 'Cartagena Colorida', location: 'Cartagena de Indias', photo: 'JINIW3yzobc' },
                { id: 'guatape', name: 'Guatapé', location: 'Antioquia', photo: 'Q8HGO9en0sY' },
            ]
        },
        peru: {
            flag: '🇵🇪', name: 'Perú',
            items: [
                { id: 'cusco', name: 'Cusco', location: 'Plaza de Armas', photo: '2LydtNCRBv8' },
                { id: 'lima', name: 'Lima Miraflores', location: 'Lima', photo: 'JvxnQV_gaO8' },
            ]
        },
        uruguay: {
            flag: '🇺🇾', name: 'Uruguay',
            items: [
                { id: 'colonia_colonial', name: 'Colonia del Sacramento', location: 'Colonia', photo: 'PWjA3zA497I' },
                { id: 'punta_buildings', name: 'Punta del Este', location: 'Maldonado', photo: 'ehFgttlFJNA' },
                { id: 'punta_skyline', name: 'Punta del Este Skyline', location: 'Maldonado', photo: 'gnwPEQZR9pk' },
            ]
        },
        bolivia: {
            flag: '🇧🇴', name: 'Bolivia',
            items: [
                { id: 'la_paz', name: 'La Paz', location: 'La Paz', photo: 'T_oeAGfY3MI' },
                { id: 'sucre', name: 'Sucre', location: 'Chuquisaca', photo: 'P3kH_hH-4z4' },
            ]
        },
        ecuador: {
            flag: '🇪🇨', name: 'Ecuador',
            items: [
                { id: 'quito', name: 'Quito', location: 'Pichincha', photo: 'IUwpdJVM4Fc' },
                { id: 'cuenca', name: 'Cuenca', location: 'Azuay', photo: 'rI0arLMf4do' },
            ]
        },
        venezuela: {
            flag: '🇻🇪', name: 'Venezuela',
            items: [
                { id: 'caracas', name: 'Caracas', location: 'Distrito Capital', photo: '8Pm2WioMBBQ' },
            ]
        },
    }
};

const DIFFICULTIES = {
    3: { label: 'Fácil', icon: '🟢' },
    4: { label: 'Medio', icon: '🟡' },
    5: { label: 'Difícil', icon: '🟠' },
    6: { label: 'Experto', icon: '🔴' }
};

// ==========================================
// GAME STATE
// ==========================================
let gameState = {
    currentScreen: 'home',
    currentCategory: null,
    currentCountry: null,
    selectedImage: null,
    gridSize: 3,
    pieces: [],
    selectedPiece: null,
    moves: 0,
    timer: null,
    seconds: 0,
    isCompleted: false,
    isDragging: false,
    dragPiece: null,
    dragElement: null,
    dragClone: null,
    dragOffsetX: 0,
    dragOffsetY: 0
};

// ==========================================
// DOM ELEMENTS
// ==========================================
const screens = {
    home: document.getElementById('home-screen'),
    country: document.getElementById('country-screen'),
    select: document.getElementById('select-screen'),
    game: document.getElementById('game-screen'),
    win: document.getElementById('win-screen')
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    renderCategoryCards();
    initEventListeners();
});

// ==========================================
// PARTICLES
// ==========================================
function initParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(particle);
    }
}

// ==========================================
// CATEGORY CARDS (Home)
// ==========================================
function renderCategoryCards() {
    const container = document.getElementById('category-cards');
    container.innerHTML = '';

    Object.values(CATEGORIES).forEach((cat, index) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.style.animationDelay = `${index * 0.15}s`;
        card.style.setProperty('--cat-from', cat.gradientFrom);
        card.style.setProperty('--cat-to', cat.gradientTo);
        card.innerHTML = `
            <div class="category-card-icon">${cat.icon}</div>
            <div class="category-card-name">${cat.name}</div>
            <div class="category-card-desc">${cat.description}</div>
            <div class="category-card-arrow">→</div>
        `;
        card.addEventListener('click', () => selectCategory(cat.id));
        container.appendChild(card);
    });
}

// ==========================================
// CATEGORY SELECTION
// ==========================================
function selectCategory(categoryId) {
    gameState.currentCategory = categoryId;
    const cat = CATEGORIES[categoryId];

    const root = document.documentElement;
    root.style.setProperty('--accent-primary', cat.gradientFrom);
    root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${cat.gradientFrom}, ${cat.gradientTo})`);
    root.style.setProperty('--shadow-glow', `0 0 30px ${cat.gradientFrom}40`);

    showScreen('country');
}

// ==========================================
// COUNTRY CARDS
// ==========================================
async function renderCountryCards() {
    const cat = CATEGORIES[gameState.currentCategory];
    const countries = IMAGES[gameState.currentCategory];

    document.getElementById('country-title').textContent = `${cat.icon} ${cat.name} — Elegí un País`;
    document.getElementById('category-badge').textContent = cat.name;

    const container = document.getElementById('country-cards');
    container.innerHTML = '';

    Object.entries(countries).forEach(([countryId, country], index) => {
        const card = document.createElement('div');
        card.className = 'country-card';
        card.style.animationDelay = `${index * 0.1}s`;

        const img = document.createElement('img');
        img.alt = country.name;
        img.loading = 'lazy';

        const overlay = document.createElement('div');
        overlay.className = 'country-card-overlay';
        overlay.innerHTML = `
            <div class="country-card-flag">${country.flag}</div>
            <div class="country-card-name">${country.name}</div>
            <div class="country-card-count">${country.items.length} imagen${country.items.length !== 1 ? 'es' : ''}</div>
        `;

        card.appendChild(img);
        card.appendChild(overlay);
        card.addEventListener('click', () => selectCountry(countryId));
        container.appendChild(card);

        imgUrl(country.items[0].photo).then(url => { img.src = url; });
    });
}

function selectCountry(countryId) {
    gameState.currentCountry = countryId;
    showScreen('select');
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function initEventListeners() {
    document.getElementById('btn-back-home').addEventListener('click', () => showScreen('home'));
    document.getElementById('btn-back-country').addEventListener('click', () => showScreen('country'));
    document.getElementById('btn-back-select').addEventListener('click', () => {
        stopTimer();
        showScreen('select');
    });

    document.getElementById('difficulty-options').addEventListener('click', (e) => {
        const btn = e.target.closest('.diff-btn');
        if (!btn) return;
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gameState.gridSize = parseInt(btn.dataset.grid);
    });

    document.getElementById('btn-hint').addEventListener('mousedown', showHint);
    document.getElementById('btn-hint').addEventListener('mouseup', hideHint);
    document.getElementById('btn-hint').addEventListener('mouseleave', hideHint);
    document.getElementById('btn-hint').addEventListener('touchstart', (e) => { e.preventDefault(); showHint(); });
    document.getElementById('btn-hint').addEventListener('touchend', hideHint);
    document.getElementById('btn-shuffle').addEventListener('click', shufflePuzzle);

    document.getElementById('btn-download').addEventListener('click', downloadImage);
    document.getElementById('btn-play-again').addEventListener('click', () => showScreen('select'));
    document.getElementById('btn-go-home').addEventListener('click', () => showScreen('home'));
}

// ==========================================
// SCREEN NAVIGATION
// ==========================================
function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
    gameState.currentScreen = screenName;

    if (screenName === 'country') renderCountryCards();
    if (screenName === 'select') renderSelectScreen();
}

function renderSelectScreen() {
    const country = IMAGES[gameState.currentCategory][gameState.currentCountry];

    document.querySelector('.theme-badge-flag').textContent = country.flag;
    document.querySelector('.theme-badge-name').textContent = country.name;
    document.getElementById('select-title').textContent = `Elegí tu Imagen — ${country.name}`;

    renderImageCards();
}

// ==========================================
// IMAGE CARDS (Select screen)
// ==========================================
function renderImageCards() {
    const country = IMAGES[gameState.currentCategory][gameState.currentCountry];
    const container = document.getElementById('landscape-cards');
    container.innerHTML = '';

    country.items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'landscape-card';
        card.style.animationDelay = `${index * 0.1}s`;

        const img = document.createElement('img');
        img.alt = item.name;
        img.loading = 'lazy';

        card.appendChild(img);
        card.insertAdjacentHTML('beforeend', `
            <div class="landscape-card-overlay">
                <div class="landscape-card-name">${item.name}</div>
                <div class="landscape-card-location">📍 ${item.location}</div>
            </div>
            <div class="landscape-card-play">🧩</div>
        `);
        card.addEventListener('click', () => startGame(item));
        container.appendChild(card);

        imgUrl(item.photo).then(url => { img.src = url; });
    });
}

// ==========================================
// GAME LOGIC
// ==========================================
async function startGame(image) {
    gameState.selectedImage = image;
    gameState.moves = 0;
    gameState.seconds = 0;
    gameState.isCompleted = false;
    gameState.selectedPiece = null;

    // Resolve URL before building puzzle
    gameState.currentImageUrl = await imgUrl(image.photo);

    document.querySelector('#game-landscape-name .info-text').textContent = image.name;
    updateMoves();
    updateTimer();

    document.getElementById('preview-image').src = gameState.currentImageUrl;
    document.getElementById('hint-image').src = gameState.currentImageUrl;

    buildPuzzle();
    showScreen('game');
    startTimer();
}

function buildPuzzle() {
    const board = document.getElementById('puzzle-board');
    const size = gameState.gridSize;

    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    board.innerHTML = '';

    const totalPieces = size * size;
    gameState.pieces = [];

    for (let i = 0; i < totalPieces; i++) {
        gameState.pieces.push({ id: i, currentPos: i, correctPos: i });
    }

    shuffleArray(gameState.pieces);
    gameState.pieces.forEach((piece, index) => { piece.currentPos = index; });

    renderPuzzle();
}

function renderPuzzle() {
    const board = document.getElementById('puzzle-board');
    const size = gameState.gridSize;
    const url = gameState.currentImageUrl;

    board.innerHTML = '';

    const sortedPieces = [...gameState.pieces].sort((a, b) => a.currentPos - b.currentPos);

    sortedPieces.forEach(piece => {
        const div = document.createElement('div');
        div.className = 'puzzle-piece';
        div.dataset.id = piece.id;

        const correctRow = Math.floor(piece.correctPos / size);
        const correctCol = piece.correctPos % size;
        const bgX = (correctCol / (size - 1)) * 100;
        const bgY = (correctRow / (size - 1)) * 100;

        div.style.backgroundImage = `url('${url}')`;
        div.style.backgroundSize = `${size * 100}%`;
        div.style.backgroundPosition = `${bgX}% ${bgY}%`;

        if (piece.currentPos === piece.correctPos) div.classList.add('correct');

        div.addEventListener('pointerdown', (e) => onDragStart(e, piece, div));
        div.style.touchAction = 'none';

        board.appendChild(div);
    });

    updateProgress();
}

// ==========================================
// DRAG & DROP
// ==========================================
function onDragStart(e, piece, element) {
    if (gameState.isCompleted) return;
    e.preventDefault();

    const pieceRect = element.getBoundingClientRect();

    gameState.isDragging = true;
    gameState.dragPiece = piece;
    gameState.dragElement = element;
    gameState.dragOffsetX = e.clientX - pieceRect.left;
    gameState.dragOffsetY = e.clientY - pieceRect.top;

    const clone = element.cloneNode(true);
    clone.className = 'puzzle-piece drag-clone';
    clone.style.width = pieceRect.width + 'px';
    clone.style.height = pieceRect.height + 'px';
    clone.style.left = pieceRect.left + 'px';
    clone.style.top = pieceRect.top + 'px';
    clone.style.backgroundImage = element.style.backgroundImage;
    clone.style.backgroundSize = element.style.backgroundSize;
    clone.style.backgroundPosition = element.style.backgroundPosition;
    document.body.appendChild(clone);
    gameState.dragClone = clone;

    element.classList.add('dragging-origin');
    element.setPointerCapture(e.pointerId);

    const onMove = (ev) => onDragMove(ev);
    const onEnd = (ev) => {
        onDragEnd(ev);
        element.removeEventListener('pointermove', onMove);
        element.removeEventListener('pointerup', onEnd);
        element.removeEventListener('pointercancel', onEnd);
    };

    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerup', onEnd);
    element.addEventListener('pointercancel', onEnd);
}

function onDragMove(e) {
    if (!gameState.isDragging || !gameState.dragClone) return;
    gameState.dragClone.style.left = (e.clientX - gameState.dragOffsetX) + 'px';
    gameState.dragClone.style.top = (e.clientY - gameState.dragOffsetY) + 'px';
    highlightDropTarget(e.clientX, e.clientY);
}

function onDragEnd(e) {
    if (!gameState.isDragging) return;

    const targetPiece = getDropTarget(e.clientX, e.clientY);

    if (gameState.dragClone) { gameState.dragClone.remove(); gameState.dragClone = null; }
    if (gameState.dragElement) gameState.dragElement.classList.remove('dragging-origin');

    document.querySelectorAll('.puzzle-piece').forEach(p => p.classList.remove('drop-target'));

    if (targetPiece && targetPiece.id !== gameState.dragPiece.id) {
        swapPieces(gameState.dragPiece, targetPiece);
    }

    gameState.isDragging = false;
    gameState.dragPiece = null;
    gameState.dragElement = null;
}

function highlightDropTarget(clientX, clientY) {
    document.getElementById('puzzle-board').querySelectorAll('.puzzle-piece').forEach(p => {
        p.classList.remove('drop-target');
        const rect = p.getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right &&
            clientY >= rect.top && clientY <= rect.bottom &&
            p !== gameState.dragElement) {
            p.classList.add('drop-target');
        }
    });
}

function getDropTarget(clientX, clientY) {
    for (const p of document.getElementById('puzzle-board').querySelectorAll('.puzzle-piece')) {
        if (p === gameState.dragElement) continue;
        const rect = p.getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right &&
            clientY >= rect.top && clientY <= rect.bottom) {
            const id = parseInt(p.dataset.id);
            return gameState.pieces.find(piece => piece.id === id);
        }
    }
    return null;
}

function swapPieces(piece1, piece2) {
    const tempPos = piece1.currentPos;
    piece1.currentPos = piece2.currentPos;
    piece2.currentPos = tempPos;

    gameState.moves++;
    updateMoves();
    renderPuzzle();

    if (checkWin()) onWin();
}

function checkWin() {
    return gameState.pieces.every(p => p.currentPos === p.correctPos);
}

function onWin() {
    gameState.isCompleted = true;
    stopTimer();

    setTimeout(() => {
        const image = gameState.selectedImage;

        document.getElementById('win-image').src = gameState.currentImageUrl;
        document.querySelector('.win-landscape-name').textContent = image.name;
        document.querySelector('.win-landscape-location').textContent = `📍 ${image.location}`;
        document.getElementById('stat-moves').textContent = gameState.moves;
        document.getElementById('stat-time').textContent = formatTime(gameState.seconds);
        document.getElementById('stat-difficulty').textContent = DIFFICULTIES[gameState.gridSize].label;

        document.getElementById('btn-download').style.display = gameState.gridSize === 6 ? '' : 'none';

        showScreen('win');
        createConfetti();
    }, 500);
}

// ==========================================
// PUZZLE HELPERS
// ==========================================
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const isSolved = arr.every((piece, idx) => piece.correctPos === idx);
    if (isSolved && arr.length > 1) [arr[0], arr[1]] = [arr[1], arr[0]];
}

function shufflePuzzle() {
    gameState.selectedPiece = null;
    gameState.moves = 0;
    gameState.seconds = 0;
    stopTimer();
    updateMoves();
    updateTimer();

    shuffleArray(gameState.pieces);
    gameState.pieces.forEach((piece, index) => { piece.currentPos = index; });

    renderPuzzle();
    startTimer();
}

function updateProgress() {
    const correct = gameState.pieces.filter(p => p.currentPos === p.correctPos).length;
    const total = gameState.pieces.length;
    const percent = Math.round((correct / total) * 100);

    document.getElementById('progress-bar').style.width = percent + '%';
    document.getElementById('progress-text').textContent = `${percent}% completado (${correct}/${total})`;
}

// ==========================================
// TIMER
// ==========================================
function startTimer() {
    stopTimer();
    gameState.timer = setInterval(() => { gameState.seconds++; updateTimer(); }, 1000);
}

function stopTimer() {
    if (gameState.timer) { clearInterval(gameState.timer); gameState.timer = null; }
}

function updateTimer() {
    document.querySelector('#game-timer .info-text').textContent = formatTime(gameState.seconds);
}

function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function updateMoves() {
    document.querySelector('#game-moves .info-text').textContent = `Movimientos: ${gameState.moves}`;
}

// ==========================================
// HINT
// ==========================================
function showHint() { document.getElementById('hint-overlay').classList.add('active'); }
function hideHint() { document.getElementById('hint-overlay').classList.remove('active'); }

// ==========================================
// DOWNLOAD (Experto only)
// ==========================================
function downloadImage() {
    if (gameState.gridSize !== 6) return;
    const image = gameState.selectedImage;
    const url = gameState.currentImageUrl.split('?')[0] + '?w=2400&q=95&fit=crop&auto=format';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.crossOrigin = 'anonymous';
    img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = `${image.id}_HD.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
    img.onerror = () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${image.id}_HD.png`;
        link.click();
    };
    img.src = url;
}

// ==========================================
// CONFETTI
// ==========================================
function createConfetti() {
    const container = document.getElementById('confetti');
    container.innerHTML = '';
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 2 + 's';
        piece.style.animationDuration = (2 + Math.random() * 2) + 's';
        piece.style.borderRadius = ['50%', '0%', '30%'][Math.floor(Math.random() * 3)];
        piece.style.width = (6 + Math.random() * 10) + 'px';
        piece.style.height = (6 + Math.random() * 10) + 'px';
        container.appendChild(piece);
    }

    setTimeout(() => { container.innerHTML = ''; }, 5000);
}
