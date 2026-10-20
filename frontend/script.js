const API_KEY = '39657756ae333e3e23fc57670ed4a12c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Poster images ke liye

// Hamburger Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Load Movies dynamically including LocalStorage Admin posts
document.addEventListener('DOMContentLoaded', () => {
    loadDynamicMovies();
});

function loadDynamicMovies() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    // Default movies
    const defaultMovies = [
        {
            title: "Inception",
            category: "action",
            genre: "Action / Sci-Fi • 2010",
            rating: "8.8",
            poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=500",
            link: "#"
        },
        {
            title: "Interstellar",
            category: "sci-fi",
            genre: "Sci-Fi / Adventure • 2014",
            rating: "8.6",
            poster: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=500",
            link: "#"
        }
    ];

    // Get admin added movies from LocalStorage
    const adminMovies = JSON.parse(localStorage.getItem('filmyzone_movies')) || [];
    const allMovies = [...defaultMovies, ...adminMovies];

    movieGrid.innerHTML = '';

    allMovies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.setAttribute('data-category', movie.category);
        card.setAttribute('data-title', movie.title);

        card.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}">
                <span class="rating"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p class="genre">${movie.genre}</p>
                <button class="btn-download" onclick="openDownloadModal('${movie.title}', '2.1 GB', '${movie.link}')"><i class="fa-solid fa-download"></i> Download</button>
            </div>
        `;
        movieGrid.appendChild(card);
    });
}

// Search functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const movieCards = document.querySelectorAll('.movie-card');
        movieCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            if (title.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Category Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        filterMovies(filter);
    });
});

function filterMovies(filter) {
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Download Modal functionality
const modal = document.getElementById('downloadModal');
const modalTitle = document.getElementById('modalTitle');
const fileSize = document.getElementById('fileSize');
const server1Btn = document.getElementById('server1Btn');
const server2Btn = document.getElementById('server2Btn');

function openDownloadModal(title, size, link) {
    if (modal) {
        modalTitle.innerText = `Download: ${title}`;
        fileSize.innerText = size;
        server1Btn.href = link;
        server2Btn.href = link;
        modal.style.display = 'flex';
    }
}

function closeDownloadModal() {
    if (modal) {
        modal.style.display = 'none';
    }
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Contact Form Handler
function handleContact(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    alert(`Thank you ${name}! Your request has been sent successfully.`);
    document.getElementById('contactForm').reset();
}
<script>
    const hamburger = document.getElementById('hamburger');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebar = document.getElementById('closeSidebar');

    function toggleSidebar() {
        mobileSidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    }

    hamburger.addEventListener('click', toggleSidebar);
    closeSidebar.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
</script>
