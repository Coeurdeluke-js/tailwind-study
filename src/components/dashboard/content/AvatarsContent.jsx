import React from 'react';
import { UserCircle, Palette } from 'lucide-react';

const AvatarsContent = ({ avatarOptions, setAvatarOptions }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-light flex items-center gap-2">
        <UserCircle className="text-sith" size={24} />
        Avatares Personalizables Sith
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-dark/50 p-6 rounded-lg border border-sith/20">
          <div className="aspect-square bg-dark/70 rounded-lg border border-sith/30 flex items-center justify-center mb-4">
            {/* Aquí iría la vista previa del avatar */}
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-sith/20 rounded-full mb-2 flex items-center justify-center">
                <UserCircle size={80} className="text-sith" />
              </div>
              <p className="text-light/70 text-sm">Vista previa del avatar</p>
            </div>
          </div>
          <button className="w-full bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors">
            Guardar Avatar
          </button>
        </div>
        
        <div className="md:col-span-2 bg-dark/50 p-6 rounded-lg border border-sith/20">
          <h3 className="text-xl font-bold text-light mb-4 flex items-center gap-2">
            <Palette className="text-sith" size={20} />
            Personalización
          </h3>
          
          <div className="space-y-4">
            {/* Tono de piel */}
            <div>
              <label className="block text-light mb-2">Tono de piel</label>
              <div className="grid grid-cols-5 gap-2">
                {['pale', 'fair', 'medium', 'dark', 'red'].map(skin => (
                  <button 
                    key={skin}
                    onClick={() => setAvatarOptions(prev => ({...prev, skin}))}
                    className={`h-8 rounded-md ${
                      avatarOptions.skin === skin 
                        ? 'ring-2 ring-sith' 
                        : 'ring-1 ring-sith/30'
                    }`}
                    style={{
                      backgroundColor: 
                        skin === 'pale' ? '#f8d8c9' : 
                        skin === 'fair' ? '#e8b298' : 
                        skin === 'medium' ? '#c68642' : 
                        skin === 'dark' ? '#6d4c41' :
                        '#b71c1c'
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Color de ojos */}
            <div>
              <label className="block text-light mb-2">Color de ojos</label>
              <div className="grid grid-cols-5 gap-2">
                {['yellow', 'red', 'orange', 'purple', 'blue'].map(eyes => (
                  <button 
                    key={eyes}
                    onClick={() => setAvatarOptions(prev => ({...prev, eyes}))}
                    className={`h-8 rounded-md ${
                      avatarOptions.eyes === eyes 
                        ? 'ring-2 ring-sith' 
                        : 'ring-1 ring-sith/30'
                    }`}
                    style={{
                      backgroundColor: 
                        eyes === 'yellow' ? '#ffc107' : 
                        eyes === 'red' ? '#d32f2f' : 
                        eyes === 'orange' ? '#ff5722' : 
                        eyes === 'purple' ? '#9c27b0' :
                        '#1976d2'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarsContent;