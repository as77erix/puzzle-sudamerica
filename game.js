/* ========================================
   🎮 Puzzle Sudamérica - Game Logic
   ======================================== */

// ==========================================
// DATA: Temas y Paisajes
// ==========================================
const THEMES = {
    argentina: {
        id: 'argentina',
        name: 'Argentina',
        flag: '🇦🇷',
        badge: '🇦🇷 ARGENTINA',
        heroTitle: 'Paisajes Argentinos',
        subtitle: 'Descubrí la belleza de Argentina armando increíbles rompecabezas fotográficos',
        accentHue: 210,       // Blue
        gradientFrom: '#3b82f6',
        gradientTo: '#8b5cf6',
        landscapes: [
            {
                id: 'perito_moreno',
                name: 'Glaciar Perito Moreno',
                location: 'Santa Cruz, Patagonia',
                image: 'images/perito_moreno.png',
                description: 'Uno de los glaciares más impresionantes del mundo'
            },
            {
                id: 'iguazu_falls',
                name: 'Cataratas del Iguazú',
                location: 'Misiones',
                image: 'images/iguazu_falls.png',
                description: 'Maravilla natural del mundo'
            },
            {
                id: 'fitz_roy',
                name: 'Monte Fitz Roy',
                location: 'El Chaltén, Patagonia',
                image: 'images/fitz_roy.png',
                description: 'La capital del trekking de Argentina'
            },
            {
                id: 'quebrada_humahuaca',
                name: 'Quebrada de Humahuaca',
                location: 'Jujuy',
                image: 'images/quebrada_humahuaca.png',
                description: 'Cerro de los Siete Colores'
            },
            {
                id: 'bariloche_lakes',
                name: 'Lago Nahuel Huapi',
                location: 'Bariloche, Patagonia',
                image: 'images/bariloche_lakes.png',
                description: 'La Suiza argentina'
            }
        ]
    },
    brasil: {
        id: 'brasil',
        name: 'Brasil',
        flag: '🇧🇷',
        badge: '🇧🇷 BRASIL',
        heroTitle: 'Paisajes Brasileños',
        subtitle: 'Descubrí la belleza de Brasil armando increíbles rompecabezas fotográficos',
        accentHue: 140,       // Green
        gradientFrom: '#10b981',
        gradientTo: '#f59e0b',
        landscapes: [
            {
                id: 'cristo_redentor',
                name: 'Cristo Redentor',
                location: 'Río de Janeiro',
                image: 'images/cristo_redentor.png',
                description: 'Icono de Brasil y maravilla del mundo moderno'
            },
            {
                id: 'lencois_maranhenses',
                name: 'Lençóis Maranhenses',
                location: 'Maranhão',
                image: 'images/lencois_maranhenses.png',
                description: 'Dunas blancas con lagunas cristalinas'
            },
            {
                id: 'fernando_noronha',
                name: 'Fernando de Noronha',
                location: 'Pernambuco',
                image: 'images/fernando_noronha.png',
                description: 'Archipiélago paradisíaco del Atlántico'
            },
            {
                id: 'amazonia',
                name: 'Selva Amazónica',
                location: 'Amazonas',
                image: 'images/amazonia.png',
                description: 'El pulmón verde del planeta'
            },
            {
                id: 'chapada_diamantina',
                name: 'Chapada Diamantina',
                location: 'Bahía',
                image: 'images/chapada_diamantina.png',
                description: 'Mesetas, cuevas y cascadas espectaculares'
            }
        ]
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
    currentTheme: 'argentina',
    selectedLandscape: null,
    gridSize: 3,
    pieces: [],
    selectedPiece: null,
    moves: 0,
    timer: null,
    seconds: 0,
    isCompleted: false,
    // Drag state
    isDragging: false,
    dragPiece: null,
    dragElement: null,
    dragClone: null,
    dragStartX: 0,
    dragStartY: 0,
    dragOffsetX: 0,
    dragOffsetY: 0
};

// ==========================================
// DOM ELEMENTS
// ==========================================
const screens = {
    home: document.getElementById('home-screen'),
    select: document.getElementById('select-screen'),
    game: document.getElementById('game-screen'),
    win: document.getElementById('win-screen')
};

// ==========================================
// THEME HELPERS
// ==========================================
function getCurrentTheme() {
    return THEMES[gameState.currentTheme];
}

function getCurrentLandscapes() {
    return getCurrentTheme().landscapes;
}

function applyThemeColors(theme) {
    const root = document.documentElement;
    root.style.setProperty('--accent-primary', theme.gradientFrom);
    root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`);
    root.style.setProperty('--shadow-glow', `0 0 30px ${theme.gradientFrom}40`);
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initThemeSelector();
    updateHomeForTheme();
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
// THEME SELECTOR
// ==========================================
function initThemeSelector() {
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const themeId = btn.dataset.theme;
            if (themeId === gameState.currentTheme) return;

            // Update active state
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Switch theme
            gameState.currentTheme = themeId;
            updateHomeForTheme();
        });
    });
}

function updateHomeForTheme() {
    const theme = getCurrentTheme();

    // Apply theme colors
    applyThemeColors(theme);

    // Update hero text
    document.getElementById('hero-badge').textContent = theme.badge;
    document.getElementById('hero-theme-title').textContent = theme.heroTitle;
    document.querySelector('.hero-subtitle').textContent = theme.subtitle;

    // Update gallery
    initHomeGallery();
}

// ==========================================
// HOME GALLERY
// ==========================================
function initHomeGallery() {
    const gallery = document.getElementById('landscape-gallery');
    gallery.innerHTML = '';
    
    // Animate out, then in
    gallery.style.opacity = '0';
    gallery.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        getCurrentLandscapes().forEach(landscape => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<img src="${landscape.image}" alt="${landscape.name}">`;
            gallery.appendChild(item);
        });
        gallery.style.opacity = '1';
        gallery.style.transform = 'translateY(0)';
    }, 200);
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function initEventListeners() {
    // Navigation
    document.getElementById('btn-start').addEventListener('click', () => showScreen('select'));
    document.getElementById('btn-back-home').addEventListener('click', () => showScreen('home'));
    document.getElementById('btn-back-select').addEventListener('click', () => {
        stopTimer();
        showScreen('select');
    });

    // Difficulty selection
    document.getElementById('difficulty-options').addEventListener('click', (e) => {
        const btn = e.target.closest('.diff-btn');
        if (!btn) return;
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gameState.gridSize = parseInt(btn.dataset.grid);
    });

    // Game actions
    document.getElementById('btn-hint').addEventListener('mousedown', showHint);
    document.getElementById('btn-hint').addEventListener('mouseup', hideHint);
    document.getElementById('btn-hint').addEventListener('mouseleave', hideHint);
    document.getElementById('btn-hint').addEventListener('touchstart', (e) => { e.preventDefault(); showHint(); });
    document.getElementById('btn-hint').addEventListener('touchend', hideHint);
    document.getElementById('btn-shuffle').addEventListener('click', shufflePuzzle);

    // Win screen
    document.getElementById('btn-download').addEventListener('click', downloadImage);
    document.getElementById('btn-play-again').addEventListener('click', () => {
        showScreen('select');
    });
    document.getElementById('btn-go-home').addEventListener('click', () => showScreen('home'));
}

// ==========================================
// SCREEN NAVIGATION
// ==========================================
function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
    gameState.currentScreen = screenName;

    if (screenName === 'select') {
        updateSelectScreenForTheme();
        renderLandscapeCards();
    }

    if (screenName === 'home') {
        updateHomeForTheme();
    }
}

function updateSelectScreenForTheme() {
    const theme = getCurrentTheme();
    
    // Update mini badge
    document.querySelector('.theme-badge-flag').textContent = theme.flag;
    document.querySelector('.theme-badge-name').textContent = theme.name;
    
    // Update select title
    document.getElementById('select-title').textContent = `Elegí tu Paisaje — ${theme.name}`;
}

// ==========================================
// LANDSCAPE CARDS
// ==========================================
function renderLandscapeCards() {
    const container = document.getElementById('landscape-cards');
    container.innerHTML = '';

    getCurrentLandscapes().forEach((landscape, index) => {
        const card = document.createElement('div');
        card.className = 'landscape-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <img src="${landscape.image}" alt="${landscape.name}" loading="lazy">
            <div class="landscape-card-overlay">
                <div class="landscape-card-name">${landscape.name}</div>
                <div class="landscape-card-location">📍 ${landscape.location}</div>
            </div>
            <div class="landscape-card-play">🧩</div>
        `;
        card.addEventListener('click', () => startGame(landscape));
        container.appendChild(card);
    });
}

// ==========================================
// GAME LOGIC
// ==========================================
function startGame(landscape) {
    gameState.selectedLandscape = landscape;
    gameState.moves = 0;
    gameState.seconds = 0;
    gameState.isCompleted = false;
    gameState.selectedPiece = null;

    // Update UI
    document.querySelector('#game-landscape-name .info-text').textContent = landscape.name;
    updateMoves();
    updateTimer();

    // Preview
    document.getElementById('preview-image').src = landscape.image;
    document.getElementById('hint-image').src = landscape.image;

    // Build puzzle
    buildPuzzle();

    // Show game screen
    showScreen('game');

    // Start timer
    startTimer();
}

function buildPuzzle() {
    const board = document.getElementById('puzzle-board');
    const size = gameState.gridSize;
    
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    board.innerHTML = '';

    // Create pieces
    const totalPieces = size * size;
    gameState.pieces = [];

    for (let i = 0; i < totalPieces; i++) {
        gameState.pieces.push({
            id: i,
            currentPos: i,
            correctPos: i
        });
    }

    // Shuffle
    shuffleArray(gameState.pieces);

    // Update positions
    gameState.pieces.forEach((piece, index) => {
        piece.currentPos = index;
    });

    // Render
    renderPuzzle();
}

function renderPuzzle() {
    const board = document.getElementById('puzzle-board');
    const size = gameState.gridSize;
    const landscape = gameState.selectedLandscape;

    board.innerHTML = '';

    // Sort by currentPos for rendering
    const sortedPieces = [...gameState.pieces].sort((a, b) => a.currentPos - b.currentPos);

    sortedPieces.forEach(piece => {
        const div = document.createElement('div');
        div.className = 'puzzle-piece';
        div.dataset.id = piece.id;

        // Calculate background position
        const correctRow = Math.floor(piece.correctPos / size);
        const correctCol = piece.correctPos % size;
        const bgX = (correctCol / (size - 1)) * 100;
        const bgY = (correctRow / (size - 1)) * 100;

        div.style.backgroundImage = `url('${landscape.image}')`;
        div.style.backgroundSize = `${size * 100}%`;
        div.style.backgroundPosition = `${bgX}% ${bgY}%`;

        // Check if correct
        if (piece.currentPos === piece.correctPos) {
            div.classList.add('correct');
        }

        // Drag handlers (pointer events work for mouse + touch)
        div.addEventListener('pointerdown', (e) => onDragStart(e, piece, div));
        div.style.touchAction = 'none'; // Prevent scroll on touch

        board.appendChild(div);
    });

    updateProgress();
}

// ==========================================
// DRAG & DROP SYSTEM
// ==========================================
function onDragStart(e, piece, element) {
    if (gameState.isCompleted) return;
    e.preventDefault();

    const board = document.getElementById('puzzle-board');
    const boardRect = board.getBoundingClientRect();
    const pieceRect = element.getBoundingClientRect();

    // Store drag state
    gameState.isDragging = true;
    gameState.dragPiece = piece;
    gameState.dragElement = element;

    // Calculate offset from pointer to piece top-left
    gameState.dragOffsetX = e.clientX - pieceRect.left;
    gameState.dragOffsetY = e.clientY - pieceRect.top;

    // Create a visual clone to drag
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

    // Mark the original as being dragged
    element.classList.add('dragging-origin');

    // Capture pointer for smooth dragging
    element.setPointerCapture(e.pointerId);

    // Add move & end listeners
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

    const x = e.clientX - gameState.dragOffsetX;
    const y = e.clientY - gameState.dragOffsetY;

    gameState.dragClone.style.left = x + 'px';
    gameState.dragClone.style.top = y + 'px';

    // Highlight drop target
    highlightDropTarget(e.clientX, e.clientY);
}

function onDragEnd(e) {
    if (!gameState.isDragging) return;

    // Find drop target
    const targetPiece = getDropTarget(e.clientX, e.clientY);

    // Clean up clone
    if (gameState.dragClone) {
        gameState.dragClone.remove();
        gameState.dragClone = null;
    }

    // Clean up origin style
    if (gameState.dragElement) {
        gameState.dragElement.classList.remove('dragging-origin');
    }

    // Clear all drop target highlights
    document.querySelectorAll('.puzzle-piece').forEach(p => p.classList.remove('drop-target'));

    // Perform swap if valid target
    if (targetPiece && targetPiece.id !== gameState.dragPiece.id) {
        swapPieces(gameState.dragPiece, targetPiece);
    }

    // Reset drag state
    gameState.isDragging = false;
    gameState.dragPiece = null;
    gameState.dragElement = null;
}

function highlightDropTarget(clientX, clientY) {
    const board = document.getElementById('puzzle-board');
    const pieces = board.querySelectorAll('.puzzle-piece');

    pieces.forEach(p => {
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
    const board = document.getElementById('puzzle-board');
    const pieces = board.querySelectorAll('.puzzle-piece');

    for (const p of pieces) {
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
    // Swap positions
    const tempPos = piece1.currentPos;
    piece1.currentPos = piece2.currentPos;
    piece2.currentPos = tempPos;

    gameState.moves++;
    updateMoves();

    renderPuzzle();

    // Check win
    if (checkWin()) {
        onWin();
    }
}

function checkWin() {
    return gameState.pieces.every(p => p.currentPos === p.correctPos);
}

function onWin() {
    gameState.isCompleted = true;
    stopTimer();

    setTimeout(() => {
        const landscape = gameState.selectedLandscape;
        const diffLabel = DIFFICULTIES[gameState.gridSize].label;

        // Update win screen
        document.getElementById('win-image').src = landscape.image;
        document.querySelector('.win-landscape-name').textContent = landscape.name;
        document.querySelector('.win-landscape-location').textContent = `📍 ${landscape.location}`;
        document.getElementById('stat-moves').textContent = gameState.moves;
        document.getElementById('stat-time').textContent = formatTime(gameState.seconds);
        document.getElementById('stat-difficulty').textContent = diffLabel;

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
    // Make sure it's not already solved
    const isSolved = arr.every((piece, idx) => piece.correctPos === idx);
    if (isSolved && arr.length > 1) {
        [arr[0], arr[1]] = [arr[1], arr[0]];
    }
}

function shufflePuzzle() {
    gameState.selectedPiece = null;
    gameState.moves = 0;
    gameState.seconds = 0;
    stopTimer();
    updateMoves();
    updateTimer();

    shuffleArray(gameState.pieces);
    gameState.pieces.forEach((piece, index) => {
        piece.currentPos = index;
    });

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
    gameState.timer = setInterval(() => {
        gameState.seconds++;
        updateTimer();
    }, 1000);
}

function stopTimer() {
    if (gameState.timer) {
        clearInterval(gameState.timer);
        gameState.timer = null;
    }
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
function showHint() {
    document.getElementById('hint-overlay').classList.add('active');
}

function hideHint() {
    document.getElementById('hint-overlay').classList.remove('active');
}

// ==========================================
// DOWNLOAD
// ==========================================
function downloadImage() {
    const landscape = gameState.selectedLandscape;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        // HD resolution
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);

        // Trigger download
        const link = document.createElement('a');
        link.download = `${landscape.id}_HD.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
    img.onerror = () => {
        // Fallback: open image in new tab
        const link = document.createElement('a');
        link.href = landscape.image;
        link.download = `${landscape.id}_HD.png`;
        link.click();
    };
    img.src = landscape.image;
}

// ==========================================
// CONFETTI
// ==========================================
function createConfetti() {
    const container = document.getElementById('confetti');
    container.innerHTML = '';
    const theme = getCurrentTheme();
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', theme.gradientFrom, theme.gradientTo];

    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 2 + 's';
        piece.style.animationDuration = (2 + Math.random() * 2) + 's';

        const shapes = ['50%', '0%', '30%'];
        piece.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
        piece.style.width = (6 + Math.random() * 10) + 'px';
        piece.style.height = (6 + Math.random() * 10) + 'px';

        container.appendChild(piece);
    }

    // Clean up after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}
