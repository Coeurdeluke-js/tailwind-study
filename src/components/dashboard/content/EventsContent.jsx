import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const EventsContent = () => {
  const events = [
    {
      title: "Ceremonia de Iniciación",
      date: "15 de Marzo, 2024",
      time: "19:00",
      location: "Sala Principal"
    },
    {
      title: "Entrenamiento Especial",
      date: "20 de Marzo, 2024",
      time: "16:00",
      location: "Campo de Entrenamiento"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-light flex items-center gap-2">
        <Calendar className="text-sith" size={24} />
        Eventos Destacados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <div key={index} className="bg-dark/50 p-6 rounded-lg border border-sith/20">
            <h3 className="text-xl font-bold text-light mb-2">{event.title}</h3>
            <div className="space-y-2 text-light/80">
              <p className="flex items-center gap-2">
                <Calendar size={16} className="text-sith" />
                {event.date}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-sith" />
                {event.time}
              </p>
            </div>
            <button className="mt-4 bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors">
              Inscribirse
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsContent;