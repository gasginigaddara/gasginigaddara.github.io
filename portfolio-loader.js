// Portfolio Data Loader Module
// Handles loading, filtering, and rendering of portfolio projects from JSON files

class PortfolioDataLoader {
    constructor() {
        this.allProjects = [];
        this.categories = ['trainer', 'researcher', 'consultant', 'academic', 'public-speaker', 'administrator', 'social-enthusiast'];
        this.currentFilter = 'all';
        this.maxCardsToShow = 6;
    }

    // Load all project data from JSON files
    async loadAllData() {
        try {
            const promises = this.categories.map(async (category) => {
                const response = await fetch(`portfolio-data/${category}/projects.json`);
                if (!response.ok) {
                    console.warn(`Failed to load ${category} projects`);
                    return [];
                }
                const projects = await response.json();
                return projects;
            });

            const results = await Promise.all(promises);
            this.allProjects = results.flat();

            // Sort by timestamp (newest first)
            this.allProjects.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            return this.allProjects;
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            return [];
        }
    }

    // Get projects for display based on current filter
    getProjectsForDisplay(filter = 'all') {
        let projects;

        if (filter === 'all') {
            // Get latest project from each category (max 6)
            projects = this.getLatestFromEachCategory();
        } else {
            // Get projects from specific category
            const categoryName = this.getCategoryName(filter);
            projects = this.allProjects.filter(p => p.category === categoryName);
        }

        // Return max 6 projects
        return projects.slice(0, this.maxCardsToShow);
    }

    // Get all projects for modal view
    getAllProjectsForModal(filter = 'all') {
        if (filter === 'all') {
            return this.allProjects;
        } else {
            const categoryName = this.getCategoryName(filter);
            return this.allProjects.filter(p => p.category === categoryName);
        }
    }

    // Get latest project from each category
    getLatestFromEachCategory() {
        const latestProjects = [];
        const categoriesUsed = new Set();

        for (const project of this.allProjects) {
            if (!categoriesUsed.has(project.category) && latestProjects.length < this.maxCardsToShow) {
                latestProjects.push(project);
                categoriesUsed.add(project.category);
            }
        }

        return latestProjects;
    }

    // Convert filter class to category name
    getCategoryName(filter) {
        const filterMap = {
            '.category-a': 'trainer',
            '.category-b': 'researcher',
            '.category-c': 'consultant',
            '.category-d': 'academic',
            '.category-e': 'public-speaker',
            '.category-f': 'administrator',
            '.category-g': 'social-enthusiast'
        };
        return filterMap[filter] || 'trainer';
    }

    // Get category class from category name
    getCategoryClass(categoryName) {
        const categoryMap = {
            'trainer': 'category-a',
            'researcher': 'category-b',
            'consultant': 'category-c',
            'academic': 'category-d',
            'public-speaker': 'category-e',
            'administrator': 'category-f',
            'social-enthusiast': 'category-g'
        };
        return categoryMap[categoryName] || 'category-a';
    }

    // Get category display name
    getCategoryDisplayName(categoryName) {
        const displayNames = {
            'trainer': 'Trainer',
            'researcher': 'Researcher',
            'consultant': 'Consultant',
            'academic': 'Academic',
            'public-speaker': 'Public Speaker',
            'administrator': 'Administrator',
            'social-enthusiast': 'Social Enthusiast'
        };
        return displayNames[categoryName] || categoryName;
    }

    // Get distinct superset of projects for DOM (Top 6 of each category)
    getSupersetProjects() {
        const superset = new Map(); // Use Map to avoid duplicates if any

        // 1. Get Top 6 of each category
        this.categories.forEach(category => {
            const catProjects = this.allProjects.filter(p => p.category === category)
                .slice(0, this.maxCardsToShow);

            catProjects.forEach((p, index) => {
                // Mark if it's the latest in its category (index 0)
                if (index === 0) {
                    p.isLatest = true;
                }
                superset.set(p.title + p.category, p); // Unique key
            });
        });

        return Array.from(superset.values());
    }

