// Hamburger Menu Toggle
function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const icon = document.querySelector('.hamburger-icon');
    
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

// Theme Toggle Function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.querySelector('.menu-links');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    
    if (!hamburgerMenu.contains(event.target) && menu.classList.contains('open')) {
        toggleMenu();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Add stagger effect for multiple items
            if (entry.target.classList.contains('stagger-container')) {
                const items = entry.target.querySelectorAll('.stagger-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    initTheme();
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('section, .details-container, .btn, .icon');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
    // Add stagger animation to experience articles
    const experienceContainers = document.querySelectorAll('.article-container');
    experienceContainers.forEach(container => {
        container.classList.add('stagger-container');
        const articles = container.querySelectorAll('article');
        articles.forEach(article => {
            article.classList.add('stagger-item');
        });
        observer.observe(container);
    });
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize progress bars
    initProgressBars();
    
    // Initialize card hover effects
    initCardHoverEffects();
    
    // Initialize navbar scroll effect
    initNavbarScrollEffect();
    
    // Initialize loading animations
    initLoadingAnimations();
});

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Typing effect for title
function initTypingEffect() {
    const title = document.querySelector('.title');
    if (title && !title.classList.contains('typing-initialized')) {
        const text = title.textContent;
        title.textContent = '';
        title.classList.add('typing-effect', 'typing-initialized');
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    title.classList.remove('typing-effect');
                }, 1000);
            }
        };
        
        // Start typing after a delay
        setTimeout(typeWriter, 500);
    }
}
