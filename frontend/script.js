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

const modal = document.getElementById('downloadModal');
const modalTitle = document.getElementById('modalTitle');
const fileSize1 = document.getElementById('fileSize1');

function openDownloadModal(title, quality, size) {
    modalTitle.innerText = `Download: ${title}`;
    fileSize1.innerText = size;
    modal.style.display = 'flex';
}

function closeDownloadModal() {
    modal.style.display = 'none';
}

function triggerDownload(e) {
    e.preventDefault();
    alert('Download link generated successfully!');
    closeDownloadModal();
}