    // Get project image with category-specific default fallback
    getProjectImage(project) {
        // If project has an image and it's not empty, use it
        if (project.image && project.image.trim() !== '') {
            return project.image.replace('Images/', 'img/');
        }

        // Otherwise, use category-specific default image
        const categoryDefaults = {
            'trainer': 'img/default/trainer.jpg',
            'researcher': 'img/default/researcher.jpg',
            'consultant': 'img/default/consultant.jpg',
            'academic': 'img/default/academic.jpg',
            'public-speaker': 'img/default/public-speaker.jpg',
            'administrator': 'img/default/administrator.jpg',
            'social-enthusiast': 'img/default/social-enthusiast.jpg'
        };

        // Return category-specific default or generic fallback
        return categoryDefaults[project.category] || 'img/hero.jpg';
    }

    // Render a single project card
    createProjectCard(project) {
        const categoryClass = this.getCategoryClass(project.category);
        // Add 'mix-latest' class if it's the latest project
        const latestClass = project.isLatest ? 'mix-latest' : '';
        const projectImage = this.getProjectImage(project);

        const hasLink = project.link && project.link.trim() !== '' && project.link !== '#';
        const tag = hasLink ? 'a' : 'div';
        const linkAttrs = hasLink ? `href="${project.link}" target="_blank" rel="noopener noreferrer"` : 'style="cursor: default;"';

        // Removed inline display:none - let MixItUp handle visibility
        return `
            <div class="col-lg-4 col-md-6 mix ${categoryClass} ${latestClass}">
                <${tag} ${linkAttrs} class="portfolio-card-link">
                    <div class="portfolio_img">
                        <img src="${projectImage}" alt="${project.title}" onerror="this.src='img/hero.jpg'">
                        <div class="portfolio-overlay">
                            <div class="portfolio-info">
                                <h3 class="portfolio-title">${project.title}</h3>
                                <p class="portfolio-description">${project.description}</p>
                            </div>
                        </div>
                    </div>
                </${tag}>
            </div>
        `;
    }

    // Render project card for swiper (mobile)
    createSwiperSlide(project) {
        const categoryClass = this.getCategoryClass(project.category);
        const projectImage = this.getProjectImage(project);

        const hasLink = project.link && project.link.trim() !== '' && project.link !== '#';
        const tag = hasLink ? 'a' : 'div';
        const linkAttrs = hasLink ? `href="${project.link}" target="_blank" rel="noopener noreferrer"` : 'style="cursor: default;"';

        return `
            <div class="swiper-slide ${categoryClass}">
                <${tag} ${linkAttrs} class="portfolio-card-link">
                    <div class="portfolio_img">
                        <img src="${projectImage}" alt="${project.title}" onerror="this.src='img/hero.jpg'">
                        <div class="portfolio-overlay">
                            <div class="portfolio-info">
                                <h3 class="portfolio-title">${project.title}</h3>
                                <p class="portfolio-description">${project.description}</p>
                            </div>
                        </div>
                    </div>
                </${tag}>
            </div>
        `;
    }

    // Render projects to desktop grid
    renderDesktopGrid(projects) {
        const gridContainer = document.querySelector('.portfolio_images');
        if (!gridContainer) return;

        gridContainer.innerHTML = projects.map(project => this.createProjectCard(project)).join('');
    }

    // Render projects to mobile swiper
    renderMobileSwiper(projects, swiperInstance) {
        if (!swiperInstance) return;

        const slides = projects.map(project => this.createSwiperSlide(project));
        swiperInstance.removeAllSlides();
        swiperInstance.appendSlide(slides);
        swiperInstance.update();

        // Enable looping if we have enough slides
        if (projects.length > 1) {
            swiperInstance.params.loop = true;
            swiperInstance.loopDestroy();
            swiperInstance.loopCreate();
        }

        swiperInstance.slideTo(0, 0); // Jump to first slide without animation
    }

