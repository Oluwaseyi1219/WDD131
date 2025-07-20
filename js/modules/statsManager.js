// Stats Manager Module
// Handles statistics animation and counter functionality

export class StatsManager {
    constructor() {
        this.statsElements = [];
        this.animatedStats = new Set();
        this.init();
    }

    init() {
        // DOM Interaction: Select statistics elements
        this.statsElements = document.querySelectorAll('.stat-number');
        this.setupStatsObserver();
    }

    setupStatsObserver() {
        // Create intersection observer for stats animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Conditional branching: Check if stats section is visible and not already animated
                if (entry.isIntersecting && !this.animatedStats.has(entry.target)) {
                    this.animateStat(entry.target);
                    this.animatedStats.add(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });

        // Array method: forEach to observe all stat elements
        this.statsElements.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    animateStat(statElement) {
        // Get target value from data attribute
        const target = parseInt(statElement.getAttribute('data-target'));
        
        // Conditional branching: Validate target value
        if (!target || isNaN(target)) {
            console.warn('Invalid target value for stat:', statElement);
            return;
        }

        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        const startValue = 0;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            // Update the stat element
            statElement.textContent = currentValue;
            
            // Conditional branching: Continue animation or complete
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                statElement.textContent = target;
            }
        };

        requestAnimationFrame(animate);
    }

    // Reset all stats to zero
    resetStats() {
        // Array method: forEach to reset all stats
        this.statsElements.forEach(stat => {
            stat.textContent = '0';
            this.animatedStats.delete(stat);
        });
    }

    // Manually trigger stats animation
    triggerStatsAnimation() {
        // Array method: forEach to animate all stats
        this.statsElements.forEach(stat => {
            if (!this.animatedStats.has(stat)) {
                this.animateStat(stat);
                this.animatedStats.add(stat);
            }
        });
    }

    // Get current stats values
    getCurrentStats() {
        // Array method: map to get current values
        return this.statsElements.map(stat => ({
            element: stat,
            currentValue: parseInt(stat.textContent) || 0,
            targetValue: parseInt(stat.getAttribute('data-target')) || 0,
            isAnimated: this.animatedStats.has(stat)
        }));
    }

    // Update stat target value
    updateStatTarget(statElement, newTarget) {
        // Conditional branching: Validate new target
        if (newTarget < 0 || isNaN(newTarget)) {
            console.error('Invalid target value:', newTarget);
            return false;
        }

        statElement.setAttribute('data-target', newTarget.toString());
        this.animatedStats.delete(statElement);
        
        // Re-animate if element is visible
        const rect = statElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            this.animateStat(statElement);
            this.animatedStats.add(statElement);
        }

        return true;
    }

    // Add new stat element
    addStatElement(targetValue, label) {
        const statsContainer = document.querySelector('.about-stats');
        
        if (!statsContainer) {
            console.error('Stats container not found');
            return null;
        }

        // Create new stat element
        const statDiv = document.createElement('div');
        statDiv.className = 'stat';
        
        statDiv.innerHTML = `
            <span class="stat-number" data-target="${targetValue}">0</span>
            <span class="stat-label">${label}</span>
        `;

        statsContainer.appendChild(statDiv);
        
        // Add to stats elements array
        const newStatElement = statDiv.querySelector('.stat-number');
        this.statsElements.push(newStatElement);
        
        // Setup observer for new element
        this.setupStatsObserver();
        
        return newStatElement;
    }

    // Remove stat element
    removeStatElement(statElement) {
        // Conditional branching: Check if element exists
        if (!statElement || !this.statsElements.includes(statElement)) {
            console.error('Stat element not found');
            return false;
        }

        // Remove from arrays and sets
        this.statsElements = this.statsElements.filter(stat => stat !== statElement);
        this.animatedStats.delete(statElement);
        
        // Remove from DOM
        const statContainer = statElement.closest('.stat');
        if (statContainer) {
            statContainer.remove();
        }

        return true;
    }

    // Get statistics summary
    getStatsSummary() {
        // Array method: reduce to calculate summary
        return this.statsElements.reduce((summary, stat) => {
            const target = parseInt(stat.getAttribute('data-target')) || 0;
            summary.totalTarget += target;
            summary.averageTarget = summary.totalTarget / this.statsElements.length;
            summary.animatedCount = this.animatedStats.size;
            return summary;
        }, {
            totalElements: this.statsElements.length,
            totalTarget: 0,
            averageTarget: 0,
            animatedCount: 0
        });
    }

    // Export stats data
    exportStatsData() {
        // Array method: map to create exportable data
        return this.statsElements.map(stat => ({
            id: stat.id || `stat-${Math.random().toString(36).substr(2, 9)}`,
            target: parseInt(stat.getAttribute('data-target')) || 0,
            current: parseInt(stat.textContent) || 0,
            label: stat.nextElementSibling?.textContent || '',
            isAnimated: this.animatedStats.has(stat)
        }));
    }

    // Import stats data
    importStatsData(statsData) {
        // Conditional branching: Validate input data
        if (!Array.isArray(statsData)) {
            console.error('Invalid stats data format');
            return false;
        }

        // Clear existing stats
        this.resetStats();
        
        // Array method: forEach to import data
        statsData.forEach(statData => {
            const statElement = document.querySelector(`[data-target="${statData.target}"]`);
            if (statElement) {
                this.updateStatTarget(statElement, statData.target);
            }
        });

        return true;
    }

    // Utility method to format large numbers
    formatNumber(number) {
        // Conditional branching: Format based on size
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'K';
        }
        return number.toString();
    }

    // Get animation progress for a stat
    getAnimationProgress(statElement) {
        const current = parseInt(statElement.textContent) || 0;
        const target = parseInt(statElement.getAttribute('data-target')) || 0;
        
        // Conditional branching: Handle zero target
        if (target === 0) return 0;
        
        return (current / target) * 100;
    }
} 