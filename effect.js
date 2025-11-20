// Matrix Background Effect
function createMatrixBackground() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    document.querySelector('.matrix-bg').appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    function draw() {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#0F0';
        context.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }

    setInterval(draw, 30);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typing Effect
function typeWriterEffect() {
    const texts = document.querySelectorAll('.type-text');
    texts.forEach((text, index) => {
        text.style.animationDelay = `${index * 1}s`;
    });
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            playClick();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            // Ajuste especial para about y education
            const offset = (targetId === '#about' || targetId === '#education') ? 20 : 80;
            
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Scroll Reveal Effect
function initScrollReveal() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}

// Sound Effects
let soundEnabled = true;

function playSound(audioId) {
    if (!soundEnabled) return;
    const audio = document.getElementById(audioId);
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

function playClick() {
    playSound('click-sound');
}

function playKey() {
    playSound('key-sound');
}

function playNavHover() {
    playSound('nav-hover-sound');
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const bgMusic = document.getElementById('bg-music');
    if (soundEnabled) {
        bgMusic.play();
    } else {
        bgMusic.pause();
    }
}

// Project Details
function toggleProject(projectId) {
    playClick();
    const content = document.getElementById(`${projectId}-content`);
    const button = document.querySelector(`[onclick="toggleProject('${projectId}')"]`);
    const wasExpanded = content.classList.contains('expanded');

    // Primero desactivamos las transiciones
    document.querySelectorAll('.project-content').forEach(item => {
        item.style.transition = 'none';
    });

    // Forzamos un reflow
    void document.documentElement.offsetHeight;

    // Cerramos todos los proyectos
    document.querySelectorAll('.project-content').forEach(item => {
        item.classList.remove('expanded');
    });
    document.querySelectorAll('.toggle-project').forEach(btn => {
        btn.classList.remove('expanded');
    });

    // Reactivamos las transiciones
    setTimeout(() => {
        document.querySelectorAll('.project-content').forEach(item => {
            item.style.transition = '';
        });
    }, 0);

    // Solo expandimos si no estaba expandido anteriormente
    if (!wasExpanded) {
        content.classList.add('expanded');
        button.classList.add('expanded');
        
        // Scroll suave hacia el proyecto
        requestAnimationFrame(() => {
            content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // Add click listeners to images for full-screen view
    if (content.classList.contains('expanded')) {
        const images = content.querySelectorAll('.project-gallery img');
        images.forEach(img => {
            img.onclick = function() {
                showFullscreenImage(this.src);
            }
        });
    }
}

function showFullscreenImage(src) {
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    overlay.innerHTML = `
        <div class="fullscreen-content">
            <img src="${src}" alt="Fullscreen view">
            <button class="close-fullscreen">×</button>
        </div>
    `;
    document.body.appendChild(overlay);

    const close = () => {
        overlay.classList.add('closing');
        setTimeout(() => overlay.remove(), 300);
    };

    overlay.querySelector('.close-fullscreen').onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    // Add ESC key listener
    const escListener = (e) => {
        if (e.key === 'Escape') {
            close();
            document.removeEventListener('keydown', escListener);
        }
    };
    document.addEventListener('keydown', escListener);
}

// Función para manejar la visibilidad de las secciones
function handleSectionVisibility() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars when they become visible
                if (entry.target.id === 'skills') {
                    entry.target.querySelectorAll('.skill-card').forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            const bar = card.querySelector('.level-bar');
                            if (bar) {
                                const width = bar.style.width;
                                bar.style.width = '0';
                                setTimeout(() => {
                                    bar.style.width = width;
                                }, 100);
                            }
                        }, index * 200);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    sections.forEach(section => observer.observe(section));
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createMatrixBackground();
    typeWriterEffect();
    initSmoothScroll();
    handleSectionVisibility();
    initCursorTrail();

    // Initialize audio elements
    document.querySelectorAll('audio').forEach(audio => {
        const src = audio.getAttribute('data-src');
        if (src) {
            audio.src = src;
        }
    });

    // Add hover sound effects
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', playNavHover);
    });
});

// Cursor trail effect
function initCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * 0.1;
        cursorY += dy * 0.1;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        requestAnimationFrame(animate);
    }

    animate();
}