    // Render modal content - always show all categories with optional scroll-to
    renderModalContent(projects, filter = 'all', scrollToCategoryName = null) {
        const modalBody = document.getElementById('portfolioModalBody');
        if (!modalBody) return;

        let html = '';

        // Always group by category for better UX
        const groupedProjects = {};
        this.categories.forEach(cat => {
            groupedProjects[cat] = this.allProjects.filter(p => p.category === cat);
        });

        for (const [category, categoryProjects] of Object.entries(groupedProjects)) {
            if (categoryProjects.length === 0) continue;

            const sectionId = `modal-category-${category}`;
            html += `
                <div class="modal-category-section" id="${sectionId}">
                    <h3 class="modal-category-title">${this.getCategoryDisplayName(category)}</h3>
                    <div class="row g-4">
                        ${categoryProjects.map(project => this.createProjectCard(project)).join('')}
                    </div>
                </div>
            `;
        }

        modalBody.innerHTML = html;

        // Scroll to specific category if specified
        if (scrollToCategoryName && scrollToCategoryName !== 'all') {
            setTimeout(() => {
                const targetSection = document.getElementById(`modal-category-${scrollToCategoryName}`);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        }
    }
}

// Initialize portfolio loader
let portfolioLoader;
let portfolioSwiper;
let mixer;

document.addEventListener('DOMContentLoaded', async () => {
    portfolioLoader = new PortfolioDataLoader();

    // Show loading state
    const gridContainer = document.querySelector('.portfolio_images');
    if (gridContainer) {
        gridContainer.innerHTML = '<div class="col-12 text-center"><p>Loading projects...</p></div>';
    }

    // Load all data
    await portfolioLoader.loadAllData();

    // Initial render - Render Superset (Top 6 of each category)
    // This allows MixItUp to filter existing DOM elements for smooth animations
    const supersetProjects = portfolioLoader.getSupersetProjects();
    portfolioLoader.renderDesktopGrid(supersetProjects);

    // Initial Render for Mobile (just show latest like desktop initially)
    const initialMobileProjects = portfolioLoader.getProjectsForDisplay('all');

    // Initialize MixItUp for desktop filtering with animations
    const portfolioContainer = document.querySelector('.portfolio_images');
    if (portfolioContainer) {
        mixer = mixitup('.portfolio_images', {
            selectors: {
                target: '.mix'
            },
            load: {
                filter: '.mix-latest' // Start with 'All' view (latest projects)
            },
            animation: {
                duration: 400,
                nudge: true,
                reverseOut: false,
                effects: 'fade scale(0.5)'
            }
        });
    }

    // Initialize Swiper for mobile
    portfolioSwiper = new Swiper('.portfolioSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true, // Enable looping
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        allowTouchMove: true, // Allow swiping
        simulateTouch: true,
    });

    portfolioLoader.renderMobileSwiper(initialMobileProjects, portfolioSwiper);

    // Set first button as active initially
    const filterButtons = document.querySelectorAll('.category button');
    if (filterButtons.length > 0) {
        filterButtons[0].classList.add('mixitup-control-active');
    }

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const filterValue = this.getAttribute('data-filter');
            portfolioLoader.currentFilter = filterValue;

            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('mixitup-control-active'));
            this.classList.add('mixitup-control-active');

            // 1. Handle Desktop (MixItUp)
            if (mixer) {
                if (filterValue === 'all') {
                    mixer.filter('.mix-latest'); // Filter by our special class
                } else {
                    mixer.filter(filterValue); // Filter by category class
                }
            }

            // 2. Handle Mobile (Re-render Swiper)
            // Mobile needs explicit re-render because it's a carousel, not a filtered grid
            const filteredProjects = portfolioLoader.getProjectsForDisplay(filterValue);
            portfolioLoader.renderMobileSwiper(filteredProjects, portfolioSwiper);
        });
    });

    // Handle "View All" button click
    const viewAllBtn = document.getElementById('viewAllBtn');
    const portfolioModal = new bootstrap.Modal(document.getElementById('portfolioModal'));

    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            const currentFilter = portfolioLoader.currentFilter;

            // Get category name for scroll-to functionality
            let scrollToCategoryName = null;
            if (currentFilter !== 'all') {
                scrollToCategoryName = portfolioLoader.getCategoryName(currentFilter);
            }

            // Always show all projects but scroll to selected category
            portfolioLoader.renderModalContent(portfolioLoader.allProjects, 'all', scrollToCategoryName);
            portfolioModal.show();
        });
    }
});

