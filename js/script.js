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

// ===== BLOG FILTERS =====
function initBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            blogPosts.forEach(post => {
                if (filter === 'all' || post.getAttribute('data-category') === filter) {
                    post.style.display = 'flex';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
}

// ===== READING TIME CALCULATION =====
function calculateReadingTime() {
    const articles = document.querySelectorAll('.blog-post');
    
    articles.forEach(article => {
        const excerpt = article.querySelector('.blog-post__excerpt').textContent;
        const wordCount = excerpt.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
        
        const timeElement = article.querySelector('.blog-post__read-time');
        if (timeElement) {
            timeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} min de leitura`;
        }
    });
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter__form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter__input');
            const button = this.querySelector('.newsletter__button');
            
            // Simulate form submission
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Inscrito!';
                button.style.backgroundColor = '#28a745';
                emailInput.value = '';
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-paper-plane"></i> Assinar';
                    button.disabled = false;
                    button.style.backgroundColor = '';
                }, 2000);
            }, 1500);
        });
    }
}

// ===== ARTICLE PROGRESS BAR =====
function initArticleProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: var(--secondary-color);
        width: 0%;
        z-index: var(--z-modal);
        transition: width 0.1s;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / documentHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// ===== INITIALIZE BLOG FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog features
    initBlogFilters();
    calculateReadingTime();
    initNewsletterForm();
    
    // Only init reading progress on article pages
    if (window.location.pathname.includes('artigos/')) {
        initArticleProgress();
    }
    
    // Highlight do menu ativo na página do blog
    const currentPage = window.location.pathname;
    if (currentPage.includes('blog.html') || currentPage.includes('artigos/')) {
        const blogLink = document.querySelector('a[href="blog.html"]');
        if (blogLink) {
            blogLink.classList.add('active');
        }
    }
});

// ===== GOOGLE ANALYTICS SIMULAÇÃO =====
// Adicione seu código do Google Analytics aqui quando tiver
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_MEASUREMENT_ID'); // Substitua pelo seu ID
