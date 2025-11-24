// ===== BLOG FUNCTIONALITY =====
function initBlog() {
    // Smooth scroll para âncoras internas nos artigos
    const articleLinks = document.querySelectorAll('a[href^="#"]');
    articleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Highlight do menu ativo na página do blog
    const currentPage = window.location.pathname;
    if (currentPage.includes('blog.html')) {
        const blogLink = document.querySelector('a[href="blog.html"]');
        if (blogLink) {
            blogLink.classList.add('active');
        }
    }
}

// ===== ARTICLE READING PROGRESS =====
function initReadingProgress() {
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

// Initialize blog features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initBlog();
    
    // Only init reading progress on blog pages
    if (window.location.pathname.includes('blog.html')) {
        initReadingProgress();
    }
    
    // Rest of your existing code...
});
