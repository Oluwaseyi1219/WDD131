// Animation Manager Module
// Handles scroll animations, skill progress bars, and intersection observer

export class AnimationManager {
    constructor() {
        this.animatedElements = [];
        this.skillBars = [];
        this.observer = null;
        this.init();
    }

    init() {
        // DOM Interaction: Select elements for animation
        this.setupIntersectionObserver();
        this.setupSkillBars();
        this.setupScrollAnimations();
    }

    setupIntersectionObserver() {
        // Create intersection observer for fade-in animations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Conditional branching: Check if element is intersecting
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Special handling for skill bars
                    if (entry.target.classList.contains('skill-progress')) {
                        this.animateSkillBar(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all elements with fade-in class
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    setupSkillBars() {
        // DOM Interaction: Select skill progress bars
        this.skillBars = document.querySelectorAll('.skill-progress');
        
        // Array method: forEach to setup skill bars
        this.skillBars.forEach(skillBar => {
            this.observer.observe(skillBar);
        });
    }

    setupScrollAnimations() {
        // Add scroll event listener for additional animations
        window.addEventListener('scroll', () => {
            this.handleScrollAnimations();
        });
    }

    animateSkillBar(skillBar) {
        // Get progress value from data attribute
        const progress = skillBar.getAttribute('data-progress');
        
        // Conditional branching: Ensure progress is valid
        if (progress && !isNaN(progress)) {
            // Animate the skill bar
            skillBar.style.width = '0%';
            
            setTimeout(() => {
                skillBar.style.width = `${progress}%`;
            }, 100);
        }
    }

    handleScrollAnimations() {
        // Get scroll position
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Animate elements based on scroll position
        this.animateOnScroll(scrollPosition, windowHeight);
    }

    animateOnScroll(scrollPosition, windowHeight) {
        // Get all elements that need scroll animations
        const scrollElements = document.querySelectorAll('[data-scroll-animation]');
        
        // Array method: forEach to animate elements
        scrollElements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            
            // Conditional branching: Check if element is in view
            if (scrollPosition + windowHeight > elementTop && 
                scrollPosition < elementTop + elementHeight) {
                
                const animationType = element.getAttribute('data-scroll-animation');
                this.applyScrollAnimation(element, animationType);
            }
        });
    }

    applyScrollAnimation(element, animationType) {
        // Conditional branching: Apply different animations
        switch (animationType) {
            case 'slide-up':
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
                break;
            case 'slide-left':
                element.style.transform = 'translateX(0)';
                element.style.opacity = '1';
                break;
            case 'slide-right':
                element.style.transform = 'translateX(0)';
                element.style.opacity = '1';
                break;
            case 'scale':
                element.style.transform = 'scale(1)';
                element.style.opacity = '1';
                break;
            default:
                element.style.opacity = '1';
        }
    }

    // Animate statistics numbers
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        // Array method: forEach to animate each stat
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                
                // Conditional branching: Check if animation is complete
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Parallax effect for hero section
    setupParallax() {
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrollPosition = window.scrollY;
                const parallaxSpeed = 0.5;
                
                // Conditional branching: Apply parallax only on desktop
                if (window.innerWidth > 768) {
                    heroSection.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
                }
            });
        }
    }

    // Typing animation for hero title
    setupTypingAnimation() {
        const heroRole = document.querySelector('.hero-role');
        
        if (heroRole) {
            const text = heroRole.textContent;
            heroRole.textContent = '';
            
            let index = 0;
            const typeSpeed = 100; // milliseconds per character
            
            const typeWriter = () => {
                // Conditional branching: Check if typing is complete
                if (index < text.length) {
                    heroRole.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, typeSpeed);
                }
            };
            
            // Start typing animation after a delay
            setTimeout(typeWriter, 1000);
        }
    }

    // Smooth reveal animation for sections
    setupSectionReveals() {
        const sections = document.querySelectorAll('section');
        
        // Array method: forEach to setup section reveals
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            
            // Stagger the animations
            setTimeout(() => {
                section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Hover animations for interactive elements
    setupHoverAnimations() {
        const interactiveElements = document.querySelectorAll('.btn, .project-card, .post-card, .stat');
        
        // Array method: forEach to setup hover effects
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Loading animation
    showLoadingAnimation() {
        const loadingElement = document.createElement('div');
        loadingElement.className = 'loading-overlay';
        loadingElement.innerHTML = '<div class="loading"></div>';
        
        document.body.appendChild(loadingElement);
        
        // Remove loading animation after content loads
        setTimeout(() => {
            loadingElement.remove();
        }, 2000);
    }

    // Initialize all animations
    startAnimations() {
        this.setupParallax();
        this.setupTypingAnimation();
        this.setupSectionReveals();
        this.setupHoverAnimations();
        
        // Start stats animation when stats section is visible
        const statsSection = document.querySelector('.about-stats');
        if (statsSection) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateStats();
                        statsObserver.unobserve(entry.target);
                    }
                });
            });
            
            statsObserver.observe(statsSection);
        }
    }

    // Utility method to add animation class
    addAnimationClass(element, className) {
        element.classList.add(className);
    }

    // Utility method to remove animation class
    removeAnimationClass(element, className) {
        element.classList.remove(className);
    }

    // Get animation state
    getAnimationState(element) {
        return {
            isVisible: element.classList.contains('visible'),
            isAnimating: element.style.transition !== '',
            opacity: element.style.opacity,
            transform: element.style.transform
        };
    }
} 