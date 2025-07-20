// Navigation Manager Module
// Handles mobile navigation, smooth scrolling, and active link management

export class NavigationManager {
    constructor() {
        this.navToggle = null;
        this.navMenu = null;
        this.navLinks = [];
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        // DOM Interaction: Select navigation elements
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        // Event listeners
        this.setupEventListeners();
        
        // Initialize active link
        this.setActiveLink();
    }

    setupEventListeners() {
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    toggleMobileMenu() {
        // Conditional branching: Toggle menu state
        this.isMenuOpen = !this.isMenuOpen;
        
        // DOM manipulation: Modify classes
        this.navToggle.classList.toggle('active', this.isMenuOpen);
        this.navMenu.classList.toggle('active', this.isMenuOpen);
        
        // Update aria attributes for accessibility
        this.navToggle.setAttribute('aria-expanded', this.isMenuOpen.toString());
    }

    handleNavClick(event) {
        const link = event.currentTarget;
        const href = link.getAttribute('href');
        
        // Conditional branching: Handle different link types
        if (href.startsWith('#')) {
            // Smooth scroll to section
            event.preventDefault();
            this.smoothScrollTo(href);
        }
        
        // Close mobile menu
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Update active link
        this.setActiveLink(link);
    }

    handleOutsideClick(event) {
        // Conditional branching: Close menu if clicking outside
        if (this.isMenuOpen && 
            !this.navToggle.contains(event.target) && 
            !this.navMenu.contains(event.target)) {
            this.closeMobileMenu();
        }
    }

    handleResize() {
        // Conditional branching: Close mobile menu on desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
    }

    smoothScrollTo(targetId) {
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    setActiveLink(activeLink = null) {
        // Remove active class from all links
        this.navLinks.forEach(link => link.classList.remove('active'));
        
        // Conditional branching: Set active link based on current page or provided link
        if (activeLink) {
            activeLink.classList.add('active');
        } else {
            // Auto-detect active link based on current section
            this.autoSetActiveLink();
        }
    }

    autoSetActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        // Array method: forEach to iterate through sections
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Conditional branching: Check if section is in view
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const correspondingLink = document.querySelector(`[href="#${sectionId}"]`);
                if (correspondingLink) {
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Method to handle scroll events for active link updates
    handleScroll() {
        this.autoSetActiveLink();
    }
} 