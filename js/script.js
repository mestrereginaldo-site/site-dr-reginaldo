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
    
    // Rest of existing code...
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

    // Rest of your existing JavaScript...
});
