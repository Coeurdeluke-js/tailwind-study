import React from 'react';
import { ScrollText, Sparkles, BookOpen } from 'lucide-react';

const IntroContent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-light flex items-center gap-2">
        <ScrollText className="text-sith" size={24} />
        Contenido Introductorio
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark/50 p-6 rounded-lg border border-sith/20">
          <h3 className="text-xl font-bold text-light mb-4 flex items-center gap-2">
            <Sparkles className="text-sith" size={20} />
            Fundamentos del Poder Oscuro
          </h3>
          <p className="text-light/80 mb-4">Duración: 2 horas</p>
          <button className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors">
            Comenzar
          </button>
        </div>
        <div className="bg-dark/50 p-6 rounded-lg border border-sith/20">
          <h3 className="text-xl font-bold text-light mb-4 flex items-center gap-2">
            <BookOpen className="text-sith" size={20} />
            Historia Sith
          </h3>
          <p className="text-light/80 mb-4">Duración: 1.5 horas</p>
          <button className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors">
            Comenzar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroContent;