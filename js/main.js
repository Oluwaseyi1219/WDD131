// Main JavaScript file for DevPortfolio Pro
// ES6 Module structure with all required dynamic features

// Import modules
import { ThemeManager } from './modules/themeManager.js';
import { NavigationManager } from './modules/navigationManager.js';
import { ProjectManager } from './modules/projectManager.js';
import { BlogManager } from './modules/blogManager.js';
import { AnimationManager } from './modules/animationManager.js';
import { StatsManager } from './modules/statsManager.js';

// Main App Class
class PortfolioApp {
    constructor() {
        this.modules = {};
        this.init();
    }

    init() {
        // Initialize all modules
        this.modules.theme = new ThemeManager();
        this.modules.navigation = new NavigationManager();
        this.modules.projects = new ProjectManager();
        this.modules.blog = new BlogManager();
        this.modules.animations = new AnimationManager();
        this.modules.stats = new StatsManager();

        // Start the application
        this.start();
    }

    start() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }

    onDOMReady() {
        console.log('DevPortfolio Pro - Application Started');
        
        // Initialize all features
        this.modules.theme.init();
        this.modules.navigation.init();
        this.modules.projects.loadFeaturedProjects();
        this.modules.blog.loadLatestPosts();
        this.modules.animations.init();
        this.modules.stats.init();
    }
}

// Initialize the application
const app = new PortfolioApp();

// Export for potential external use
export default app; 