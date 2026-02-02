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
        <div className="quote-calculator animate-on-scroll">
            <div className="quote-header">
                <h3>Cotizador de Experiencias</h3>
                <p>Personaliza tu retiro o evento y obtén un presupuesto estimado al instante.</p>
            </div>

            <div className="quote-grid">
                <div className="quote-inputs">
                    <div className="input-group">
                        <label>Tipo de Servicio</label>
                        <select value={service} onChange={(e) => setService(e.target.value)}>
                            <option value="retiro">Retiro Holístico</option>
                            <option value="taller">Taller Creativo/Culinario</option>
                            <option value="evento">Evento Corporativo/Social</option>
                        </select>
                    </div>

                    <div className="input-group row">
                        <div className="col">
                            <label>Duración (Días)</label>
                            <input
                                type="number"
                                min="1"
                                max="14"
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                            />
                        </div>
                        <div className="col">
                            <label>N° Personas</label>
                            <input
                                type="number"
                                min="5"
                                max="30"
                                value={people}
                                onChange={(e) => setPeople(parseInt(e.target.value) || 5)}
                            />
                        </div>
                    </div>

                    <div className="input-group checkbox">
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={accommodation}
                                onChange={(e) => setAccommodation(e.target.checked)}
                            />
                            <span className="label-text">Incluir Alojamiento</span>
                            <span className="slider"></span>
                        </label>
                    </div>

                    <div className="input-group">
                        <label>Servicio de Alimentación</label>
                        <div className="radio-group">
                            <label className={`radio-opt ${catering === 'none' ? 'active' : ''}`}>
                                <input type="radio" value="none" checked={catering === 'none'} onChange={(e) => setCatering(e.target.value)} />
                                Sin comidas
                            </label>
                            <label className={`radio-opt ${catering === 'breakfast' ? 'active' : ''}`}>
                                <input type="radio" value="breakfast" checked={catering === 'breakfast'} onChange={(e) => setCatering(e.target.value)} />
                                Solo desayuno
                            </label>
                            <label className={`radio-opt ${catering === 'full' ? 'active' : ''}`}>
                                <input type="radio" value="full" checked={catering === 'full'} onChange={(e) => setCatering(e.target.value)} />
                                Pensión completa
                            </label>
                        </div>
                    </div>
                </div>

                <div className="quote-result">
                    <div className="result-card">
                        <span className="result-label">Total Estimado</span>
                        <h2 className="result-price">{formatPrice(total)}</h2>
                        <p className="result-hint">* Este precio es una referencia aproximada y puede variar según requerimientos específicos.</p>
                        <button className="btn primary w-full" onClick={handleConsult}>
                            Consultar por WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteCalculator;
