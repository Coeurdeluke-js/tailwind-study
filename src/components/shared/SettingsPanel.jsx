import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, Eye, EyeOff, Phone, HelpCircle } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { useDashboard } from '../../contexts/DashboardContext';

const SettingsPanel = ({ 
  profileData, 
  onChange, 
  onSave, 
  onClose, 
  darkMode,
  onToggleDarkMode
}) => {
  const { showToast } = useDashboard();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [securityData, setSecurityData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getEmail = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setSecurityData(prev => ({
            ...prev,
            email: user.email,
            phone: user.user_metadata?.phone || ''
          }));
        }
      } catch (err) {
        setErrorMessage('Error al obtener datos del usuario: ' + err.message);
        showToast('Error al obtener datos del usuario', 'error');
      }
    };
    getEmail();
  }, []);

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateEmail = async () => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        email: securityData.email
      });
      
      if (error) throw error;
      
      showToast('Se ha enviado un enlace de confirmación a tu nuevo correo electrónico');
      onClose();
    } catch (err) {
      console.error('Error al actualizar el correo:', err);
      setErrorMessage('Error al actualizar el correo: ' + err.message);
      showToast('Error al actualizar el correo: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    setLoading(true);
    
    if (securityData.newPassword !== securityData.confirmPassword) {
      showToast('Las contraseñas no coinciden', 'error');
      setErrorMessage('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: securityData.newPassword
      });
      
      if (error) throw error;
      
      showToast('Contraseña actualizada correctamente');
      setSecurityData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      onClose();
    } catch (err) {
      console.error('Error al actualizar la contraseña:', err);
      setErrorMessage('Error al actualizar la contraseña: ' + err.message);
      showToast('Error al actualizar la contraseña: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const updatePhone = async () => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          phone: securityData.phone
        }
      });
      
      if (error) throw error;
      
      showToast('Número de teléfono actualizado correctamente');
      onClose();
    } catch (err) {
      console.error('Error al actualizar el número de teléfono:', err);
      setErrorMessage('Error al actualizar el número de teléfono: ' + err.message);
      showToast('Error al actualizar el número de teléfono: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveProfile = () => {
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[200] flex justify-end">
      <div className="bg-dark/95 w-full max-w-md h-full overflow-y-auto border-l border-sith/20">
        <div className="p-3 sm:p-4 border-b border-sith/20 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold text-light">Ajustes</h2>
          <button 
            onClick={onClose}
            className="text-light hover:text-sith transition-colors p-1"
            aria-label="Cerrar panel"
          >
            <X size={22} />
          </button>
        </div>
        
        {errorMessage && (
          <div className="bg-red-500/20 border border-red-500 text-light p-2 sm:p-3 m-2 sm:m-4 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}
        
        <div className="flex border-b border-sith/20 text-sm sm:text-base">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 sm:py-3 text-center ${activeTab === 'profile' ? 'text-sith border-b-2 border-sith' : 'text-light/70'}`}
          >
            Perfil
          </button>
          <button 
            onClick={() => setActiveTab('appearance')}
            className={`flex-1 py-2 sm:py-3 text-center ${activeTab === 'appearance' ? 'text-sith border-b-2 border-sith' : 'text-light/70'}`}
          >
            Apariencia
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-2 sm:py-3 text-center ${activeTab === 'security' ? 'text-sith border-b-2 border-sith' : 'text-light/70'}`}
          >
            Seguridad
          </button>
        </div>
        
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Pestaña de Perfil */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div>
                <label className="block text-light/70 mb-1 sm:mb-2 text-sm sm:text-base">Nombre real</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={onChange}
                    className="w-full bg-dark/50 border border-sith/20 rounded-lg p-2 pl-9 sm:pl-10 text-light text-sm sm:text-base"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-sith/70" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-light/70 mb-1 sm:mb-2 text-sm sm:text-base">Nickname</label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={onChange}
                    className="w-full bg-dark/50 border border-sith/20 rounded-lg p-2 pl-9 sm:pl-10 text-light text-sm sm:text-base"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-sith/70" size={16} />
                </div>
              </div>
              <button
                onClick={handleSaveProfile}
                className="w-full bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors mt-4 text-sm sm:text-base"
              >
                Guardar cambios
              </button>
            </div>
          )}
          
          {/* Pestaña de Apariencia */}
          {activeTab === 'appearance' && (
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-light mb-3 sm:mb-4">Apariencia</h3>
              <div className="flex items-center justify-between">
                <span className="text-light/70 text-sm sm:text-base">Modo oscuro</span>
                <button
                  onClick={onToggleDarkMode}
                  className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full relative ${darkMode ? 'bg-sith' : 'bg-dark/50'} transition-colors`}
                  aria-label={darkMode ? "Desactivar modo oscuro" : "Activar modo oscuro"}
                >
                  <span 
                    className={`absolute top-1 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-light transition-transform ${
                      darkMode ? 'right-1' : 'left-1'
                    }`} 
                  />
                </button>
              </div>
            </div>
          )}
          
          {/* Pestaña de Seguridad */}
          {activeTab === 'security' && (
            <div className="space-y-4 sm:space-y-6">
              {/* Cambiar email */}
              <div className="space-y-3 sm:space-y-4 pb-4 sm:pb-6 border-b border-sith/10">
                <h3 className="text-base sm:text-lg font-semibold text-light">Modificar email</h3>
                <div>
                  <label className="block text-light/70 mb-1 sm:mb-2 text-sm sm:text-base">Nuevo email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={securityData.email}
                      onChange={handleSecurityChange}
                      className="w-full bg-dark/50 border border-sith/20 rounded-lg p-2 pl-9 sm:pl-10 text-light text-sm sm:text-base"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-sith/70" size={16} />
                  </div>
                </div>
                <button
                  onClick={updateEmail}
                  disabled={loading}
                  className={`w-full bg-sith text-light px-3 sm:px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors text-sm sm:text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Actualizando...' : 'Actualizar email'}
                </button>
              </div>
              
              {/* Cambiar contraseña */}
              <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2 pb-4 sm:pb-6 border-b border-sith/10">
                <h3 className="text-base sm:text-lg font-semibold text-light">Modificar contraseña</h3>
                <div>
                  <label className="block text-light/70 mb-1 sm:mb-2 text-sm sm:text-base">Contraseña actual</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      value={securityData.currentPassword}
                      onChange={handleSecurityChange}
                      className="w-full bg-dark/50 border border-sith/20 rounded-lg p-2 pl-9 sm:pl-10 text-light text-sm sm:text-base"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-sith/70" size={16} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-sith hover:text-sith-dark"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-light/70 mb-1 sm:mb-2 text-sm sm:text-base">Nueva contraseña</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={securityData.newPassword}
                      onChange={handleSecurityChange}
                      className="w-full bg-dark/50 border border-sith/20 rounded-lg p-2 pl-9 sm:pl-10 text-light text-sm sm:text-base"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-sith/70" size={16} />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-sith hover:text-sith-dark"
                      aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-light/70 mb-1 sm:mb-2 text-sm sm:text-base">Confirmar contraseña</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={securityData.confirmPassword}
                      onChange={handleSecurityChange}
                      className="w-full bg-dark/50 border border-sith/20 rounded-lg p-2 pl-9 sm:pl-10 text-light text-sm sm:text-base"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-sith/70" size={16} />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-sith hover:text-sith-dark"
                      aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={updatePassword}
                  disabled={loading}
                  className={`w-full bg-sith text-light px-3 sm:px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors text-sm sm:text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Actualizando...' : 'Actualizar contraseña'}
                </button>
              </div>
              
              {/* Sección de contacto */}
              <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-semibold text-light">¿Quieres asistencia personalizada?</h3>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowPhoneTooltip(!showPhoneTooltip)}
                      className="text-light/70 hover:text-light"
                      aria-label="Información sobre asistencia personalizada"
                    >
                      <HelpCircle size={16} />
                    </button>
                    {showPhoneTooltip && (
                      <div className="absolute right-0 bottom-full mb-2 w-48 sm:w-64 p-2 sm:p-3 bg-dark/90 border border-sith/20 rounded-lg text-light/80 text-xs shadow-lg z-10">
                        Tu número de teléfono nos ayuda a brindarte asistencia personalizada y mejorar nuestros servicios. Esta información es opcional y será tratada con confidencialidad.
                        <div className="absolute bottom-[-6px] right-2 w-3 h-3 bg-dark/90 border-r border-b border-sith/20 transform rotate-45"></div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-light/60 text-xs sm:text-sm">
                  Proporciona tu número de teléfono para recibir asistencia personalizada y acceso a eventos exclusivos.
                </p>
                <div>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={securityData.phone}
                      onChange={handleSecurityChange}
                      placeholder="+34 91 7060-4565"
                      className="w-full bg-dark/50 border border-sith/20 rounded-lg p-2 pl-9 sm:pl-10 text-light text-sm sm:text-base"
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-sith/70" size={16} />
                  </div>
                  <p className="text-light/50 text-xs mt-1">
                    * Esta información es completamente opcional y será tratada con confidencialidad.
                  </p>
                </div>
                <button
                  onClick={updatePhone}
                  disabled={loading}
                  className={`w-full bg-sith/80 text-light px-3 sm:px-4 py-2 rounded-lg hover:bg-sith transition-colors text-sm sm:text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Guardando...' : 'Guardar información de contacto'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;