const images = [
  { src: 'https://picsum.photos/id/1011/500/700', category: 'People', caption: 'Wilderness' },
  { src: 'https://picsum.photos/id/1003/400/600', category: 'Animal', caption: 'Smiling Child' },
  { src: 'https://picsum.photos/id/1056/400/500', category: 'Sky', caption: 'Neon Streets' },
  { src: 'https://picsum.photos/id/1074/500/600', category: 'Animal', caption: 'Sunset Field' },
  { src: 'https://picsum.photos/id/1033/400/500', category: 'People', caption: 'Thinking Pose' },
  { src: 'https://picsum.photos/id/1045/400/600', category: 'Sky', caption: 'Skyscrapers' },
  { src: 'https://picsum.photos/id/1084/500/700', category: 'Animal', caption: 'Foggy Forest' }
];

const galleryContainer = document.getElementById('galleryContainer');
const filterButtons = document.getElementById('filterButtons');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');

let currentCategory = 'All';
let currentIndex = 0;

function createFilters() {
  const categories = ['All', ...new Set(images.map(img => img.category))];
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.innerText = cat;
    btn.className = 'filter-btn';
    if (cat === 'All') btn.classList.add('active');
    btn.onclick = () => {
      currentCategory = cat;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery();
    };
    filterButtons.appendChild(btn);
  });
}

function renderGallery() {
  galleryContainer.innerHTML = '';
  let delay = 0;
  images.forEach((img, index) => {
    if (currentCategory === 'All' || img.category === currentCategory) {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      div.style.animationDelay = `${delay}s`;
      delay += 0.1;
      div.innerHTML = `<img src="${img.src}" alt="${img.caption}" onclick="openLightbox(${index})">`;
      galleryContainer.appendChild(div);
    }
  });
}

function openLightbox(index) {
  currentIndex = index;
  const img = images[index];
  lightbox.style.display = 'flex';
  lightboxImage.src = img.src;
  lightboxCaption.textContent = img.caption;
}

function changeImage(direction) {
  const visibleImages = images.filter(img => currentCategory === 'All' || img.category === currentCategory);
  currentIndex = (currentIndex + direction + visibleImages.length) % visibleImages.length;
  const img = visibleImages[currentIndex];
  lightboxImage.src = img.src;
  lightboxCaption.textContent = img.caption;
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function toggleTheme() {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
}

// Load saved theme on load
window.onload = () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light');
  createFilters();
  renderGallery();
};
