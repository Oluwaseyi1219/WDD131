// Project Manager Module
// Handles project data, filtering, and dynamic display using objects and arrays

export class ProjectManager {
    constructor() {
        // Object: Project data structure
        this.projects = [
            {
                id: 1,
                title: "E-Commerce Platform",
                description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.",
                image: "images/projects/ecommerce.jpg",
                technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
                category: "fullstack",
                liveUrl: "https://ecommerce-demo.com",
                githubUrl: "https://github.com/username/ecommerce",
                featured: true
            },
            {
                id: 2,
                title: "Task Management App",
                description: "A responsive task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
                image: "images/projects/task-manager.jpg",
                technologies: ["JavaScript", "CSS3", "HTML5", "LocalStorage"],
                category: "frontend",
                liveUrl: "https://task-manager-demo.com",
                githubUrl: "https://github.com/username/task-manager",
                featured: true
            },
            {
                id: 3,
                title: "Weather Dashboard",
                description: "A weather application that displays current weather and forecasts using multiple APIs. Features include location detection and weather alerts.",
                image: "images/projects/weather.jpg",
                technologies: ["JavaScript", "API Integration", "CSS3", "HTML5"],
                category: "frontend",
                liveUrl: "https://weather-demo.com",
                githubUrl: "https://github.com/username/weather-app",
                featured: true
            },
            {
                id: 4,
                title: "Blog CMS",
                description: "A content management system for blogs with markdown support, user roles, and SEO optimization features.",
                image: "images/projects/blog-cms.jpg",
                technologies: ["React", "Node.js", "PostgreSQL", "Express"],
                category: "fullstack",
                liveUrl: "https://blog-cms-demo.com",
                githubUrl: "https://github.com/username/blog-cms",
                featured: false
            },
            {
                id: 5,
                title: "Portfolio Website",
                description: "A responsive portfolio website with modern design, animations, and contact form functionality.",
                image: "images/projects/portfolio.jpg",
                technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
                category: "frontend",
                liveUrl: "https://portfolio-demo.com",
                githubUrl: "https://github.com/username/portfolio",
                featured: false
            },
            {
                id: 6,
                title: "API Gateway",
                description: "A microservices API gateway with authentication, rate limiting, and request routing capabilities.",
                image: "images/projects/api-gateway.jpg",
                technologies: ["Node.js", "Express", "Redis", "JWT"],
                category: "backend",
                liveUrl: "https://api-gateway-demo.com",
                githubUrl: "https://github.com/username/api-gateway",
                featured: false
            }
        ];

        this.projectsGrid = null;
        this.filters = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        // DOM Interaction: Select projects grid
        this.projectsGrid = document.getElementById('projectsGrid');
        
        // Initialize if on projects page
        if (this.projectsGrid) {
            this.setupFilters();
            this.loadFeaturedProjects();
        }
    }

    setupFilters() {
        // Array method: map to get unique categories
        const categories = [...new Set(this.projects.map(project => project.category))];
        
        // Create filter buttons
        const filterContainer = document.createElement('div');
        filterContainer.className = 'project-filters';
        
        // Add "All" filter
        const allFilter = this.createFilterButton('all', 'All Projects');
        filterContainer.appendChild(allFilter);
        
        // Array method: forEach to create category filters
        categories.forEach(category => {
            const filterButton = this.createFilterButton(category, this.capitalizeFirst(category));
            filterContainer.appendChild(filterButton);
        });
        
        // Insert filters before projects grid
        this.projectsGrid.parentNode.insertBefore(filterContainer, this.projectsGrid);
    }

    createFilterButton(category, label) {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.setAttribute('data-filter', category);
        button.textContent = label;
        
        // Conditional branching: Set active state
        if (category === 'all') {
            button.classList.add('active');
        }
        
        // Event listener for filtering
        button.addEventListener('click', () => this.filterProjects(category));
        
        return button;
    }

    filterProjects(category) {
        // Conditional branching: Handle filter selection
        this.currentFilter = category;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
        });
        
        // Array method: filter to get filtered projects
        const filteredProjects = category === 'all' 
            ? this.projects 
            : this.projects.filter(project => project.category === category);
        
        this.displayProjects(filteredProjects);
    }

    loadFeaturedProjects() {
        // Array method: filter to get featured projects
        const featuredProjects = this.projects.filter(project => project.featured);
        
        // Array method: slice to limit to 3 projects
        const limitedProjects = featuredProjects.slice(0, 3);
        
        this.displayProjects(limitedProjects);
    }

    displayProjects(projectsToShow) {
        if (!this.projectsGrid) return;
        
        // Clear existing projects
        this.projectsGrid.innerHTML = '';
        
        // Array method: forEach to create project cards
        projectsToShow.forEach(project => {
            const projectCard = this.createProjectCard(project);
            this.projectsGrid.appendChild(projectCard);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';
        
        // Array method: map to create technology tags
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.style.display='none'">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${techTags}
                </div>
                <div class="project-links">
                    <a href="${project.liveUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Live Demo</a>
                    <a href="${project.githubUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
            </div>
        `;
        
        return card;
    }

    // Array method: reduce to get project statistics
    getProjectStats() {
        return this.projects.reduce((stats, project) => {
            stats.total++;
            stats.byCategory[project.category] = (stats.byCategory[project.category] || 0) + 1;
            stats.byTechnology = project.technologies.reduce((techStats, tech) => {
                techStats[tech] = (techStats[tech] || 0) + 1;
                return techStats;
            }, stats.byTechnology);
            return stats;
        }, {
            total: 0,
            byCategory: {},
            byTechnology: {}
        });
    }

    // Search functionality using array methods
    searchProjects(query) {
        const searchTerm = query.toLowerCase();
        
        // Array method: filter with multiple conditions
        return this.projects.filter(project => 
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
        );
    }

    // Get projects by technology
    getProjectsByTechnology(technology) {
        // Array method: filter to find projects with specific technology
        return this.projects.filter(project => 
            project.technologies.includes(technology)
        );
    }

    // Utility method
    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Get all projects (for external use)
    getAllProjects() {
        return this.projects;
    }

    // Get featured projects (for external use)
    getFeaturedProjects() {
        return this.projects.filter(project => project.featured);
    }
} 