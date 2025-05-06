import React from 'react';
import { Star, Shield, Sword } from 'lucide-react';

const RankContent = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-light flex items-center gap-2">
        <Star className="text-sith" size={24} />
        Información de Rango
      </h2>
      
      <div className="bg-dark/50 p-6 rounded-lg border border-sith/20">
        <h3 className="text-xl font-bold text-light mb-4">Detalles de tu Rango</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <Star className="text-sith mr-2" size={16} />
            <span className="text-light">Nivel inicial en la jerarquía Sith</span>
          </div>
          <div className="flex items-center">
            <Shield className="text-sith mr-2" size={16} />
            <span className="text-light">Acceso a recursos básicos de entrenamiento</span>
          </div>
          <div className="flex items-center">
            <Sword className="text-sith mr-2" size={16} />
            <span className="text-light">Entrenamiento de combate nivel 1</span>
          </div>
        </div>
      </div>
      
      <div className="bg-dark/50 p-6 rounded-lg border border-sith/20">
        <h3 className="text-xl font-bold text-light mb-4">Progresión de Rango</h3>
        <p className="text-light/80 mb-4">
          Completa misiones y entrenamientos para avanzar en la jerarquía Sith.
          Cada nivel te otorga nuevos privilegios y acceso a conocimientos más profundos.
        </p>
        <div className="w-full bg-dark/30 rounded-full h-4 mb-2">
          <div className="bg-sith h-4 rounded-full" style={{ width: '35%' }}></div>
        </div>
        <p className="text-light/60 text-sm">Progreso hacia el siguiente rango: 35%</p>
      </div>
    </div>
  );
};

export default RankContent;