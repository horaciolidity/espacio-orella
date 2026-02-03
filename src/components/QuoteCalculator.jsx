import React, { useState, useEffect } from 'react';

const QuoteCalculator = () => {
    const [service, setService] = useState('retiro');
    const [duration, setDuration] = useState(2);
    const [people, setPeople] = useState(10);
    const [accommodation, setAccommodation] = useState(true);
    const [catering, setCatering] = useState('full'); // none, breakfast, full
    const [total, setTotal] = useState(0);

    const prices = {
        base: {
            retiro: 150000, // Diarios base por grupo
            taller: 100000,
            evento: 200000
        },
        accommodation: 25000, // Por persona/noche
        catering: {
            none: 0,
            breakfast: 8000,
            full: 25000
        }
    };

    useEffect(() => {
        let subtotal = prices.base[service] * duration;

        if (accommodation) {
            subtotal += prices.accommodation * people * (duration - 1);
        }

        subtotal += prices.catering[catering] * people * duration;

        setTotal(subtotal);
    }, [service, duration, people, accommodation, catering]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
        }).format(price);
    };

    const handleConsult = () => {
        const message = `Hola! Me gustaría consultar por un presupuesto para:\n- Tipo: ${service}\n- Duración: ${duration} días\n- Personas: ${people}\n- Alojamiento: ${accommodation ? 'Sí' : 'No'}\n- Comidas: ${catering}\n- Total estimado: ${formatPrice(total)}`;
        window.location.href = `https://wa.me/569XXXXXXXX?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="booking-quote-container animate-on-scroll">
            <div className="booking-wrapper">
                <div className="booking-title">
                    <h3>📅 Reserva tu Experiencia</h3>
                    <p>Cotiza tu estadía o evento al instante</p>
                </div>

                <div className="booking-bar">
                    <div className="booking-field">
                        <label>📂 Tipo de Servicio</label>
                        <div className="input-wrapper">
                            <select value={service} onChange={(e) => setService(e.target.value)}>
                                <option value="retiro">Retiro Holístico</option>
                                <option value="taller">Taller Creativo</option>
                                <option value="evento">Evento Social</option>
                            </select>
                        </div>
                    </div>

                    <div className="booking-field">
                        <label>🗓️ Duración / 👥 Pax</label>
                        <div className="input-row">
                            <input
                                type="number"
                                min="1"
                                max="14"
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                                placeholder="Días"
                                title="Días"
                            />
                            <span className="separator">|</span>
                            <input
                                type="number"
                                min="5"
                                max="30"
                                value={people}
                                onChange={(e) => setPeople(parseInt(e.target.value) || 5)}
                                placeholder="Personas"
                                title="Personas"
                            />
                        </div>
                    </div>

                    <div className="booking-field">
                        <label>⚙️ Opciones</label>
                        <div className="options-row">
                            <label className="checkbox-mini">
                                <input
                                    type="checkbox"
                                    checked={accommodation}
                                    onChange={(e) => setAccommodation(e.target.checked)}
                                />
                                <span>Alojamiento</span>
                            </label>
                            <select
                                className="mini-select"
                                value={catering}
                                onChange={(e) => setCatering(e.target.value)}
                            >
                                <option value="none">Sin comidas</option>
                                <option value="breakfast">Desayuno</option>
                                <option value="full">Pensión completa</option>
                            </select>
                        </div>
                    </div>

                    <div className="booking-action">
                        <div className="price-display">
                            <small>Total Estimado</small>
                            <span className="price">{formatPrice(total)}</span>
                        </div>
                        <button className="btn-search" onClick={handleConsult}>
                            Solicitar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteCalculator;
