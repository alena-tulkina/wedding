// Плавные анимации при прокрутке
class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        // Находим все элементы для анимации
        this.findAnimatedElements();
        
        // Добавляем обработчики событий
        this.addEventListeners();
        
        // Запускаем первую проверку
        this.checkAnimations();
    }

    findAnimatedElements() {
        // Находим все элементы с классами анимаций
        const selectors = [
            '.fade-in',
            '.slide-in-left', 
            '.slide-in-right',
            '.scale-in'
        ];

        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.animatedElements.push({
                    element: element,
                    animated: false
                });
            });
        });
    }

    addEventListeners() {
        // Обработчик прокрутки с throttling для производительности
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.checkAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Обработчик изменения размера окна
        window.addEventListener('resize', () => {
            this.checkAnimations();
        });

        // Обработчик загрузки страницы
        window.addEventListener('load', () => {
            this.checkAnimations();
        });
    }

    checkAnimations() {
        const windowHeight = window.innerHeight;
        const triggerOffset = windowHeight * 0.8; // Элемент появляется когда 80% его высоты видно

        this.animatedElements.forEach(item => {
            if (item.animated) return;

            const element = item.element;
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementHeight = rect.height;

            // Проверяем, виден ли элемент
            if (elementTop < triggerOffset && elementTop + elementHeight > 0) {
                this.animateElement(element);
                item.animated = true;
            }
        });
    }

    animateElement(element) {
        // Добавляем класс visible для запуска анимации
        element.classList.add('visible');
        
        // Добавляем небольшую задержку для более плавного эффекта
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 50);
    }

    // Метод для принудительного запуска анимации элемента
    forceAnimate(element) {
        const item = this.animatedElements.find(item => item.element === element);
        if (item && !item.animated) {
            this.animateElement(element);
            item.animated = true;
        }
    }

    // Метод для сброса анимаций (полезно для тестирования)
    resetAnimations() {
        this.animatedElements.forEach(item => {
            item.element.classList.remove('visible');
            item.animated = false;
        });
    }
}

// Дополнительные эффекты для особых элементов
class SpecialEffects {
    constructor() {
        this.init();
    }

    init() {
        this.initParallaxEffect();
        this.initHeroAnimations();
    }

    initParallaxEffect() {
        // Легкий параллакс эффект для фонового изображения
        const heroPhoto = document.querySelector('.hero-photo');
        if (heroPhoto) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroPhoto.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    initHeroAnimations() {
        // Специальные анимации для hero секции
        const heroTitle = document.querySelector('.hero-title');
        const heroText = document.querySelector('.hero-text');
        const heroDate = document.querySelector('.hero-date');
        const heroLocation = document.querySelector('.hero-location');

        if (heroTitle) {
            setTimeout(() => {
                heroTitle.classList.add('fade-in', 'visible');
            }, 300);
        }

        if (heroText) {
            setTimeout(() => {
                heroText.classList.add('fade-in', 'visible');
            }, 600);
        }

        if (heroDate) {
            setTimeout(() => {
                heroDate.classList.add('scale-in', 'visible');
            }, 900);
        }

        if (heroLocation) {
            setTimeout(() => {
                heroLocation.classList.add('fade-in', 'visible');
            }, 1200);
        }
    }
}

// Инициализация анимаций при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    // Создаем экземпляры классов
    window.scrollAnimations = new ScrollAnimations();
    window.specialEffects = new SpecialEffects();
    
    console.log('🎉 Анимации инициализированы!');
});

// Экспорт для возможного использования в других скриптах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScrollAnimations, SpecialEffects };
} 