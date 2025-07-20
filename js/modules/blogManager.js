// Blog Manager Module
// Handles blog posts, search, filtering, and dynamic content display

export class BlogManager {
    constructor() {
        // Object: Blog post data structure
        this.blogPosts = [
            {
                id: 1,
                title: "Modern JavaScript ES6+ Features You Should Know",
                excerpt: "Explore the most important ES6+ features that every JavaScript developer should master, including arrow functions, destructuring, and async/await.",
                content: "Full article content here...",
                author: "Oluwaseyi Peter Omowole",
                date: "2024-01-15",
                tags: ["JavaScript", "ES6", "Web Development"],
                category: "tutorial",
                readTime: "8 min read",
                featured: true
            },
            {
                id: 2,
                title: "Building Responsive Web Applications with CSS Grid",
                excerpt: "Learn how to create flexible and responsive layouts using CSS Grid, with practical examples and best practices for modern web design.",
                content: "Full article content here...",
                author: "Oluwaseyi Peter Omowole",
                date: "2024-01-10",
                tags: ["CSS", "Grid", "Responsive Design"],
                category: "tutorial",
                readTime: "12 min read",
                featured: true
            },
            {
                id: 3,
                title: "React Performance Optimization Techniques",
                excerpt: "Discover advanced techniques to optimize React applications, including memoization, code splitting, and bundle optimization strategies.",
                content: "Full article content here...",
                author: "Oluwaseyi Peter Omowole",
                date: "2024-01-05",
                tags: ["React", "Performance", "Optimization"],
                category: "tutorial",
                readTime: "15 min read",
                featured: true
            },
            {
                id: 4,
                title: "The Future of Web Development: What's Next?",
                excerpt: "Explore emerging trends and technologies that will shape the future of web development, from WebAssembly to AI-powered tools.",
                content: "Full article content here...",
                author: "Oluwaseyi Peter Omowole",
                date: "2023-12-28",
                tags: ["Web Development", "Trends", "Future"],
                category: "insights",
                readTime: "10 min read",
                featured: false
            },
            {
                id: 5,
                title: "Building Accessible Web Applications",
                excerpt: "Learn how to create web applications that are accessible to all users, including those with disabilities, following WCAG guidelines.",
                content: "Full article content here...",
                author: "Oluwaseyi Peter Omowole",
                date: "2023-12-20",
                tags: ["Accessibility", "WCAG", "Inclusive Design"],
                category: "best-practices",
                readTime: "14 min read",
                featured: false
            },
            {
                id: 6,
                title: "Node.js Security Best Practices",
                excerpt: "Essential security practices for Node.js applications, including authentication, authorization, and protection against common vulnerabilities.",
                content: "Full article content here...",
                author: "Oluwaseyi Peter Omowole",
                date: "2023-12-15",
                tags: ["Node.js", "Security", "Backend"],
                category: "security",
                readTime: "18 min read",
                featured: false
            }
        ];

        this.postsGrid = null;
        this.searchInput = null;
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        // DOM Interaction: Select blog elements
        this.postsGrid = document.getElementById('postsGrid');
        this.searchInput = document.getElementById('blogSearch');
        
        // Initialize if on blog page
        if (this.postsGrid) {
            this.setupBlogFeatures();
            this.loadLatestPosts();
        }
    }

