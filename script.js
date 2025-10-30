
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.innerHTML = nav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}


window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
});

const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
};


const initTestimonialSlider = () => {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;

    const showSlide = (n) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    };

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
};


const initBackToTop = () => {
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
};


const initNewsletterForm = () => {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            alert(`Thank you for subscribing with ${email}! You'll receive our updates soon.`);
            newsletterForm.reset();
        });
    }
};

const initCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const impactSection = document.querySelector('.impact-stats');
    if (impactSection) {
        observer.observe(impactSection);
    }
};

const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    const volunteerForm = document.getElementById('volunteerForm');
    
    const handleFormSubmit = (form, formType) => {
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
              
                const submissions = JSON.parse(localStorage.getItem(`${formType}`) || '[]');
                submissions.push({
                    ...data,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem(`${formType}`, JSON.stringify(submissions));
                
                alert(`Thank you for your ${formType === 'contact' ? 'message' : 'application'}! We'll get back to you soon.`);
                form.reset();
            });
        }
    };
    
    handleFormSubmit(contactForm, 'contact');
    handleFormSubmit(volunteerForm, 'volunteer');
};

const initDonationModal = () => {
    const donationModal = document.getElementById('donationModal');
    const donationTiers = document.querySelectorAll('.tier');
    const modalClose = document.querySelector('.modal-close');
    const donateButtons = document.querySelectorAll('.btn-donate');
    
    if (donationModal) {
        donationTiers.forEach(tier => {
            tier.addEventListener('click', () => {
                const amount = tier.querySelector('.tier-amount').textContent;
                const impact = tier.querySelector('.tier-impact').textContent;
                
                document.getElementById('donationAmount').value = amount;
                document.getElementById('donationImpact').textContent = impact;
                
                donationModal.style.display = 'flex';
            });
        });
        
       
        donateButtons.forEach(button => {
            button.addEventListener('click', () => {
                donationModal.style.display = 'flex';
            });
        });
        
        
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                donationModal.style.display = 'none';
            });
        }
        
        
        window.addEventListener('click', (e) => {
            if (e.target === donationModal) {
                donationModal.style.display = 'none';
            }
        });
        
        
        const donationForm = document.getElementById('donationForm');
        if (donationForm) {
            donationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(donationForm);
                const data = Object.fromEntries(formData);
                
               
                const donations = JSON.parse(localStorage.getItem('donations') || '[]');
                donations.push({
                    ...data,
                    timestamp: new Date().toISOString()
                });
                localStorage.setItem('donations', JSON.stringify(donations));
                
                alert('Thank you for your generous donation! Your support makes a difference.');
                donationForm.reset();
                donationModal.style.display = 'none';
            });
        }
    }
};

const initProjectDetails = () => {
    const learnMoreButtons = document.querySelectorAll('.btn-learn-more');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = button.closest('.project-card');
            const details = projectCard.querySelector('.project-details');
            
            if (details) {
                details.classList.toggle('active');
                button.textContent = details.classList.contains('active') ? 'Show Less' : 'Learn More';
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initBackToTop();
    initNewsletterForm();
    initTestimonialSlider();
    initCounters();
    initContactForm();
    initDonationModal();
    initProjectDetails();
});