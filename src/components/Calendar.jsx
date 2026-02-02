import React, { useState } from 'react'

function Calendar() {
  const [current, setCurrent] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [service, setService] = useState('visita')

  const startOfMonth = new Date(current.getFullYear(), current.getMonth(), 1)
  const endOfMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0)
  const startDay = startOfMonth.getDay() // 0-6 (Sun-Sat)

  const days = []
  // fill blanks
  for (let i = 0; i < startDay; i++) days.push(null)
  for (let d = 1; d <= endOfMonth.getDate(); d++) days.push(new Date(current.getFullYear(), current.getMonth(), d))

  const prevMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1))
  const nextMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1))

  const handleDateSelect = (date) => {
    if (!date) return
    setSelectedDate(date)
  }

  const handleWhatsApp = () => {
    if (!selectedDate) {
      alert('Por favor selecciona una fecha primero')
      return
    }

    const phone = "569XXXXXXXX" // USER should replace this with their real number
    const dateStr = selectedDate.toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

    const message = encodeURIComponent(
      `Hola Espacio Orella! 👋\n\nMe gustaría consultar disponibilidad para:\n📌 *${service.toUpperCase()}*\n📅 Fecha: *${dateStr}*\n\n¿Me podrían dar más información?`
    )

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  const monthName = current.toLocaleString('es-CL', { month: 'long', year: 'numeric' })

  const isSelected = (date) => {
    if (!selectedDate || !date) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className="calendar-card card">
      <div className="calendar-layout">
        <div className="calendar-main">
          <div className="cal-header">
            <button className="cal-nav-btn" onClick={prevMonth} aria-label="Mes anterior">‹</button>
            <div className="cal-title">{monthName}</div>
            <button className="cal-nav-btn" onClick={nextMonth} aria-label="Mes siguiente">›</button>
          </div>
          <div className="cal-grid">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
              <div key={d} className="cal-weekday">{d}</div>
            ))}
            {days.map((dt, idx) => (
              <button
                key={idx}
                disabled={dt && dt < today}
                className={`cal-day ${dt ? 'active' : ''} ${isSelected(dt) ? 'selected' : ''} ${dt && dt < today ? 'disabled' : ''}`}
                onClick={() => handleDateSelect(dt)}
              >
                {dt ? dt.getDate() : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="calendar-options">
          <h3>Detalles de la reserva</h3>

          <div className="service-selector">
            <label>¿Qué deseas contratar?</label>
            <select value={service} onChange={(e) => setService(e.target.value)}>
              <option value="visita">Visita Guiada</option>
              <option value="retiro">Retiro de Bienestar</option>
              <option value="taller-holistico">Taller Holístico</option>
              <option value="taller-cocina">Taller de Cocina</option>
              <option value="alojamiento">Estadía / Alojamiento</option>
              <option value="evento-privado">Evento Privado</option>
            </select>
          </div>

          <div className="selected-summary">
            {selectedDate ? (
              <p>Fecha seleccionada: <strong>{selectedDate.toLocaleDateString('es-CL')}</strong></p>
            ) : (
              <p className="hint">Por favor, selecciona una fecha en el calendario</p>
            )}
          </div>

          <button
            className="btn whatsapp-btn"
            onClick={handleWhatsApp}
            disabled={!selectedDate}
          >
            <span>📱 Reservar por WhatsApp</span>
          </button>
          <p className="disclaimer">Te responderemos a la brevedad para confirmar disponibilidad.</p>
        </div>
      </div>
    </div>
  )
}

export default Calendar
