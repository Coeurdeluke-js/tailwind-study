import React from 'react';
import { Star, Shield, Sword, UserPlus } from 'lucide-react';

const WelcomeContent = () => {
  return (
    <div className="space-y-6">
      <div className="bg-dark/50 p-6 rounded-lg border border-sith/20">
        <h2 className="text-2xl font-bold text-light mb-4">Bienvenido a la Academia Sith</h2>
        <p className="text-light/80 mb-4">
          Has dado el primer paso en tu camino hacia el poder. Como Iniciado, tendrás acceso a conocimientos básicos
          sobre la Fuerza y la filosofía Sith. Completa las lecciones y desafíos para avanzar en tu entrenamiento.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-dark/30 p-4 rounded-lg border border-sith/20">
            <div className="flex items-center mb-2">
              <Star className="text-sith mr-2" size={20} />
              <h3 className="text-lg font-bold text-light">Rango Actual</h3>
            </div>
            <p className="text-light/70">Iniciado</p>
          </div>
          <div className="bg-dark/30 p-4 rounded-lg border border-sith/20">
            <div className="flex items-center mb-2">
              <Shield className="text-sith mr-2" size={20} />
              <h3 className="text-lg font-bold text-light">Nivel de Acceso</h3>
            </div>
            <p className="text-light/70">Básico</p>
          </div>
          <div className="bg-dark/30 p-4 rounded-lg border border-sith/20">
            <div className="flex items-center mb-2">
              <Sword className="text-sith mr-2" size={20} />
              <h3 className="text-lg font-bold text-light">Entrenamiento</h3>
            </div>
            <p className="text-light/70">Nivel 1</p>
          </div>
        </div>
      </div>
      
      <div className="bg-dark/50 p-6 rounded-lg border border-sith/20">
        <div className="flex items-center mb-4">
          <UserPlus className="text-sith mr-2" size={24} />
          <h2 className="text-2xl font-bold text-light">Próximo Nivel: Acólito</h2>
        </div>
        <p className="text-light/80 mb-4">
          Completa tu entrenamiento de Iniciado para ser considerado para el rango de Acólito.
          Los Acólitos tienen acceso a conocimientos más profundos y entrenamientos especializados.
        </p>
        <div className="w-full bg-dark/30 rounded-full h-4 mb-2">
          <div className="bg-sith h-4 rounded-full" style={{ width: '35%' }}></div>
        </div>
        <p className="text-light/60 text-sm mb-4">Progreso: 35% completado</p>
        
        {/* Lista de logros y misiones */}
        <div className="mb-4 bg-dark/30 p-3 rounded-lg border border-sith/10">
          <h3 className="text-light font-semibold mb-2">Logros:</h3>
          <ul className="space-y-1 text-light/80 text-sm">
            <li className="flex items-center">
              <span className="text-sith mr-2">✓</span> Mostrar interés en Crypto Force
            </li>
            <li className="flex items-center">
              <span className="text-sith mr-2">✓</span> Conocer a tu Darth y recibir indicaciones
            </li>
            <li className="flex items-center">
              <span className="text-sith mr-2">✓</span> Completar registro en la Academia Sith
            </li>
          </ul>
          
          <h3 className="text-light font-semibold mt-3 mb-2">Misiones pendientes:</h3>
          <ul className="space-y-1 text-light/80 text-sm">
            <li className="flex items-center">
              <span className="text-light/50 mr-2">○</span> Presentarte ante el consejo Sith
            </li>
            <li className="flex items-center">
              <span className="text-light/50 mr-2">○</span> Completar tu primer entrenamiento básico
            </li>
            <li className="flex items-center">
              <span className="text-light/50 mr-2">○</span> Demostrar lealtad a la Orden Sith
            </li>
            <li className="flex items-center">
              <span className="text-light/50 mr-2">○</span> Obtener tu primer sable de luz
            </li>
          </ul>
        </div>
        
        <button className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors">
          Convertirme en acólito
        </button>
      </div>
    </div>
  );
};

export default WelcomeContent;