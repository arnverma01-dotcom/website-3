document.addEventListener('DOMContentLoaded', () => {
  
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');
  
  if(menuBtn) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Sticky Header & Scroll Progress
  const header = document.querySelector('header');
  const progressBar = document.querySelector('.scroll-progress');
  
  window.addEventListener('scroll', () => {
    // Header shadow
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Scroll progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if(progressBar) {
      progressBar.style.width = scrolled + "%";
    }
  });

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to observe
  const revealElements = document.querySelectorAll('.service-card, .slide-up, .slide-left, .slide-right');
  revealElements.forEach(el => observer.observe(el));

  // Count-up logic for Stats Section
  const counters = document.querySelectorAll('.counter-value');
  let hasCounted = false;
  
  const countUpObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasCounted) {
      hasCounted = true;
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target;
            if(counter.getAttribute('data-plus') === 'true') {
               counter.innerText += '+';
            }
          }
        };
        updateCounter();
      });
    }
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.stats-section');
  if(statsSection) {
    countUpObserver.observe(statsSection);
  }
});
