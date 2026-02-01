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

        <section id="eventos" className="container">
          <h2>Eventos y Contrataciones</h2>
          <ul className="services-list">
            <li className="card">Talleres holísticos</li>
            <li className="card">Retiros de bienestar</li>
            <li className="card">Talleres de cocina autóctona</li>
            <li className="card">Eventos creativos y culturales</li>
          </ul>
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
