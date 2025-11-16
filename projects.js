// Projects Data
const projects = [
    {
        title: "Personal Portfolio Website",
        description: "A fully responsive portfolio website built with HTML5, CSS3, and vanilla JavaScript. Features smooth scrolling, mobile navigation, animated sections, and modern UI/UX design principles.",
        link: "https://github.com/Ethanjames41",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        icon: "fa-globe"
    },
    {
        title: "Excel Data Analysis Dashboard",
        description: "Comprehensive business intelligence project utilizing advanced Excel functions including VLOOKUP, pivot tables, conditional formatting, and dynamic charts for real-time data visualization and insights.",
        link: "#",
        technologies: ["Excel", "Data Analysis", "Visualization"],
        icon: "fa-chart-line"
    },
    {
        title: "Network Topology Design",
        description: "Designed and implemented a complete enterprise network infrastructure including routers, switches, VLANs, security protocols, and network documentation for a simulated business environment.",
        link: "#",
        technologies: ["Networking", "Cisco", "Security"],
        icon: "fa-network-wired"
    },
    {
        title: "Cloud Infrastructure Setup",
        description: "Built and deployed cloud-based infrastructure using AWS services including EC2 instances, S3 storage, and basic networking configurations for scalable web hosting.",
        link: "#",
        technologies: ["AWS", "Cloud Computing", "Linux"],
        icon: "fa-cloud"
    }
];

// Render Projects
const renderProjects = () => {
    const container = document.getElementById('project-container');
    
    if (!container) {
        console.error('Project container not found');
        return;
    }

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="project-icon">
                <i class="fa-solid ${project.icon}"></i>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">
                View Project <i class="fa-solid fa-arrow-right"></i>
            </a>
        `;
        
        container.appendChild(card);
    });
};

// Smooth Scrolling for Navigation Links
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                const navBar = document.querySelector('.nav-bar');
                if (navBar && navBar.classList.contains('active')) {
                    navBar.classList.remove('active');
                    const menuToggle = document.querySelector('.mobile-menu-toggle i');
                    if (menuToggle) {
                        menuToggle.classList.remove('fa-times');
                        menuToggle.classList.add('fa-bars');
                    }
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Mobile Menu Toggle
const initMobileMenu = () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navBar = document.querySelector('.nav-bar');
    
    if (mobileMenuToggle && navBar) {
        mobileMenuToggle.addEventListener('click', () => {
            navBar.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
};

// Header Scroll Effect
const initHeaderScroll = () => {
    const header = document.querySelector('.main-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
};

// Scroll Indicator
const initScrollIndicator = () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
};

// Intersection Observer for Animations
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });

    // Observe skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });
};

// Skill Progress Bar Animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.style.width;
                progress.style.width = '0%';
                
                setTimeout(() => {
                    progress.style.width = width;
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
};

// Update Current Year in Footer
const updateFooterYear = () => {
    const footer = document.querySelector('.main-footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.textContent = `© ${currentYear} Ethan James Walker. All rights reserved.`;
    }
};

// Active Navigation Link Highlighting
const initActiveNavigation = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-bar a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
};

// Initialize all functions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initSmoothScroll();
    initMobileMenu();
    initHeaderScroll();
    initScrollIndicator();
    initScrollAnimations();
    animateSkillBars();
    updateFooterYear();
    initActiveNavigation();
    
    console.log('Portfolio initialized successfully! 🚀');
});

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}