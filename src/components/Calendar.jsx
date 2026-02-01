import React, { useState } from 'react'

function Calendar(){
  const [current, setCurrent] = useState(new Date())

  const startOfMonth = new Date(current.getFullYear(), current.getMonth(), 1)
  const endOfMonth = new Date(current.getFullYear(), current.getMonth()+1, 0)
  const startDay = startOfMonth.getDay() // 0-6 (Sun-Sat)

  const days = []
  // fill blanks
  for(let i=0;i<startDay;i++) days.push(null)
  for(let d=1; d<=endOfMonth.getDate(); d++) days.push(new Date(current.getFullYear(), current.getMonth(), d))

  const prevMonth = ()=> setCurrent(new Date(current.getFullYear(), current.getMonth()-1,1))
  const nextMonth = ()=> setCurrent(new Date(current.getFullYear(), current.getMonth()+1,1))

  const handleDateClick = (date)=>{
    if(!date) return
    const iso = date.toISOString().slice(0,10)
    const subject = encodeURIComponent(`Solicitud de visita: ${iso}`)
    const body = encodeURIComponent(`Hola,%0A%0AMe gustaría solicitar una visita para el día ${iso}.%0A%0ASaludos.`)
    window.location.href = `mailto:contacto@espacioorella.cl?subject=${subject}&body=${body}`
  }

  const monthName = current.toLocaleString('es-CL',{month:'long', year:'numeric'})

  return (
    <div className="calendar">
      <div className="cal-header">
        <button onClick={prevMonth} aria-label="Mes anterior">‹</button>
        <div className="cal-title">{monthName}</div>
        <button onClick={nextMonth} aria-label="Mes siguiente">›</button>
      </div>
      <div className="cal-grid">
        {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(d=> <div key={d} className="cal-weekday">{d}</div>)}
        {days.map((dt,idx)=> (
          <button key={idx} className={`cal-day ${dt? 'active':''}`} onClick={()=> handleDateClick(dt)}>
            {dt ? dt.getDate() : ''}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Calendar
