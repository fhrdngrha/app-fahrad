// script.js

// Data puisi romantis untuk Naila
const poems = [
  `Awalnya aku ngerasa gak pantas buat kenal sama kamu, 
  tapi entah kenapa hati aku malah nyuruh buat nekat. 
  Akhirnya aku berani nanya-nanya tentang kamu ke temen-temen,
  dan aku berpikir "mungkin suatu saat nanti aku bakal mencintaimu."`,

  `Ini foto pertama kita berdua, dan sumpah… kamu cantik banget.
  Gak nyangka aja bisa foto bareng kamu.
  Moment-nya sederhana, tapi gak akan bisa dilupain.
  Di moment ini aku udah mencintaimu — rasa ini muncul secepat kedipan mata.`,

  `Bener kata orang, kalau udah nemuin seseorang yang bisa bikin dunia jadi seindah ini, 
  rasanya apa pun bakal aku lakuin buat kamu. Karena ya… kamu itu alasan kenapa semuanya terasa beda.`,

  `Setiap helaian rambutmu adalah cerita,
  setiap tatapan matamu adalah puisi.
  Kau adalah kombinasi sempurna
  antara kekuatan dan kelembutan sejati.

  Di matamu, kutemukan kedamaian,
  di senyummu, kutemukan kebahagiaan.`,

  `Di dunia yang penuh dengan kerumitan,
  kau hadir dengan kesederhanaan nan indah.
  Pekerja keras dengan hati lembut,
  sempurna dalam setiap ketidaksempurnaan.

  Kau adalah jawaban dari semua doa
  yang tak pernah berhenti kupanjatkan.`
];

// Variabel global
let currentPhotoIndex = 0;
let photoItems = [];

// Inisialisasi halaman
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Loaded');

  if (document.getElementById('nextBtn')) initHomePage();
  else if (document.querySelector('.gallery-container')) initGalleryPage();
});

// Halaman utama
function initHomePage() {
  const nextBtn = document.getElementById('nextBtn');
  if (!nextBtn) return;
  nextBtn.addEventListener('click', () => {
    const content = document.querySelector('.content');
    content.style.transition = 'all 0.5s ease';
    content.style.opacity = '0';
    content.style.transform = 'scale(0.8)';
    setTimeout(() => (window.location.href = 'tampilan1.html'), 500);
  });
}

// Galeri
function initGalleryPage() {
  photoItems = Array.from(document.querySelectorAll('.photo-item'));
  initScrollAnimation();
  photoItems.forEach((item, index) =>
    item.querySelector('.photo-frame').addEventListener('click', () => openModal(index))
  );
  setTimeout(() => photoItems.forEach(i => i.classList.add('visible')), 100);
}

function initScrollAnimation() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  photoItems.forEach(item => observer.observe(item));
}

// Modal
function openModal(index) {
  currentPhotoIndex = index;
  const modal = document.getElementById('photoModal');
  const modalImage = document.getElementById('modalImage');
  const modalPoem = document.getElementById('modalPoem');
  modalImage.src = photoItems[index].querySelector('.photo').src;
  modalPoem.textContent = poems[index];
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('photoModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Navigasi
function goBack() { window.location.href = 'index.html'; }
function nextPage() { window.location.href = 'tampilan2.html'; }
function goToGallery() { window.location.href = 'tampilan1.html'; }

// WhatsApp
function sendWhatsAppResponse() {
  const message = "Iya aku mau jadi pacar kamu! 💖";
  const phoneNumber = "6281586739761";
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  createConfetti();
  setTimeout(() => { window.location.href = whatsappURL; }, 1500);
}

// Tombol "Ga Mau"
function moveButton(button) {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  button.style.transform = `translate(${x}px, ${y}px)`;
}

// Confetti
function createConfetti() {
  const container = document.querySelector('.question-content');
  if (!container) return;
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.innerHTML = '🎉';
    confetti.style.position = 'absolute';
    confetti.style.fontSize = Math.random() * 20 + 10 + 'px';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-50px';
    confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

// Tutup modal & keyboard event
window.addEventListener('click', e => {
  const modal = document.getElementById('photoModal');
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', e => {
  const modal = document.getElementById('photoModal');
  if (modal && modal.style.display === 'block' && e.key === 'Escape') closeModal();
});
