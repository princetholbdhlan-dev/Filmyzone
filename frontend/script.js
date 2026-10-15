// Hamburger Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const movieCards = document.querySelectorAll('.movie-card');

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    movieCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

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

function filterByGenre(genre) {
    filterBtns.forEach(b => {
        if(b.getAttribute('data-filter') === genre) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
    filterMovies(genre);
    window.location.href = '#movies';
}

function filterMovies(filter) {
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
    modalTitle.innerText = `Download: ${title}`;
    fileSize.innerText = size;
    server1Btn.href = link;
    server2Btn.href = link;
    modal.style.display = 'flex';
}

function closeDownloadModal() {
    modal.style.display = 'none';
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
    alert(`Thank you ${name}! Your request/message has been sent successfully.`);
    document.getElementById('contactForm').reset();
}