    setupBlogFeatures() {
        // Create search functionality
        this.createSearchBar();
        
        // Create category filters
        this.createCategoryFilters();
        
        // Setup search event listener
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }
    }

    createSearchBar() {
        if (!this.searchInput) {
            const searchContainer = document.createElement('div');
            searchContainer.className = 'blog-search-container';
            
            this.searchInput = document.createElement('input');
            this.searchInput.type = 'text';
            this.searchInput.id = 'blogSearch';
            this.searchInput.placeholder = 'Search blog posts...';
            this.searchInput.className = 'blog-search-input';
            
            searchContainer.appendChild(this.searchInput);
            this.postsGrid.parentNode.insertBefore(searchContainer, this.postsGrid);
            
            // Add event listener
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }
    }

    createCategoryFilters() {
        // Array method: map to get unique categories
        const categories = [...new Set(this.blogPosts.map(post => post.category))];
        
        const filterContainer = document.createElement('div');
        filterContainer.className = 'blog-filters';
        
        // Add "All" filter
        const allFilter = this.createCategoryButton('all', 'All Posts');
        filterContainer.appendChild(allFilter);
        
        // Array method: forEach to create category filters
        categories.forEach(category => {
            const filterButton = this.createCategoryButton(category, this.capitalizeFirst(category));
            filterContainer.appendChild(filterButton);
        });
        
        // Insert filters before posts grid
        this.postsGrid.parentNode.insertBefore(filterContainer, this.postsGrid);
    }

    createCategoryButton(category, label) {
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.setAttribute('data-category', category);
        button.textContent = label;
        
        // Conditional branching: Set active state
        if (category === 'all') {
            button.classList.add('active');
        }
        
        // Event listener for filtering
        button.addEventListener('click', () => this.filterByCategory(category));
        
        return button;
    }

    handleSearch(query) {
        // Conditional branching: Handle empty search
        if (!query.trim()) {
            this.filterByCategory(this.currentCategory);
            return;
        }
        
        // Array method: filter to search posts
        const searchResults = this.blogPosts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        
        this.displayPosts(searchResults);
    }

    filterByCategory(category) {
        // Conditional branching: Handle category selection
        this.currentCategory = category;
        
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-category') === category);
        });
        
        // Array method: filter to get posts by category
        const filteredPosts = category === 'all' 
            ? this.blogPosts 
            : this.blogPosts.filter(post => post.category === category);
        
        this.displayPosts(filteredPosts);
    }

    loadLatestPosts() {
        // Array method: filter to get featured posts
        const featuredPosts = this.blogPosts.filter(post => post.featured);
        
        // Array method: slice to limit to 3 posts
        const limitedPosts = featuredPosts.slice(0, 3);
        
        this.displayPosts(limitedPosts);
    }

    displayPosts(postsToShow) {
        if (!this.postsGrid) return;
        
        // Clear existing posts
        this.postsGrid.innerHTML = '';
        
        // Conditional branching: Handle empty results
        if (postsToShow.length === 0) {
            this.postsGrid.innerHTML = `
                <div class="no-posts">
                    <h3>No posts found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            return;
        }
        
        // Array method: forEach to create post cards
        postsToShow.forEach(post => {
            const postCard = this.createPostCard(post);
            this.postsGrid.appendChild(postCard);
        });
    }

    createPostCard(post) {
        const card = document.createElement('div');
        card.className = 'post-card fade-in';
        
        // Array method: map to create tag elements
        const tagElements = post.tags.map(tag => 
            `<span class="post-tag">${tag}</span>`
        ).join('');
        
        // Format date
        const formattedDate = this.formatDate(post.date);
        
        card.innerHTML = `
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-tags">
                    ${tagElements}
                </div>
                <div class="post-meta">
                    <span class="post-date">${formattedDate}</span>
                    <span class="post-read-time">${post.readTime}</span>
                </div>
                <a href="blog/post.html?id=${post.id}" class="btn btn-primary">Read More</a>
            </div>
        `;
        
        return card;
    }

    // Array method: reduce to get blog statistics
    getBlogStats() {
        return this.blogPosts.reduce((stats, post) => {
            stats.total++;
            stats.byCategory[post.category] = (stats.byCategory[post.category] || 0) + 1;
            stats.byTag = post.tags.reduce((tagStats, tag) => {
                tagStats[tag] = (tagStats[tag] || 0) + 1;
                return tagStats;
            }, stats.byTag);
            return stats;
        }, {
            total: 0,
            byCategory: {},
            byTag: {}
        });
    }

    // Get posts by tag
    getPostsByTag(tag) {
        // Array method: filter to find posts with specific tag
        return this.blogPosts.filter(post => 
            post.tags.includes(tag)
        );
    }

    // Get related posts
    getRelatedPosts(currentPostId, limit = 3) {
        const currentPost = this.blogPosts.find(post => post.id === currentPostId);
        
        if (!currentPost) return [];
        
        // Array method: filter and sort to get related posts
        return this.blogPosts
            .filter(post => 
                post.id !== currentPostId && 
                post.tags.some(tag => currentPost.tags.includes(tag))
            )
            .sort((a, b) => {
                // Sort by number of matching tags
                const aMatches = a.tags.filter(tag => currentPost.tags.includes(tag)).length;
                const bMatches = b.tags.filter(tag => currentPost.tags.includes(tag)).length;
                return bMatches - aMatches;
            })
            .slice(0, limit);
    }

    // Utility methods
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Get all posts (for external use)
    getAllPosts() {
        return this.blogPosts;
    }

    // Get featured posts (for external use)
    getFeaturedPosts() {
        return this.blogPosts.filter(post => post.featured);
    }

    // Get post by ID
    getPostById(id) {
        // Array method: find to get specific post
        return this.blogPosts.find(post => post.id === id);
    }
} 