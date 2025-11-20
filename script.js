document.addEventListener('DOMContentLoaded', function() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    function switchTab(targetTab) {
        // Remove active class from all tabs and contents
        navTabs.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab
        const clickedTab = document.querySelector(`[data-tab="${targetTab}"]`);
        clickedTab.classList.add('active');
        
        // Show corresponding content
        const targetContent = document.getElementById(targetTab);
        targetContent.classList.add('active');
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Add click event listeners to navigation tabs
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    // Add smooth scrolling for better UX
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-tab')) {
            e.preventDefault();
        }
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key >= '1' && e.key <= '3') {
            const tabIndex = parseInt(e.key) - 1;
            const tabs = ['pc', 'android', 'apple'];
            if (tabs[tabIndex]) {
                switchTab(tabs[tabIndex]);
            }
        }
    });
    
    // Add intersection observer for smooth animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe step elements for animation
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(step);
    });

    // Theme toggle with localStorage
const themeButtons = document.querySelectorAll('.theme');
const body = document.body;

// Функция для применения темы
function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeButtons[0].classList.remove('active'); // солнце
        themeButtons[1].classList.add('active');   // луна
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeButtons[0].classList.add('active');   // солнце
        themeButtons[1].classList.remove('active'); // луна
    }
    localStorage.setItem('theme', theme); // сохраняем
}

// При загрузке страницы проверяем сохранённую тему
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else {
    // По умолчанию светлая
    setTheme('light');
}

// Навешиваем обработчики на кнопки
themeButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (index === 0) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });
});

document.querySelectorAll('.lazy-image img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});
});

