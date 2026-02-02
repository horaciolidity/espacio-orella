import React, { useEffect, useState } from 'react'
import Calendar from './components/Calendar'
import SocialLinks from './components/SocialLinks'
import ChatBot from './components/ChatBot'
import QuoteCalculator from './components/QuoteCalculator'

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light'
    } catch (e) {
      return 'light'
    }
  })

  const [activeTab, setActiveTab] = useState('resumen')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('theme', theme) } catch (e) { }
  }, [theme])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appeared');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]); // Now activeTab is defined before this effect

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  const handleSubmit = (e) => {
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
          <img src="/fotos/1.jpeg" alt="Espacio Orella" className="brand-logo" />
          <span className="brand-text">Espacio Orella</span>
        </div>

        <button
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <a href="#sobre" onClick={() => setIsMenuOpen(false)}>Sobre</a>
          <a href="#eventos" onClick={() => setIsMenuOpen(false)}>Eventos</a>
          <a href="#bienestar" onClick={() => setIsMenuOpen(false)}>Bienestar</a>
          <a href="#galeria" onClick={() => setIsMenuOpen(false)}>Galería</a>
          <a href="#contacto" className="cta" onClick={() => setIsMenuOpen(false)}>Consultar disponibilidad</a>

          <div className="mobile-only header-social">
            <SocialLinks />
          </div>
        </nav>

        <div className="theme-toggle">
          <button onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <div className="desktop-only header-social">
          <SocialLinks />
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-inner container">
            <h1>🌿 Espacio Orella</h1>
            <p className="subtitle">Descansar, trabajar y conectar con la naturaleza en San Antonio</p>
            <p className="hero-description">
              Un alojamiento acogedor en Barrancas, a minutos del puerto de San Antonio, donde la tranquilidad, el confort y una huerta propia se combinan para ofrecerte una experiencia auténtica. Ideal para turistas y viajeros de negocios que buscan un lugar cómodo, funcional y con alma
            </p>
            <div className="hero-ctas">
              <a className="btn primary" href="#contacto">Consultar disponibilidad</a>
              <a
                className="btn whatsapp-hero"
                href="https://wa.me/569XXXXXXXX"
                target="_blank"
                rel="noreferrer"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        </section>


        <section id="sobre" className="container about">
          <div className="section-header animate-on-scroll">
            <span className="pre-title">Nuestra Historia</span>
            <h2>Sobre Espacio Orella</h2>
            <p>Un refugio pensado para la calma, la conexión con la naturaleza y el florecimiento de la creatividad en el corazón de Barrancas.</p>
          </div>
          <div className="about-grid">
            <div className="card animate-on-scroll">
              <h3>Alojamiento</h3>
              <p>5 habitaciones privadas con baño compartido y espacios comunitarios.</p>
            </div>
            <div className="card animate-on-scroll">
              <h3>Comodidades</h3>
              <p>Cocina compartida, huerta propia y áreas de descanso.</p>
            </div>
            <div className="card animate-on-scroll">
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
            <button className={`tab ${activeTab === 'resumen' ? 'active' : ''}`} data-type="resumen" onClick={() => setActiveTab('resumen')}>Resumen</button>
            <button className={`tab ${activeTab === 'holisticos' ? 'active' : ''}`} data-type="holisticos" onClick={() => setActiveTab('holisticos')}>Talleres Holísticos</button>
            <button className={`tab ${activeTab === 'retiros' ? 'active' : ''}`} data-type="retiros" onClick={() => setActiveTab('retiros')}>Retiros</button>
            <button className={`tab ${activeTab === 'culinarios' ? 'active' : ''}`} data-type="culinarios" onClick={() => setActiveTab('culinarios')}>Talleres Culinarios</button>
            <button className={`tab ${activeTab === 'cultural' ? 'active' : ''}`} data-type="cultural" onClick={() => setActiveTab('cultural')}>Creativo & Cultural</button>
          </div>

          <div className="events-content">
            {activeTab === 'resumen' && (
              <div className="card">
                <h3>Resumen de servicios para eventos</h3>
                <p>Ofrecemos paquetes flexibles que incluyen alojamiento, uso de espacios comunes, apoyo logístico y opciones de alimentación con productos locales. Ideal para facilitadores, organizaciones y grupos creativos que buscan una experiencia inmersiva junto al mar.</p>
                <p className="muted">Duración típica: 1 fin de semana — 7 días. Posibilidad de adaptaciones según necesidades.</p>
              </div>
            )}

            {activeTab === 'holisticos' && (
              <div className="events-grid">
                <article className="card event-card" data-type="holisticos">
                  <h3>Taller de Yoga y Meditación</h3>
                  <p>Espacios tranquilos y materiales para sesiones diarias de práctica y meditación guiada.</p>
                  <button className="btn contratar" onClick={() => window.location.hash = '#contacto'}>Contratar</button>
                </article>
                <article className="card event-card" data-type="holisticos">
                  <h3>Sesión de Reiki Grupal</h3>
                  <p>Facilitadores y salas individuales para trabajos terapéuticos.</p>
                  <button className="btn contratar" onClick={() => window.location.hash = '#contacto'}>Contratar</button>
                </article>
              </div>
            )}

            {activeTab === 'retiros' && (
              <div className="events-grid">
                <article className="card event-card" data-type="retiros">
                  <h3>Retiro de Bienestar 3 días</h3>
                  <p>Programa con alojamiento, comidas saludables y actividades guiadas.</p>
                  <button className="btn contratar" onClick={() => window.location.hash = '#contacto'}>Contratar</button>
                </article>
                <article className="card event-card" data-type="retiros">
                  <h3>Retiro Intensivo</h3>
                  <p>Semanas temáticas con facilitadores invitados y programación especializada.</p>
                  <button className="btn contratar" onClick={() => window.location.hash = '#contacto'}>Contratar</button>
                </article>
              </div>
            )}

            {activeTab === 'culinarios' && (
              <div className="events-grid">
                <article className="card event-card" data-type="culinarios">
                  <h3>Taller de Cocina Autóctona</h3>
                  <p>Manos a la obra con ingredientes de la huerta y técnicas locales.</p>
                  <button className="btn contratar" onClick={() => window.location.hash = '#contacto'}>Contratar</button>
                </article>
                <article className="card event-card" data-type="culinarios">
                  <h3>Demostración + Degustación</h3>
                  <p>Clases con degustación y maridaje local.</p>
                  <button className="btn contratar" onClick={() => window.location.hash = '#contacto'}>Contratar</button>
                </article>
              </div>
            )}

            {activeTab === 'cultural' && (
              <div className="events-grid">
                <article className="card event-card" data-type="cultural">
                  <h3>Encuentros Creativos</h3>
                  <p>Residencias, lecturas, presentaciones y encuentros comunitarios con apoyo en difusión.</p>
                  <button className="btn contratar" onClick={() => window.location.hash = '#contacto'}>Contratar</button>
                </article>
                <article className="card event-card" data-type="cultural">
                  <h3>Conciertos / Pequeños Festivales</h3>
                  <p>Espacio adaptable para eventos musicales y presentaciones en vivo.</p>
                  <button className="btn contratar" onClick={() => window.location.hash = '#contacto'}>Contratar</button>
                </article>
              </div>
            )}
          </div>
        </section>

        <section id="bienestar" className="wellbeing-section container">
          <div className="section-header animate-on-scroll">
            <span className="pre-title">Cuidado Holístico</span>
            <h2>Bienestar y Experiencias</h2>
            <p className="section-intro">Descubre un refugio para el alma. Ofrecemos terapias y prácticas diseñadas para restaurar el equilibrio, la paz interior y la vitalidad en un entorno natural único.</p>
          </div>
          <div className="well-grid">
            <article className="well-card animate-on-scroll">
              <div className="well-icon">✨</div>
              <h3>Reiki Holístico</h3>
              <p>Canalización de energía vital para armonizar cuerpo y mente, reduciendo el estrés y promoviendo la autosanación profunda.</p>
            </article>
            <article className="well-card animate-on-scroll">
              <div className="well-icon">🧘</div>
              <h3>Meditación Guiada</h3>
              <p>Sesiones de mindfulness y respiración consciente frente al mar, diseñadas para cultivar la presencia y la claridad mental.</p>
            </article>
            <article className="well-card animate-on-scroll">
              <div className="well-icon">💆</div>
              <h3>Masajes Terapéuticos</h3>
              <p>Técnicas integrales de relajación y descontracturantes con aceites esenciales orgánicos de nuestra propia huerta.</p>
            </article>
            <article className="well-card animate-on-scroll">
              <div className="well-icon">🏺</div>
              <h3>Sanación Sonora</h3>
              <p>Baños de bosque y cuencos tibetanos que utilizan la vibración para inducir estados de relajación profunda y renovación.</p>
            </article>
          </div>
        </section>

        <section id="galeria" className="container gallery">
          <div className="section-header animate-on-scroll">
            <span className="pre-title">Visualiza el Entorno</span>
            <h2>Galería de Momentos</h2>
          </div>
          <p className="centered-text">Explora los rincones de nuestro espacio y la belleza de la costa chilena.</p>
          <div className="grid-gallery">
            <div className="card media animate-on-scroll"><img src="/fotos/2.jpeg" alt="Espacio Exterior" /></div>
            <div className="card media animate-on-scroll"><img src="/fotos/1.jpeg" alt="Nuestra Fachada" /></div>
            <div className="card media animate-on-scroll"><img src="/fotos/3.jpeg" alt="Interior" /></div>
            <div className="card media animate-on-scroll"><img src="/fotos/4.jpeg" alt="Detalles" /></div>
          </div>
        </section>



        <section id="cotizador" className="container quote-section">
          <div className="section-header animate-on-scroll">
            <span className="pre-title">Presupuesto Online</span>
            <h2>Cotiza tu Experiencia</h2>
          </div>
          <QuoteCalculator />
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

          <div className="card contact-info" style={{ marginTop: '1rem' }}>
            <p><strong>Ubicación:</strong> Barrancas, Puerto de San Antonio, Chile</p>
            <p><strong>Email:</strong> contacto@espacioorella.cl</p>
          </div>
        </section>
        <section id="opiniones" className="container reviews-section">
          <div className="section-header animate-on-scroll">
            <h2>Experiencias y Ubicación</h2>
            <p className="section-intro">Tu opinión es fundamental para nosotros. Te invitamos a compartir tu experiencia en Espacio Orellana y a visitarnos en nuestro rincón de paz en San Antonio.</p>
          </div>

          <div className="reviews-layout">
            <div className="reviews-cta card animate-on-scroll">
              <div className="google-icon">⭐</div>
              <h3>¡Déjanos una reseña!</h3>
              <p>Si has visitado nuestro espacio, nos encantaría que compartieras tu experiencia. Tu feedback ayuda a otros a descubrir este lugar de bienestar.</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Espacio+Orellana+Barrancas+San+Antonio"
                target="_blank"
                rel="noreferrer"
                className="btn primary google-btn"
              >
                Escribir reseña en Google
              </a>
            </div>

            <div className="map-container card animate-on-scroll">
              <iframe
                title="Ubicación Espacio Orellana"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.8687353982544!2d-71.5985!3d-33.5878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM1JzE2LjEiUyA3McKwMzUnNTQuNiJX!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-inner">
            <p>© {new Date().getFullYear()} Espacio Orella</p>
            <SocialLinks />
          </div>
        </div>
      </footer>
      <ChatBot />
      <a
        href="https://wa.me/569XXXXXXXX"
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
      </a>
    </div>
  )
}

export default App
