import React from 'react';
import { Book, Sword, BookOpen, Clock } from 'lucide-react';

const AcademyContent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-light flex items-center gap-2">
        <Book className="text-sith" size={24} />
        Explorar Academia
      </h2>
      {/* Resto del contenido de academia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-dark/50 p-6 rounded-lg border border-sith/20">
          <h3 className="text-xl font-bold text-light mb-4 flex items-center gap-2">
            <Sword className="text-sith" size={20} />
            Entrenamiento de Combate
          </h3>
          <p className="text-light/80 mb-4">
            Domina las técnicas de combate Sith y aprende a canalizar tu ira en poder destructivo.
          </p>
          <div className="flex items-center gap-2 text-light/70 mb-4">
            <Clock size={16} />
            <span>Duración: 4 semanas</span>
          </div>
          <button className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors">
            Ver detalles
          </button>
        </div>
        <div className="bg-dark/50 p-6 rounded-lg border border-sith/20">
          <h3 className="text-xl font-bold text-light mb-4 flex items-center gap-2">
            <BookOpen className="text-sith" size={20} />
            Códigos Sith Ancestrales
          </h3>
          <p className="text-light/80 mb-4">
            Estudia los antiguos textos Sith y descubre secretos olvidados del lado oscuro.
          </p>
          <div className="flex items-center gap-2 text-light/70 mb-4">
            <Clock size={16} />
            <span>Duración: 3 semanas</span>
          </div>
          <button className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors">
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademyContent;