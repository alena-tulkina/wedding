// Дополнительные нежные анимации для свадебной страницы
class EnhancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initFloatingElements();
        this.initTextReveal();
        this.initImageParallax();
        this.initScrollProgress();
    }

    // Плавающие элементы для создания нежного эффекта
    initFloatingElements() {
        const floatingElements = document.querySelectorAll('.hero-date, .hero-location-item');
        
        floatingElements.forEach((element, index) => {
            element.style.animation = `floating ${3 + index * 0.5}s ease-in-out infinite`;
        });

        // Добавляем CSS анимацию для плавания
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floating {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes gentlePulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
            
            @keyframes softGlow {
                0%, 100% { filter: brightness(1); }
                50% { filter: brightness(1.1); }
            }
        `;
        document.head.appendChild(style);
    }

    // Плавное появление текста по буквам
    initTextReveal() {
        const titles = document.querySelectorAll('.hero-title, .registry-title, .dinner-title, .form-title');
        
        titles.forEach(title => {
            const text = title.textContent;
            title.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s`;
                title.appendChild(span);
            });
        });
    }

    // Параллакс эффект для изображений
    initImageParallax() {
        const images = document.querySelectorAll('.registry-map, .dinner-map');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            images.forEach((image, index) => {
                const rate = scrolled * (0.3 + index * 0.1);
                const rect = image.getBoundingClientRect();
                
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    image.style.transform = `translateY(${rate}px) scale(1.02)`;
                }
            });
        });
    }

    // Индикатор прогресса прокрутки
    initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #FFB6C1, #FFC0CB, #FFE4E1);
            z-index: 1000;
            transition: width 0.1s ease;
            border-radius: 0 2px 2px 0;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // Нежные эффекты при наведении
    initHoverEffects() {
        const interactiveElements = document.querySelectorAll('.hero-location-item, .registry-content, .dinner-content');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px) scale(1.02)';
                element.style.filter = 'brightness(1.05)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
                element.style.filter = 'brightness(1)';
            });
        });
    }

    // Анимация появления секций с волновым эффектом
    initWaveReveal() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'waveReveal 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => {
            observer.observe(section);
        });

        // Добавляем CSS анимацию для волнового эффекта
        const style = document.createElement('style');
        style.textContent = `
            @keyframes waveReveal {
                0% {
                    opacity: 0;
                    transform: translateY(50px) scale(0.95);
                }
                50% {
                    opacity: 0.7;
                    transform: translateY(-10px) scale(1.02);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Инициализация улучшенных анимаций
document.addEventListener('DOMContentLoaded', () => {
    // Ждем немного для загрузки основных анимаций
    setTimeout(() => {
        window.enhancedAnimations = new EnhancedAnimations();
        console.log('✨ Улучшенные анимации загружены!');
    }, 500);
});

// Экспорт для возможного использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EnhancedAnimations };
} 