// script.js

// Data puisi romantis untuk Naila
const poems = [
    `Awalnya aku ngerasa gak pantas buat kenal sama kamu, 
    tapi entah kenapa hati aku malah nyuruh buat nekat. 
    Akhirnya aku berani nanya-nanya tentang kamu ke temen-temen,
    dan foto ini… diambil ketika aku sudah mencintaimu.`,

    `Ini foto pertama kita berdua, dan sumpah… kamu cantik banget.
Kayak, gak nyangka aja bisa foto bareng kamu
moment-nya sederhana, tapi moment ini ga akan bisa dilupain `,

    `Bener kata orang, kalau udah nemuin seseorang yang bisa bikin dunia jadi seindah ini, 
    rasanya apa pun bakal aku lakuin buat kamu. Karena ya… kamu itu alasan kenapa semuanya terasa beda`,

    `Setiap helaian rambutmu adalah cerita
Setiap tatapan matamu adalah puisi
Kau adalah kombinasi sempurna
Antara kekuatan dan kelembutan sejati

Di matamu, kutemukan kedamaian
Di senyummu, kutemukan kebahagiaan`,

    `Di dunia yang penuh dengan kerumitan
Kau hadir dengan kesederhanaan nan indah
Pekerja keras dengan hati yang lembut
Sempurna dalam setiap ketidaksempurnaan

Kau adalah jawaban dari semua doa
Yang tak pernah berhenti kupanjatkan`
];

// Variabel global
let currentPhotoIndex = 0;
let photoItems = [];

// Fungsi untuk halaman utama
function initHomePage() {
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            console.log('Tombol Lanjut diklik!');
            // Animasi sebelum pindah halaman
            const content = document.querySelector('.content');
            content.style.opacity = '0';
            content.style.transform = 'scale(0.8)';
            content.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                window.location.href = 'tampilan1.html';
            }, 500);
        });
    }
}

// Fungsi untuk halaman galeri
function initGalleryPage() {
    console.log('Menginisialisasi halaman galeri...');
    photoItems = Array.from(document.querySelectorAll('.photo-item'));
    
    // Inisialisasi scroll animation
    initScrollAnimation();
    
    // Event listener untuk foto
    photoItems.forEach((item, index) => {
        const photoFrame = item.querySelector('.photo-frame');
        photoFrame.addEventListener('click', () => openModal(index));
    });

    // Pastikan semua foto terlihat
    setTimeout(() => {
        photoItems.forEach(item => {
            item.classList.add('visible');
        });
    }, 100);
}

// Scroll animation dengan parallax effect
function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    photoItems.forEach((item) => {
        observer.observe(item);
    });
}

// Modal functions untuk popup baru dengan foto dan puisi
function openModal(index) {
    console.log('Membuka modal untuk foto index:', index);
    currentPhotoIndex = index;
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalPoem = document.getElementById('modalPoem');
    
    const photoSrc = photoItems[index].querySelector('.photo').src;
    modalImage.src = photoSrc;
    modalPoem.textContent = poems[index];
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset animasi
    modalImage.style.animation = 'none';
    setTimeout(() => {
        modalImage.style.animation = 'photoFloat 3s ease-in-out infinite';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Navigation functions
function goBack() {
    console.log('Kembali ke halaman utama');
    window.location.href = 'index.html';
}

function nextPage() {
    console.log('Lanjut ke halaman pertanyaan');
    window.location.href = 'tampilan2.html';
}

function goToGallery() {
    console.log('Kembali ke galeri');
    window.location.href = 'tampilan1.html';
}

// Fungsi untuk mengirim pesan ke WhatsApp (Langsung redirect)
function sendWhatsAppResponse() {
    // Pesan yang akan dikirim
    const message = "Iya aku mau jadi pacar kamu! 💖";
    
    // Nomor WhatsApp tujuan (GANTI DENGAN NOMOR NAILA YANG BENAR)
    const phoneNumber = "6281586739761"; // Ganti dengan nomor Naila yang benar
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Buat URL WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Confetti effect sebelum redirect
    createConfetti();
    
    // Tunggu sebentar agar confetti terlihat, lalu redirect
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 1500);
}

// Fungsi untuk tombol "Ga Mau"
function moveButton(button) {
    if (button.classList.contains('btn-no')) {
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        button.style.transform = `translate(${x}px, ${y}px)`;
    }
}

function createConfetti() {
    const colors = ['#ff6b9d', '#4CAF50', '#2196F3', '#FFEB3B', '#9C27B0'];
    const container = document.querySelector('.question-content');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = '🎉';
        confetti.style.position = 'absolute';
        confetti.style.fontSize = Math.random() * 20 + 10 + 'px';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-50px';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.zIndex = '1000';
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    if (document.getElementById('nextBtn')) {
        console.log('Menginisialisasi halaman utama');
        initHomePage();
    } else if (document.querySelector('.gallery-container')) {
        console.log('Menginisialisasi halaman galeri');
        initGalleryPage();
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('photoModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('photoModal');
    if (modal && modal.style.display === 'block') {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
});

// Tambahkan style untuk animasi jika belum ada
if (!document.querySelector('#animations-styles')) {
    const style = document.createElement('style');
    style.id = 'animations-styles';
    style.textContent = `
        @keyframes confettiFall {
            0% { 
                transform: translateY(0) rotate(0); 
                opacity: 1;
            }
            100% { 
                transform: translateY(500px) rotate(360deg); 
                opacity: 0; 
            }
        }
        
        @keyframes fadeOut {
            from { 
                opacity: 1; 
                transform: scale(1); 
            }
            to { 
                opacity: 0; 
                transform: scale(0.8); 
            }
        }
        
        @keyframes photoFloat {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
            }
            50% {
                transform: translateY(-10px) rotate(1deg);
            }
        }
        
        @keyframes framePulse {
            0%, 100% {
                transform: translate(-50%, -50%) scale(1);
                border-color: rgba(255, 107, 157, 0.3);
            }
            50% {
                transform: translate(-50%, -50%) scale(1.05);
                border-color: rgba(255, 107, 157, 0.6);
            }
        }
        
        @keyframes titleGlow {
            0%, 100% {
                text-shadow: 0 0 10px rgba(255, 107, 157, 0.3);
            }
            50% {
                text-shadow: 0 0 20px rgba(255, 107, 157, 0.6);
            }
        }
        
        @keyframes textFadeIn {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes modalAppear {
            0% {
                opacity: 0;
                transform: scale(0.8) translateY(50px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
        
        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-20px) rotate(10deg); }
        }
    `;
    document.head.appendChild(style);
}