import React, { useEffect, useState } from 'react'
import Calendar from './components/Calendar'
import SocialLinks from './components/SocialLinks'

function App(){
  const [theme, setTheme] = useState(() => {
    try{
      return localStorage.getItem('theme') || 'light'
    }catch(e){
      return 'light'
    }
  })

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
    try{ localStorage.setItem('theme', theme) }catch(e){}
  },[theme])

  const toggleTheme = ()=> setTheme(t=> t === 'light' ? 'dark' : 'light')

  const handleSubmit = (e) =>{
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get('name');
    const email = form.get('email');
    const message = form.get('message');
    const subject = encodeURIComponent('Consulta - Espacio Orellana');
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:contacto@espacioorella.cl?subject=${subject}&body=${body}`;
  }

  return (
    <div className="app">
      <header className="site-header container">
        <div className="brand">
          <img src="/fotos/1.jpeg" alt="Espacio Orellana" className="brand-logo" />
          <span className="brand-text">Espacio Orellana</span>
        </div>
        <nav className="nav">
          <a href="#sobre">Sobre</a>
          <a href="#eventos">Eventos</a>
          <a href="#bienestar">Bienestar</a>
          <a href="#galeria">Galería</a>
          <a href="#contacto" className="cta">Consultar disponibilidad</a>
        </nav>
        <div className="theme-toggle">
          <button onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <div className="header-social">
          <SocialLinks />
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-inner container">
            <h1>Un espacio de creación, bienestar y descanso en la costa chilena</h1>
            <p className="subtitle">Barrancas · Puerto de San Antonio — Retiros, talleres y estadías</p>
            <div className="hero-ctas">
              <a className="btn primary" href="#contacto">Consultar disponibilidad</a>
              <a className="btn ghost" href="#galeria">Ver galería</a>
            </div>
          </div>
        </section>

        <script>
          // Tabs behavior: simple DOM-based, progressive enhancement
          (function(){
            if(typeof window === 'undefined') return;
            function initTabs(){
              const tabs = document.querySelectorAll('.events-tabs .tab');
              const panels = document.querySelectorAll('.events-content .tab-panel');
              tabs.forEach(t=> t.addEventListener('click', ()=>{
                tabs.forEach(x=> x.classList.remove('active'));
                t.classList.add('active');
                const id = t.getAttribute('data-tab');
                panels.forEach(p=> p.style.display = p.getAttribute('data-panel') === id ? '' : 'none');
              }))
            }
            document.addEventListener('DOMContentLoaded', initTabs);
            // also run immediately if DOM already loaded
            setTimeout(initTabs,300);
          })();
        </script>

        <section id="sobre" className="container about">
          <h2>Sobre Espacio Orellana</h2>
          <p>Espacio pensado para la calma, la conexión con la naturaleza y la creatividad. Alojamiento y espacios para talleres y retiros.</p>
          <div className="about-grid">
            <div className="card">
              <h3>Alojamiento</h3>
              <p>5 habitaciones privadas con baño compartido y espacios comunitarios.</p>
            </div>
            <div className="card">
              <h3>Comodidades</h3>
              <p>Cocina compartida, huerta propia y áreas de descanso.</p>
            </div>
            <div className="card">
              <h3>Ubicación</h3>
              <p>Barrancas, cerca del Puerto de San Antonio — fácil acceso desde Santiago.</p>
            </div>
          </div>
        </section>

        <section id="eventos" className="container events-section">
          <div className="events-intro card">
            <h2>Eventos y Contrataciones</h2>
            <p>Espacio Orellana ofrece un entorno versátil para eventos íntimos y medianos: talleres holísticos, retiros de bienestar, talleres de cocina autóctona, residencias creativas y encuentros culturales. Nuestra propuesta combina alojamiento para participantes, espacios interiores y al aire libre, huerta propia y opciones de catering local.</p>
            <p className="muted">Capacidad típica: 10-30 personas (configurable). Equipamiento disponible: proyector, pantalla, sistema de sonido, mantas y cojines para prácticas, y cocina equipada para demostraciones culinarias.</p>
          </div>

          <div className="events-tabs">
            <button className="tab active" data-tab="resumen">Resumen</button>
            <button className="tab" data-tab="holisticos">Talleres Holísticos</button>
            <button className="tab" data-tab="retiros">Retiros</button>
            <button className="tab" data-tab="culinarios">Talleres Culinarios</button>
            <button className="tab" data-tab="cultural">Creativo & Cultural</button>
          </div>

          <div className="events-content">
            <div className="tab-panel" data-panel="resumen">
              <div className="card">
                <h3>Resumen de servicios para eventos</h3>
                <p>Ofrecemos paquetes flexibles que incluyen alojamiento, uso de espacios comunes, apoyo logístico y opciones de alimentación con productos locales. Ideal para facilitadores, organizaciones y grupos creativos que buscan una experiencia inmersiva junto al mar.</p>
                <p className="muted">Duración típica: 1 fin de semana — 7 días. Posibilidad de adaptaciones según necesidades.</p>
              </div>
            </div>

            <div className="tab-panel" data-panel="holisticos" style={{display:'none'}}>
              <div className="events-grid">
                <article className="card event-card">
                  <h3>Taller de Yoga y Meditación</h3>
                  <p>Espacios tranquilos y materiales para sesiones diarias de práctica y meditación guiada.</p>
                  <button className="btn contratar" onClick={()=> window.location.hash = '#contacto'}>Contratar</button>
                </article>
                <article className="card event-card">
                  <h3>Sesión de Reiki Grupal</h3>
                  <p>Facilitadores y salas individuales para trabajos terapéuticos.</p>
                  <button className="btn contratar" onClick={()=> window.location.hash = '#contacto'}>Contratar</button>
                </article>
              </div>
            </div>

            <div className="tab-panel" data-panel="retiros" style={{display:'none'}}>
              <div className="events-grid">
                <article className="card event-card">
                  <h3>Retiro de Bienestar 3 días</h3>
                  <p>Programa con alojamiento, comidas saludables y actividades guiadas.</p>
                  <button className="btn contratar" onClick={()=> window.location.hash = '#contacto'}>Contratar</button>
                </article>
                <article className="card event-card">
                  <h3>Retiro Intensivo</h3>
                  <p>Semanas temáticas con facilitadores invitados y programación especializada.</p>
                  <button className="btn contratar" onClick={()=> window.location.hash = '#contacto'}>Contratar</button>
                </article>
              </div>
            </div>

            <div className="tab-panel" data-panel="culinarios" style={{display:'none'}}>
              <div className="events-grid">
                <article className="card event-card">
                  <h3>Taller de Cocina Autóctona</h3>
                  <p>Manos a la obra con ingredientes de la huerta y técnicas locales.</p>
                  <button className="btn contratar" onClick={()=> window.location.hash = '#contacto'}>Contratar</button>
                </article>
                <article className="card event-card">
                  <h3>Demostración + Degustación</h3>
                  <p>Clases con degustación y maridaje local.</p>
                  <button className="btn contratar" onClick={()=> window.location.hash = '#contacto'}>Contratar</button>
                </article>
              </div>
            </div>

            <div className="tab-panel" data-panel="cultural" style={{display:'none'}}>
              <div className="events-grid">
                <article className="card event-card">
                  <h3>Encuentros Creativos</h3>
                  <p>Residencias, lecturas, presentaciones y encuentros comunitarios con apoyo en difusión.</p>
                  <button className="btn contratar" onClick={()=> window.location.hash = '#contacto'}>Contratar</button>
                </article>
                <article className="card event-card">
                  <h3>Conciertos / Pequeños Festivales</h3>
                  <p>Espacio adaptable para eventos musicales y presentaciones en vivo.</p>
                  <button className="btn contratar" onClick={()=> window.location.hash = '#contacto'}>Contratar</button>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="bienestar" className="container wellbeing">
          <h2>Bienestar y Experiencias</h2>
          <div className="well-grid">
            <div className="card">Reiki</div>
            <div className="card">Meditación</div>
            <div className="card">Masajes</div>
            <div className="card">Sanación individual</div>
          </div>
        </section>

        <section id="galeria" className="container gallery">
          <h2>Galería</h2>
          <p>Coloca tus fotos en <strong>/public/assets/photos</strong> y aparecerán aquí (referencias estáticas).</p>
          <div className="grid-gallery">
            <div className="card media"><img src="/fotos/3.jpeg" alt="foto 3"/></div>
            <div className="card media"><img src="/fotos/4.jpeg" alt="foto 4"/></div>
          </div>
        </section>

        <section id="calendario" className="container calendar-section">
          <h2>Calendario de visitas</h2>
          <p>Selecciona una fecha para solicitar una visita. Al hacer clic se abrirá tu cliente de correo con la solicitud prellenada.</p>
          <Calendar />
        </section>

        <section id="contacto" className="container contact">
          <h2>Contacto y Reservas</h2>
          <div className="card">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="field">
                <label>Nombre</label>
                <input name="name" required />
              </div>
              <div className="field">
                <label>Email</label>
                <input name="email" type="email" required />
              </div>
              <div className="field">
                <label>Mensaje</label>
                <textarea name="message" rows="5" required></textarea>
              </div>
              <div className="form-actions">
                <button className="btn primary" type="submit">Enviar consulta</button>
              </div>
            </form>
          </div>

          <div className="card contact-info" style={{marginTop:'1rem'}}>
            <p><strong>Ubicación:</strong> Barrancas, Puerto de San Antonio, Chile</p>
            <p><strong>Email:</strong> contacto@espacioorella.cl</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-inner">
            <p>© {new Date().getFullYear()} Espacio Orellana</p>
            <SocialLinks />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
