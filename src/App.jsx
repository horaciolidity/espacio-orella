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
    const subject = encodeURIComponent('Consulta - Espacio Orella');
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
          <a href="#" onClick={() => setIsMenuOpen(false)}>Inicio</a>
          <a href="#quienes-somos" onClick={() => setIsMenuOpen(false)}>Quiénes Somos</a>
          <a href="#alojamiento" onClick={() => setIsMenuOpen(false)}>Alojamiento</a>
          <a href="#eventos" onClick={() => setIsMenuOpen(false)}>Eventos</a>
          <a href="#servicios" onClick={() => setIsMenuOpen(false)}>Servicios</a>
          <a href="#viajes-corporativos" onClick={() => setIsMenuOpen(false)}>Viajes Corporativos</a>
          <a href="#ubicacion" onClick={() => setIsMenuOpen(false)}>Ubicación</a>
          <a href="#galeria" onClick={() => setIsMenuOpen(false)}>Galería</a>
          <a href="#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</a>


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
            <h1>Espacio Orella</h1>
            <p className="subtitle">Descansa, trabaja y conecta con la naturaleza en San Antonio</p>
            <p className="hero-description">
              Un alojamiento acogedor en Barrancas, a minutos del puerto de San Antonio, donde la tranquilidad, el confort y una huerta propia se combinan para ofrecerte una experiencia auténtica. Ideal para turistas y viajeros de negocios que buscan un lugar cómodo, funcional y con alma
            </p>

          </div>
        </section>


        <section id="quienes-somos" className="container about">
          <div className="section-header animate-on-scroll">
            <span className="pre-title">Nuestra Historia</span>
            <h2>Sobre Nosotros</h2>
            <div className="about-content">
              <p>Espacio Orella es un establecimiento de alojamiento turístico ubicado en Barrancas, Puerto de San Antonio, Chile. Ofrecemos habitaciones privadas con baño compartido y baño privado, estacionamiento, espacios de comida, cocina equipada, horno de barro, parrilla y todas las comodidades necesarias para una estadía confortable.</p>
              <p>Además, contamos con huerta propia, servicio de desayuno y personal capacitado disponible 24/7 para atender a nuestros huéspedes.</p>
            </div>
          </div>
          <div className="section-header animate-on-scroll" style={{ marginTop: '3rem' }}>
            <h2>Nuestro Objetivo</h2>
            <div className="about-content">
              <p>Nuestro objetivo es proporcionar un entorno relajante y acogedor para nuestros huéspedes, ya sean turistas o viajeros de negocios que buscan un lugar tranquilo y productivo para descansar y trabajar. Contamos con una ubicación estratégica, cercana al puerto de San Antonio, lo que facilita el acceso a los principales puntos de interés de la zona.</p>
            </div>
          </div>
        </section>

        <section id="alojamiento" className="container accommodation-section">
          <div className="section-header animate-on-scroll">
            <span className="pre-title">🗂️ Alojamiento</span>
            <h2>Habitaciones confortables para descansar y sentirse como en casa</h2>
            <p className="section-intro">En Espacio Orella ofrecemos distintas opciones de alojamiento, pensadas para adaptarse tanto a turistas como a viajeros de negocios. Contamos con habitaciones privadas, espacios tranquilos y áreas comunes completamente equipadas, en un entorno acogedor y funcional, a minutos del puerto de San Antonio.</p>
          </div>

          <div className="rooms-container">
            <h3 className="sub-section-title">🛏️ Nuestras Habitaciones</h3>
            <div className="rooms-grid">
              <div className="card room-card animate-on-scroll">
                <div className="card-tag">Planta Alta</div>
                <h4>Habitación Matrimonial Superior</h4>
                <p>Ideal para quienes buscan mayor comodidad, privacidad y amplitud.</p>
                <ul className="feature-list">
                  <li>Cama matrimonial</li>
                  <li>Baño privado en suite</li>
                  <li>Vestidor</li>
                  <li>Terraza privada</li>
                  <li>Excelente iluminación natural</li>
                </ul>
              </div>

              <div className="card room-card animate-on-scroll">
                <div className="card-tag">Baño Compartido</div>
                <h4>Habitación Matrimonial</h4>
                <p>Una opción cómoda y funcional para estadías cortas o prolongadas.</p>
                <ul className="feature-list">
                  <li>Cama matrimonial</li>
                  <li>Placard</li>
                  <li>Muy buena iluminación</li>
                </ul>
              </div>

              <div className="card room-card animate-on-scroll">
                <div className="card-tag">Individual</div>
                <h4>Habitaciones Individuales</h4>
                <p>Pensadas especialmente para viajeros de negocios o estadías individuales.</p>
                <ul className="feature-list">
                  <li>3 habitaciones con cama de 1 plaza y 1/2</li>
                  <li>Baño compartido</li>
                  <li>Ambiente tranquilo y confortable</li>
                </ul>
              </div>

              <div className="card room-card animate-on-scroll">
                <div className="card-tag">Planta Baja</div>
                <h4>Habitaciones Dobles</h4>
                <p>Ideales para compañeros de trabajo o amigos que viajan juntos.</p>
                <ul className="feature-list">
                  <li>2 habitaciones con dos camas de 1 plaza y 1/2</li>
                  <li>Baño compartido</li>
                  <li>Fácil acceso en planta baja</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="common-spaces animate-on-scroll">
            <h3>🏡 Espacios Comunes</h3>
            <p>Nuestros espacios comunes están diseñados para el descanso, el encuentro y la comodidad diaria de nuestros huéspedes.</p>
            <div className="common-grid">
              <div className="feature-item">
                <strong>Cocina equipada:</strong> Parrilla, horno de barro, horno tradicional, industrial, heladera y más.
              </div>
              <div className="feature-item">
                <strong>Living comedor:</strong> Amplio y confortable para compartir momentos.
              </div>
              <div className="feature-item">
                <strong>Barra de té/café:</strong> TV con área de cafetería disponible.
              </div>
              <div className="feature-item">
                <strong>Lectura:</strong> Espacios dedicados al descanso y la lectura.
              </div>
            </div>
          </div>

          <div className="stats-grid animate-on-scroll">
            <div className="stat-card">
              <h3>🌿 Qué incluye tu estadía</h3>
              <ul className="checklist">
                <li>Wi-Fi</li>
                <li>Atención personalizada 24/7</li>
                <li>Estacionamiento exterior</li>
                <li>Acceso a la huerta orgánica</li>
                <li>Acceso a espacio de eventos</li>
                <li>Cocina y Parrilla</li>
              </ul>
            </div>
            <div className="stat-card">
              <h3>🚐 Traslados y Movilidad</h3>
              <p>Ofrecemos servicio de traslado (previa coordinación):</p>
              <ul className="checklist">
                <li>Hacia/desde Aeropuerto</li>
                <li>Puerto de San Antonio</li>
                <li>Zonas turísticas</li>
              </ul>
            </div>
          </div>

          <div className="cta-box animate-on-scroll">
            <h3>💻 ¿Deseas visitarnos?</h3>
            <p>Utiliza nuestro cotizador para conocer tarifas y disponibilidad.</p>
            <div className="cta-group">
              <a href="#cotizador" className="btn primary">👉 Cotizar estadía</a>
              <a href="#contacto" className="btn ghost">👉 Consultar disponibilidad</a>
            </div>
          </div>
        </section>

        <section id="eventos" className="container events-section">
          <div className="section-header animate-on-scroll">
            <span className="pre-title">🗂️ Eventos</span>
            <h2>Un espacio al aire libre para encuentros con sentido</h2>
            <p className="section-intro">En Espacio Orella ofrecemos nuestro espacio de eventos al aire libre, con vista directa a la huerta, pensado para actividades que buscan conexión, bienestar y experiencias auténticas. Un entorno natural, tranquilo y cuidado, ideal para encuentros sociales, corporativos y actividades holísticas.</p>
          </div>

          <div className="events-grid-new">
            <div className="card animate-on-scroll">
              <h3>✨ Nuestro Espacio</h3>
              <p>El espacio cuenta con:</p>
              <ul className="checklist">
                <li>Área al aire libre con huerta a la vista</li>
                <li>Equipo de sonido</li>
                <li>Espacios de descanso y relajación</li>
                <li>Sectores versátiles para distintas actividades</li>
                <li>Box privado con servicio de masajes</li>
              </ul>
            </div>

            <div className="card animate-on-scroll">
              <h3>🧩 Actividades Ideales</h3>
              <p>Nuestro espacio es perfecto para:</p>
              <div className="activities-list">
                <span className="tag">Reuniones empresariales</span>
                <span className="tag">Talleres de cocina</span>
                <span className="tag">Yoga y Reiki</span>
                <span className="tag">Meditaciones</span>
                <span className="tag">Tardes de té</span>
                <span className="tag">Cenas privadas</span>
                <span className="tag">Celebraciones íntimas</span>
              </div>
            </div>
          </div>

          <div className="identity-block animate-on-scroll">
            <div className="card">
              <h3>🌱 Experiencias con identidad</h3>
              <p>La combinación de naturaleza, huerta orgánica y espacios pensados para el bienestar convierte a Espacio Orella en un lugar único para desarrollar actividades que promueven el encuentro, el aprendizaje y el descanso, lejos del ruido y el ritmo acelerado.</p>
            </div>
          </div>

          <div className="cta-box animate-on-scroll">
            <h3>📞 Consultas y Reservas</h3>
            <p>Cada evento es único. Contáctanos para conocer disponibilidad, condiciones y armar una propuesta a medida según tu actividad.</p>
            <div className="cta-group">
              <a href="#contacto" className="btn primary">👉 Consultar disponibilidad</a>
            </div>
          </div>
        </section>

        <section id="servicios" className="container services-section">
          <div className="section-header animate-on-scroll">
            <span className="pre-title">🗂️ Servicios</span>
            <h2>Servicios pensados para tu comodidad, experiencia y negocios</h2>
            <p className="section-intro">En Espacio Orella ofrecemos una propuesta integral de servicios para huéspedes y visitantes, combinando gastronomía, bienestar, movilidad, turismo y apoyo al viajero corporativo. Todo está pensado para que tu estadía en San Antonio sea cómoda, segura y productiva, ya sea por trabajo o por placer.</p>
          </div>

          <div className="services-grid-main">
            <div className="card animate-on-scroll">
              <h3>🍽️ Gastronomía para Huéspedes</h3>
              <p>Ofrecemos servicio de desayuno, almuerzo y cena con preparaciones caseras, productos frescos e ingredientes de nuestra huerta.</p>
              <p className="muted">Coordinación directa según disponibilidad.</p>
            </div>

            <div className="card animate-on-scroll">
              <h3>🥂 Gastronomía para Eventos</h3>
              <ul className="checklist">
                <li>Cenas románticas y de negocios</li>
                <li>Degustación de vinos</li>
                <li>Reuniones familiares</li>
                <li>Servicio de cafetería y tardes de té</li>
              </ul>
            </div>

            <div className="card animate-on-scroll">
              <h3>🌱 Talleres y Bienestar</h3>
              <div className="service-sub-grid">
                <div>
                  <h4>Talleres</h4>
                  <ul className="feature-list">
                    <li>Jardinería</li>
                    <li>Cocina autóctona</li>
                  </ul>
                </div>
                <div>
                  <h4>Bienestar</h4>
                  <ul className="feature-list">
                    <li>Masajes</li>
                    <li>Reiki</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card animate-on-scroll">
              <h3>🚐 Traslados y Turismo</h3>
              <ul className="checklist">
                <li>Aeropuerto y Puerto San Antonio</li>
                <li>Zonas turísticas y puntos de interés</li>
                <li>Guía turístico y Turismo aventura</li>
              </ul>
            </div>

            <div className="card animate-on-scroll business-card">
              <h3>💼 Servicios para Viajeros de Negocios</h3>
              <ul className="feature-list">
                <li>Servicio de cambio de monedas</li>
                <li>Asesoramiento sobre zonas seguras</li>
                <li>Orientación sobre oportunidades de negocio</li>
                <li>Contactos estratégicos y referencias locales</li>
              </ul>
            </div>
          </div>

          <div className="cta-box animate-on-scroll">
            <h3>📞 Consultas y Reservas</h3>
            <p>Para conocer más sobre nuestros servicios, propuestas gastronómicas, eventos o asistencia corporativa, contáctanos.</p>
            <div className="cta-group">
              <a href="#contacto" className="btn primary">👉 Consultar servicios</a>
            </div>
          </div>
        </section>

        <section id="viajes-corporativos" className="container corporate-section">
          <div className="section-header animate-on-scroll">
            <span className="pre-title">🗂️ Viajes Corporativos</span>
            <h2>Alojamiento y servicios pensados para viajes de negocios en San Antonio</h2>
            <p className="section-intro">En Espacio Orella ofrecemos una propuesta integral para viajeros corporativos, combinando comodidad, tranquilidad y una ubicación estratégica cercana al puerto de San Antonio. Nuestro espacio está diseñado para quienes necesitan descansar bien, trabajar con comodidad y contar con apoyo local confiable durante su estadía.</p>
          </div>

          <div className="corporate-grid">
            <div className="card animate-on-scroll">
              <h3>🏢 Alojamiento para Empresas</h3>
              <p>Opciones ideales para:</p>
              <ul className="checklist">
                <li>Ejecutivos</li>
                <li>Personal portuario</li>
                <li>Técnicos y profesionales</li>
                <li>Estadías cortas y prolongadas</li>
              </ul>
            </div>

            <div className="card animate-on-scroll">
              <h3>📍 Ubicación Estratégica</h3>
              <ul className="feature-list">
                <li>Cercanía al puerto de San Antonio</li>
                <li>Fácil acceso a zonas industriales</li>
                <li>Entorno tranquilo y seguro</li>
              </ul>
            </div>

            <div className="card animate-on-scroll highlight-card">
              <h3>🍽️ Servicios Corporativos</h3>
              <ul className="checklist">
                <li>Desayuno, almuerzo y cena</li>
                <li>Wi-Fi de alta velocidad</li>
                <li>Atención personalizada 24/7</li>
                <li>Estacionamiento para camionetas</li>
              </ul>
            </div>

            <div className="card animate-on-scroll">
              <h3>💼 Asistencia Empresarial</h3>
              <ul className="feature-list">
                <li>Servicio de cambio de monedas</li>
                <li>Asesoramiento sobre zonas seguras</li>
                <li>Información de oportunidades locales</li>
                <li>Contactos estratégicos y referencias</li>
              </ul>
            </div>

            <div className="card animate-on-scroll">
              <h3>🚐 Movilidad y Logística</h3>
              <ul className="checklist">
                <li>Traslados Aeropuerto / Puerto</li>
                <li>Coordinación de movilidad laboral</li>
              </ul>
            </div>

            <div className="card animate-on-scroll">
              <h3>🤝 Reuniones y Encuentros</h3>
              <p>Espacios discretos para:</p>
              <ul className="feature-list">
                <li>Reuniones de trabajo</li>
                <li>Encuentros empresariales</li>
                <li>Cenas de negocios</li>
              </ul>
            </div>
          </div>

          <div className="cta-box animate-on-scroll">
            <h3>📞 Consultas Corporativas</h3>
            <p>Si representas a una empresa, contáctanos para conocer tarifas corporativas y convenios.</p>
            <div className="cta-group">
              <a href="#contacto" className="btn primary">👉 Consultar viajes corporativos</a>
            </div>
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
        <section id="ubicacion" className="container reviews-section">
          <div className="section-header animate-on-scroll">
            <h2>Ubicación y Experiencias</h2>
            <p className="section-intro">Tu opinión es fundamental para nosotros. Te invitamos a compartir tu experiencia en Espacio Orella y a visitarnos en nuestro rincón de paz en San Antonio.</p>
          </div>

          <div className="reviews-layout">
            <div className="reviews-cta card animate-on-scroll">
              <div className="google-icon">⭐</div>
              <h3>¡Déjanos una reseña!</h3>
              <p>Si has visitado nuestro espacio, nos encantaría que compartieras tu experiencia. Tu feedback ayuda a otros a descubrir este lugar de bienestar.</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Espacio+Orella+Barrancas+San+Antonio"
                target="_blank"
                rel="noreferrer"
                className="btn primary google-btn"
              >
                Escribir reseña en Google
              </a>
            </div>

            <div className="map-container card animate-on-scroll">
              <iframe
                title="Ubicación Espacio Orella"
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
