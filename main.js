import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initFormHandling();
  initInteractiveElements();
});

function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
  }

  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        if (window.innerWidth <= 768) {
          navMenu.style.display = 'none';
        }
      }
    });
  });
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.program-card, .why-item, .badge').forEach(el => {
    observer.observe(el);
  });
}

function initFormHandling() {
  const form = document.querySelector('.resource-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      console.log('Form submitted with data:', {
        name: formData.get('Full Name') || form.querySelector('input[type="text"]').value,
        email: form.querySelector('input[type="email"]').value,
        phone: form.querySelector('input[type="tel"]').value,
        role: form.querySelector('select').value,
        expertise: form.querySelector('textarea').value,
      });

      alert('Thank you for your expression of interest! We will contact you soon.');
      form.reset();
    });

    const fileInput = form.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const fileName = e.target.files[0]?.name || 'No file selected';
        console.log('File selected:', fileName);
      });
    }
  }
}

function initInteractiveElements() {
  const heroButtons = document.querySelectorAll('.hero-buttons .btn');

  heroButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });

  const ctaButtons = document.querySelectorAll('.btn');
  ctaButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  const cards = document.querySelectorAll('.program-card, .why-item, .badge');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

window.addEventListener('resize', () => {
  const navMenu = document.querySelector('.nav-menu');
  if (window.innerWidth > 768) {
    navMenu.style.display = 'flex';
  }
});
