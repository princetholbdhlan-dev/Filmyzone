// TMDB API Configuration
const API_KEY = '39657756ae333e3e23fc57670ed4a12c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Hamburger Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Load Movies dynamically (TMDB API + LocalStorage Admin posts + Default fallback)
document.addEventListener('DOMContentLoaded', () => {
    loadDynamicMovies();
});

async function loadDynamicMovies() {
    const movieGrid = document.getElementById('movieGrid');
    if (!movieGrid) return;

    let tmdbMovies = [];

    // 1. Fetch live movies from TMDB API
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
        const data = await response.json();
        
        if (data && data.results) {
            tmdbMovies = data.results.map(movie => ({
                id: movie.id,
                title: movie.title || movie.name,
                category: "action", // Default category or can be mapped based on genre IDs
                genre: `TMDB Rating • ${movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}`,
                rating: movie.vote_average ? movie.vote_average.toFixed(1) : '8.0',
                poster: movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=500',
                isTmdb: true,
                link: "#"
            }));
        }
    } catch (error) {
        console.error("Error fetching TMDB movies, falling back to local data:", error);
    }

    // 2. Default fallback movies
    const defaultMovies = [
        {
            id: "inception",
            title: "Inception",
            category: "action",
            genre: "Action / Sci-Fi • 2010",
            rating: "8.8",
            poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=500",
            isTmdb: false,
            link: "#"
        },
        {
            id: "interstellar",
            title: "Interstellar",
            category: "sci-fi",
            genre: "Sci-Fi / Adventure • 2014",
            rating: "8.6",
            poster: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=500",
            isTmdb: false,
            link: "#"
        }
    ];

    // 3. Get admin added movies from LocalStorage
    const adminMovies = JSON.parse(localStorage.getItem('filmyzone_movies')) || [];
    
    // Combine all sources (TMDB movies take priority for rich live content)
    const allMovies = [...tmdbMovies, ...adminMovies, ...defaultMovies];

    movieGrid.innerHTML = '';

    allMovies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.setAttribute('data-category', movie.category || 'action');
        card.setAttribute('data-title', movie.title);

        // Check if it's a TMDB movie or local/admin movie to handle click action correctly
        if (movie.isTmdb) {
            card.onclick = () => openMovieDetail(movie.id);
            card.style.cursor = "pointer";
        }

        card.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}">
                <span class="rating"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p class="genre">${movie.genre}</p>
                <button class="btn-download" onclick="event.stopPropagation(); openDownloadModal('${movie.title}', '2.1 GB', '${movie.link}')"><i class="fa-solid fa-download"></i> Download</button>
            </div>
        `;
        movieGrid.appendChild(card);
    });
}

// Redirect to Dynamic Movie Detail page with ID
function openMovieDetail(movieId) {
    window.location.href = `pages/movie.html?id=${movieId}`;
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

// Download Modal functionality references
const modal = document.getElementById('downloadModal');
const modalTitle = document.getElementById('modalTitle');
const fileSize = document.getElementById('fileSize');
