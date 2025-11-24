// ===== MENU MOBILE =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Mostrar menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Esconder menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav__link');
function linkAction() {
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

// ===== SCROLL SECTIONS ACTIVE LINK =====
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

// ===== HEADER SHADOW =====
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contact-form');
const contactButton = document.querySelector('.form__button');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulação de envio
        contactButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        contactButton.disabled = true;
        
        setTimeout(() => {
            contactButton.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
            contactButton.style.backgroundColor = '#28a745';
            
            // Reset do formulário
            setTimeout(() => {
                contactForm.reset();
                contactButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
                contactButton.disabled = false;
                contactButton.style.backgroundColor = '';
            }, 2000);
        }, 1500);
    });
}

// ===== ANIMAÇÃO AO SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.atuacao__card, .diferencial__card, .sobre__item');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// ===== CONTAGEM ESTATÍSTICAS =====
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + (obj.classList.contains('stat__number') ? '+' : '%');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Iniciar animação quando a seção home estiver visível
const homeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat__number');
            if (statNumbers.length > 0) {
                animateValue(statNumbers[0], 0, 500, 2000);
                animateValue(statNumbers[1], 0, 98, 2000);
            }
            homeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const homeSection = document.querySelector('.home');
if (homeSection) {
    homeObserver.observe(homeSection);
}

// ===== SCROLL REVEAL ANIMATION =====
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
});

sr.reveal('.home__data, .sobre__content, .section__title, .section__subtitle');
sr.reveal('.home__image, .sobre__image', { origin: 'bottom' });
sr.reveal('.atuacao__card, .diferencial__card', { interval: 100 });
sr.reveal('.contato__content', { origin: 'left' });
sr.reveal('.contato__form', { origin: 'right' });

// ===== GOOGLE ANALYTICS SIMULAÇÃO =====
// Adicione seu código do Google Analytics aqui quando tiver
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID'); // Substitua pelo seu ID
