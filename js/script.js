document.addEventListener('DOMContentLoaded',function(){
  // Year in footer
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Simple contact form handler: open mailto with form content
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name');
      const email = data.get('email');
      const message = data.get('message');
      const subject = encodeURIComponent('Consulta - Espacio Orella');
      const body = encodeURIComponent(`Nombre: ${name}%0AEmail: ${email}%0A%0A${message}`);
      window.location.href = `mailto:contacto@espacioorella.cl?subject=${subject}&body=${body}`;
    });
  }

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if(toggle && nav){
    toggle.addEventListener('click',()=>{
      const isOpen = nav.style.display === 'flex';
      nav.style.display = isOpen ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.background = 'white';
      nav.style.position = 'absolute';
      nav.style.right = '1rem';
      nav.style.top = '3.5rem';
      nav.style.padding = '0.75rem';
      nav.style.boxShadow = '0 6px 18px rgba(0,0,0,0.08)';
    });
  }
});
