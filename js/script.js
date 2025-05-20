// Hide loading screen when page loads
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (!document.getElementById('mobile-menu').classList.contains('hidden')) {
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Animate process steps
gsap.utils.toArray('.process-step').forEach((step, i) => {
    gsap.from(step, {
        scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.2
    });
});

// Animate counter
const counters = document.querySelectorAll('.counter');
const speed = 200;

counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 1);
    } else {
        counter.innerText = target;
    }
    
    function updateCount() {
        const count = +counter.innerText;
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    }
    
    ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: updateCount
    });
});

// Auto-scroll testimonials
let testimonialContainer = document.querySelector('.testimonial-container');
let scrollAmount = 0;
let scrollSpeed = 0.5;

function autoScrollTestimonials() {
    scrollAmount += scrollSpeed;
    if (scrollAmount >= testimonialContainer.scrollWidth - testimonialContainer.clientWidth) {
        scrollAmount = 0;
    }
    testimonialContainer.scrollLeft = scrollAmount;
    requestAnimationFrame(autoScrollTestimonials);
}

// Start auto-scroll after page loads
setTimeout(autoScrollTestimonials, 3000);
