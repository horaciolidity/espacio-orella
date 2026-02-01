import React, { useState, useEffect, useRef } from 'react';
import { FaWhatsapp, FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const CHAT_FLOW = [
    {
        id: 'start',
        message: '¡Hola! Bienvenid@ a Espacio Orellana. 🌿 Soy tu asistente virtual. ¿Cómo te llamas?',
        key: 'name',
        next: 'service'
    },
    {
        id: 'service',
        message: 'Gusto en conocerte, {name}. ¿Qué tipo de experiencia estás buscando?',
        key: 'service',
        options: [
            { label: 'Retiro de Bienestar 🧘', value: 'retiro' },
            { label: 'Alojamiento / Estadía 🏠', value: 'alojamiento' },
            { label: 'Talleres (Cocina/Holístico) 🎨', value: 'taller' },
            { label: 'Visita por el día 🌅', value: 'visita' }
        ],
        next: 'people'
    },
    {
        id: 'people',
        message: 'Excelente elección. ¿Para cuántas personas sería la reserva?',
        key: 'people',
        next: 'final'
    },
    {
        id: 'final',
        message: 'Perfecto. He preparado tu pre-reserva. Haz clic abajo para enviarme estos datos por WhatsApp y confirmar disponibilidad con el equipo.',
        isLast: true
    }
];

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [userData, setUserData] = useState({});
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            addBotMessage(CHAT_FLOW[0].message);
        }
        scrollToBottom();
    }, [isOpen, messages]);

    const addBotMessage = (text) => {
        const formattedText = text.replace('{name}', userData.name || '');
        setMessages(prev => [...prev, { type: 'bot', text: formattedText, options: CHAT_FLOW[currentStep].options }]);
    };

    const handleUserInput = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const currentStepData = CHAT_FLOW[currentStep];
        const newUserData = { ...userData, [currentStepData.key]: inputValue };
        setUserData(newUserData);
        setMessages(prev => [...prev, { type: 'user', text: inputValue }]);
        setInputValue('');

        // Move to next step
        if (CHAT_FLOW[currentStep + 1]) {
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                const nextStep = CHAT_FLOW[currentStep + 1];
                const nextMsg = nextStep.message.replace('{name}', newUserData.name || '');
                setMessages(prev => [...prev, { type: 'bot', text: nextMsg, options: nextStep.options }]);
            }, 1000);
        }
    };

    const handleOptionClick = (option) => {
        const currentStepData = CHAT_FLOW[currentStep];
        const newUserData = { ...userData, [currentStepData.key]: option.label };
        setUserData(newUserData);
        setMessages(prev => [...prev, { type: 'user', text: option.label }]);

        if (CHAT_FLOW[currentStep + 1]) {
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                const nextStep = CHAT_FLOW[currentStep + 1];
                const nextMsg = nextStep.message.replace('{name}', newUserData.name || '');
                setMessages(prev => [...prev, { type: 'bot', text: nextMsg, options: nextStep.options }]);
            }, 1000);
        }
    };

    const finishToWhatsApp = () => {
        const phone = "569XXXXXXXX"; // Replace with real number
        const text = `Hola! Vengo del asistente web. 🌿\n\nMis datos de pre-reserva:\n👤 Nombre: ${userData.name}\n✨ Interés: ${userData.service}\n👥 Personas: ${userData.people}\n\n¿Me podrían dar más detalles?`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
            {!isOpen && (
                <button className="chat-trigger" onClick={() => setIsOpen(true)}>
                    <span className="chat-tooltip">¡Reserva aquí! ✨</span>
                    <FaRobot className="bot-icon" />
                </button>
            )}

            {isOpen && (
                <div className="chat-window card">
                    <div className="chat-header">
                        <div className="bot-info">
                            <FaRobot />
                            <div>
                                <h4>Asistente Orellana</h4>
                                <span className="online-tag">En línea</span>
                            </div>
                        </div>
                        <button className="close-chat" onClick={() => setIsOpen(false)}><FaTimes /></button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((m, i) => (
                            <div key={i} className={`message-bubble ${m.type}`}>
                                {m.text}
                                {m.options && (
                                    <div className="chat-options">
                                        {m.options.map((opt, j) => (
                                            <button key={j} onClick={() => handleOptionClick(opt)} className="opt-btn">
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {CHAT_FLOW[currentStep]?.isLast && (
                            <button className="btn whatsapp-btn chat-wa" onClick={finishToWhatsApp}>
                                <FaWhatsapp /> Finalizar por WhatsApp
                            </button>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {!CHAT_FLOW[currentStep]?.isLast && !CHAT_FLOW[currentStep]?.options && (
                        <form className="chat-input" onSubmit={handleUserInput}>
                            <input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Escribe aquí..."
                            />
                            <button type="submit"><FaPaperPlane /></button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}

export default ChatBot;
