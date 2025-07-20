// Theme Manager Module
// Handles dark/light theme switching with localStorage persistence

export class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themeToggle = null;
        this.themeIcon = null;
        this.init();
    }

    init() {
        // DOM Interaction: Select elements
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.querySelector('.theme-icon');
        
        // Load saved theme from localStorage
        this.loadTheme();
        
        // Event listener for theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    loadTheme() {
        // Conditional branching: Check localStorage for saved theme
        const savedTheme = localStorage.getItem('portfolio-theme');
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.currentTheme = prefersDark ? 'dark' : 'light';
        }
        
        this.applyTheme();
    }

    toggleTheme() {
        // Conditional branching: Switch between themes
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.saveTheme();
    }

    applyTheme() {
        // DOM manipulation: Modify document attributes
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Update theme icon
        if (this.themeIcon) {
            this.themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
        
        // Update theme toggle aria-label
        if (this.themeToggle) {
            this.themeToggle.setAttribute('aria-label', 
                this.currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            );
        }
    }

    saveTheme() {
        // localStorage persistence
        localStorage.setItem('portfolio-theme', this.currentTheme);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
} 