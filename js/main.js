/* ================================================
   NAVBAR SCROLL EFFECT
================================================ */
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ================================================
   FADE-IN ON SCROLL (Intersection Observer)
================================================ */
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

/* ================================================
   iOS WAITLIST COUNTER ANIMATION
================================================ */
const countEl = document.getElementById('waitlistCount');
if (countEl) {
  const target   = 127;
  const duration = 1800;
  const step     = Math.ceil(duration / target);
  let current    = 0;

  const counter = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const timer = setInterval(() => {
          current += 1;
          countEl.textContent = current;
          if (current >= target) clearInterval(timer);
        }, step);
        counter.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counter.observe(countEl);
}

/* ================================================
   ACTIVE NAV LINK HIGHLIGHT
================================================ */
(function () {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#mainNav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ====== BLOG FUNCTIONALITY ======

document.addEventListener('DOMContentLoaded', function() {
  initBlogFilters();
  initNewsletterForm();
  initSearchForm();
  initLoadMore();
});

// ====== FILTRAR POR CATEGORÍA ======
function initBlogFilters() {
  const buttons = document.querySelectorAll('.category-btn');
  const posts = document.querySelectorAll('.blog-post-item');

  if (buttons.length === 0) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      
      // Actualizar botón activo
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filtrar posts
      posts.forEach(post => {
        const postCategory = post.getAttribute('data-category');
        if (category === 'all' || postCategory === category) {
          post.style.display = 'block';
          setTimeout(() => {
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
          }, 10);
        } else {
          post.style.opacity = '0';
          post.style.transform = 'translateY(20px)';
          setTimeout(() => {
            post.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ====== FORMULARIO NEWSLETTER ======
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    if (!email) return;
    
    console.log('Email suscrito:', email);
    
    const input = this.querySelector('input[type="email"]');
    const originalPlaceholder = input.placeholder;
    
    input.value = '✓ ¡Gracias por suscribirte!';
    input.placeholder = '✓ ¡Gracias por suscribirte!';
    input.style.color = 'var(--forest)';
    input.disabled = true;
    
    setTimeout(() => {
      input.value = '';
      input.placeholder = originalPlaceholder;
      input.style.color = '';
      input.disabled = false;
    }, 3000);
  });
}

// ====== BÚSQUEDA ======
function initSearchForm() {
  const searchBtn = document.querySelector('.btn-search');
  const searchInput = document.querySelector('.blog-search-input .form-control');
  
  if (!searchBtn) return;

  function performSearch() {
    const query = searchInput.value.toLowerCase();
    const posts = document.querySelectorAll('.blog-post-item');

    if (query.length === 0) {
      posts.forEach(post => post.style.display = 'block');
      return;
    }

    posts.forEach(post => {
      const title = post.querySelector('.post-title').textContent.toLowerCase();
      const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();

      if (title.includes(query) || excerpt.includes(query)) {
        post.style.display = 'block';
      } else {
        post.style.display = 'none';
      }
    });
  }

  searchBtn.addEventListener('click', performSearch);

  // Permitir búsqueda con Enter
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}

// ====== CARGAR MÁS ARTÍCULOS ======
function initLoadMore() {
  const loadMoreBtn = document.querySelector('.btn-load-more');
  if (!loadMoreBtn) return;

  loadMoreBtn.addEventListener('click', function() {
    console.log('Cargando más artículos...');
    const originalText = this.innerHTML;
    loadMoreBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Cargando...';
    loadMoreBtn.disabled = true;
    
    // Simular carga de API
    setTimeout(() => {
      loadMoreBtn.innerHTML = originalText;
      loadMoreBtn.disabled = false;
      // Aquí iría la lógica real de carga de posts
    }, 1000);
  });
}

// ====== BLOG POST INDIVIDUAL ======

document.addEventListener('DOMContentLoaded', function() {
  initTableOfContents();
  initShareButtons();
  initNewsletterSidebar();
  initSmoothScroll();
});

// ====== TABLA DE CONTENIDOS ACTIVA ====== 
function initTableOfContents() {
  const tocLinks = document.querySelectorAll('.toc-list a');
  const sections = document.querySelectorAll('.post-section');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// ====== SCROLL SUAVE ====== 
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ====== COMPARTIR ====== 
function initShareButtons() {
  const shareButtons = document.querySelectorAll('.share-btn');
  const title = document.querySelector('.post-hero-title').textContent;
  const url = window.location.href;

  shareButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const type = this.classList[1];
      
      let shareUrl = '';
      
      switch(type) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
          break;
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
        case 'email':
          shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
          break;
      }
      
      if (type === 'email') {
        window.location.href = shareUrl;
      } else {
        window.open(shareUrl, '_blank', 'width=600,height=600');
      }
    });
  });
}

// ====== NEWSLETTER SIDEBAR ====== 
function initNewsletterSidebar() {
  const form = document.querySelector('.newsletter-form-sidebar');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    if (!email) return;

    console.log('Email suscrito desde sidebar:', email);

    const input = this.querySelector('input[type="email"]');
    const originalPlaceholder = input.placeholder;
    
    input.value = '✓ ¡Gracias!';
    input.disabled = true;
    
    setTimeout(() => {
      input.value = '';
      input.placeholder = originalPlaceholder;
      input.disabled = false;
    }, 3000);
  });
}

// ====== AGREGAR ESTILOS A TABLA DE CONTENIDOS ACTIVA ======
const style = document.createElement('style');
style.textContent = `
  .toc-list a.active {
    color: var(--dark);
    font-weight: 800;
    margin-left: 10px;
  }
`;
document.head.appendChild(style);