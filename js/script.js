// ------------------------------ loading et effet scroll ------------------------------
document.addEventListener('DOMContentLoaded', function() {
    let loadingOverlay = document.querySelector(".loading-overlay");
    let content = document.querySelector(".le-contenu-main");
    document.body.classList.add('no-scroll');
    setTimeout(() => {
        loadingOverlay.style.opacity = "0";
        setTimeout(() => {
            loadingOverlay.style.display = "none";
            content.style.opacity= "1";
            document.body.classList.remove('no-scroll');
        }, 1600);
    }, 4000);

    // Défilement fluide vers la section "about" lors du clic sur le bouton "Scroll Down"
    const scrollButton = document.getElementById('scrollButton');
    scrollButton.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Animation des éléments au scroll
    const animateOnScroll = function() {
        const features = document.querySelectorAll('.feature');

        features.forEach(feature => {
            const featurePosition = feature.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (featurePosition < screenPosition) {
                feature.style.opacity = '1';
                feature.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialiser les styles pour l'animation au scroll
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Déclencher l'animation au scroll
    window.addEventListener('scroll', animateOnScroll);
    // Déclencher une fois au chargement
    animateOnScroll();
});
// --------------------------- Button Haut --------------------------------

const scrollTopBtn = document.querySelector(".scrollTopBtn");

window.addEventListener("scroll", function() {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = "1";
        scrollTopBtn.style.cursor = "pointer";
    } else {
        scrollTopBtn.style.opacity = "0";
    }
});

// Fonction améliorée pour remonter en haut sans vibrations
function smoothScrollToTop() {
    // Position de départ
    const startPosition = window.scrollY;
    // Durée de l'animation en ms
    const duration = 100;
    // Temps de départ
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        // Temps écoulé
        const elapsed = currentTime - startTime;

        // Calculer la nouvelle position avec une fonction d'atténuation
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
        const progress = Math.min(elapsed / duration, 1);

        window.scrollTo(0, startPosition * (1 - easeOutCubic(progress)));

        // Continuer l'animation si on n'a pas atteint la fin
        if (elapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Événement du clic sur le bouton
scrollTopBtn.addEventListener("click", smoothScrollToTop);

//-------------------- Sélectionner toutes les icônes avec la classe "cloud" --------------
const clouds = document.querySelectorAll('.cloud');

// Créer un élément div pour le cercle autour du curseur
const cursorCircle = document.createElement('div');
cursorCircle.classList.add('cursor-circle');
document.body.appendChild(cursorCircle);

// Définir la hauteur de détection pour l'effet
const detectionHeight = 100;

// Suivre le mouvement du curseur
document.addEventListener('mousemove', (e) => {
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    // Placer le cercle autour du curseur
    cursorCircle.style.left = `${mouseX}px`;
    cursorCircle.style.top = `${mouseY}px`;

    // Obtenir la position actuelle du scroll
    const scrollY = window.scrollY;

    // Vérifier si le scroll est en dessous de la limite
    if (scrollY < detectionHeight) {
        cursorCircle.classList.add('active'); // Montrer le fond du curseur
        clouds.forEach((cloud) => {
            const rect = cloud.getBoundingClientRect();
            const cloudX = rect.left + rect.width / 2;
            const cloudY = rect.top + rect.height / 2;

            // Calculer la distance entre le curseur et l'icône
            const distance = Math.sqrt(Math.pow(mouseX - cloudX, 2) + Math.pow(mouseY - cloudY, 2));

            const radius = 80;  // Zone autour du curseur où l'icône devient visible
            if (distance < radius) {
                cloud.classList.add('visible');  // Icône devient visible
            } else {
                cloud.classList.remove('visible');  // Icône redevient invisible
            }
        });
    } else {
        cursorCircle.classList.remove('active'); // Cacher le fond du curseur
        clouds.forEach((cloud) => {
            cloud.classList.remove('visible'); // Rendre toutes les icônes normales
        });
    }
});

/*---------------------------- animation typing -----------------------------*/
const text = "المجلس الإقليمي لتيزنيت يعلن عن الجائزة الإقليمية للإبداع والابتكار في نسختها الثالثة";
const animat_text = document.getElementById("animated-text");
let index = 0;

function displayLetters() {
    animat_text.textContent = "";
    let currentindex = 0;
    let interval = setInterval(() => {
        if (currentindex < text.length) {
            animat_text.textContent += text[currentindex];
            currentindex++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                index = 0;
                displayLetters();
            }, 3000);
        }
    }, 100);
}

displayLetters();

//---------------------------------- Timer ---------------------------------

const eventDate = new Date(2025, 2, 31, 23, 59, 59).getTime(); // 31 mars 2025 à 23h59

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    if (timeLeft > 0) {
        document.querySelector(".t1").textContent = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        document.querySelector(".t2").textContent = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.querySelector(".t3").textContent = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        document.querySelector(".t4").textContent = Math.floor((timeLeft % (1000 * 60)) / 1000);
    } else {
        document.getElementById("countdown").innerHTML = "<h2>⏳ انتهى الوقت! 🎉 شكرًا لكم على المشاركة</h2>";
        clearInterval(timer);
    }
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown()

/*---------------------------- menu pour les telephones-----------------------------*/

document.getElementById('menu-icon').addEventListener('click', function() {
    document.getElementById('sidebar').classList.add('active');
});

document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('active');
});

// --------------------------- navbar scroll--------------------------------
const navbar = document.querySelector("nav");

window.addEventListener("scroll", function() {
    if (window.scrollY >100) {
        navbar.classList.remove("cacher");
        navbar.classList.add("stickyy");
    } else if (window.scrollY > 50) {
        navbar.classList.remove("stickyy");
        navbar.classList.add("cacher");
    }else {
        navbar.classList.remove("cacher");
        navbar.classList.add("normal");
    }

});

/*--------------- animations des images -------------------*/
// Sélecteurs des éléments DOM
const scrollContainer = document.querySelector('.scroll-container');
const scrollContent = document.getElementById('scroll-content');
const slowerBtn = document.getElementById('slower');
const fasterBtn = document.getElementById('faster');
const pauseResumeBtn = document.getElementById('pause-resume');

// Variables pour le défilement
let pixelsPerFrame = 1; // Vitesse de défilement en pixels par frame
let animationId = null;
let isPaused = false;
let isFirstLoad = true;
let originalImages = [];

// Fonction d'initialisation
function init() {
    // Stocker les images originales
    originalImages = Array.from(scrollContent.querySelectorAll('img'));

    // Préparer le conteneur pour le défilement infini
    setupInfiniteScroll();

    // Démarrer l'animation
    if (isFirstLoad) {
        startAnimation();
        isFirstLoad = false;
    }
}

// Préparer le défilement infini en dupliquant les images
function setupInfiniteScroll() {
    // D'abord, vider le contenu actuel
    const currentImages = Array.from(scrollContent.querySelectorAll('img'));

    // Mesurer la largeur du conteneur visible
    const containerWidth = scrollContainer.offsetWidth;

    // Ajouter suffisamment d'images pour remplir au moins 3 fois la largeur du conteneur
    let contentWidth = 0;
    let imagesAdded = 0;
    const imgWidth = originalImages[0].offsetWidth;
    const imgMargin = parseInt(window.getComputedStyle(originalImages[0]).marginRight);

    // Conserver les images actuelles si elles existent déjà
    if (currentImages.length === 0) {
        // Première initialisation, utiliser les originales
        originalImages.forEach(img => {
            scrollContent.appendChild(img.cloneNode(true));
        });
    }

    // Continuer à ajouter des clones jusqu'à ce que nous ayons assez d'images
    while (contentWidth < containerWidth * 3) {
        originalImages.forEach(img => {
            const clone = img.cloneNode(true);
            scrollContent.appendChild(clone);
            contentWidth += (imgWidth + imgMargin);
            imagesAdded++;
        });
    }

    // Positionner correctement le contenu
    scrollContent.style.left = "0px";
}

// Animation de défilement
function animateScroll() {
    if (isPaused) {
        animationId = requestAnimationFrame(animateScroll);
        return;
    }

    // Récupérer toutes les images actuelles
    const allImages = scrollContent.querySelectorAll('img');

    // Si aucune image, ne rien faire
    if (allImages.length === 0) {
        animationId = requestAnimationFrame(animateScroll);
        return;
    }

    // Obtenir la position actuelle
    let currentLeft = parseInt(scrollContent.style.left || '0');

    // Avancer selon la vitesse actuelle
    currentLeft -= pixelsPerFrame;

    // Obtenir la largeur de la première image (avec sa marge)
    const firstImg = allImages[0];
    const imgWidth = firstImg.offsetWidth;
    const imgMargin = parseInt(window.getComputedStyle(firstImg).marginRight);
    const fullImgWidth = imgWidth + imgMargin;

    // Vérifier si nous avons dépassé la largeur de la première image
    if (Math.abs(currentLeft) >= fullImgWidth) {
        // Créer un clone de la première image
        const clone = firstImg.cloneNode(true);

        // Ajouter le clone à la fin
        scrollContent.appendChild(clone);

        // Supprimer la première image
        scrollContent.removeChild(firstImg);

        // Réinitialiser la position pour éviter les sauts
        currentLeft += fullImgWidth;
    }

    // Appliquer la nouvelle position
    scrollContent.style.left = currentLeft + 'px';

    // Continuer l'animation
    animationId = requestAnimationFrame(animateScroll);
}

// Démarrer l'animation
function startAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    animationId = requestAnimationFrame(animateScroll);
}

// Contrôles de vitesse
function setSpeed(newSpeed) {
    pixelsPerFrame = newSpeed;
}

// Gestionnaires d'événements pour les boutons
slowerBtn.addEventListener('click', () => {
    if (pixelsPerFrame > 0.1) { // Limite minimale de vitesse
        setSpeed(Math.max(0.1, pixelsPerFrame - 1)); // Décrément de 0.5
    }
});

fasterBtn.addEventListener('click', () => {
    if (pixelsPerFrame < 15) { // Limite maximale de vitesse
        setSpeed(Math.min(15, pixelsPerFrame + 1)); // Incrément de 0.5
    }
});

pauseResumeBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseResumeBtn.children[1].textContent = isPaused ? 'استئناف' : "إيقاف مؤقت";
});

// Adapter le carousel lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Reconfigurer le défilement infini
    setupInfiniteScroll();
});

// Initialiser le carousel quand les images sont chargées
window.addEventListener('load', init);

// Si les images sont déjà chargées (à partir du cache)
if (document.readyState === 'complete') {
    init();
}


