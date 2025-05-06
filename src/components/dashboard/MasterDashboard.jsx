import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import { ChevronRight } from 'lucide-react';

// Componentes
import Sidebar from './Sidebar';
import Header from './Header';
import Modal from '../shared/Modal';
import NotificationsPanel from '../shared/NotificationsPanel';
import SecurityPanel from '../shared/SecurityPanel';
import SettingsPanel from '../shared/SettingsPanel';

// Contenidos
import WelcomeContent from './content/WelcomeContent';
import IntroContent from './content/IntroContent';
import AcademyContent from './content/AcademyContent';
import EventsContent from './content/EventsContent';
import AvatarsContent from './content/AvatarsContent';

const MasterDashboard = () => {
  // Usar useRef para evitar re-renderizaciones innecesarias
  const initialized = useRef(false);
  
  // Estados iniciales
  const [isOpen, setIsOpen] = useState(true);
  const [userName, setUserName] = useState('');
  
  // Inicializar darkMode con una función para evitar cálculos innecesarios
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : true;
    } catch (error) {
      console.error('Error al cargar el modo oscuro:', error);
      return true;
    }
  });
  
  const [notifications, setNotifications] = useState([]);
  const [currentContent, setCurrentContent] = useState('welcome');
  const navigate = useNavigate();

  // Estados para los paneles
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSecurityPanel, setShowSecurityPanel] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [showAcolyteModal, setShowAcolyteModal] = useState(false);
  
  // Estado para el avatar personalizable
  const [avatarOptions, setAvatarOptions] = useState({
    skin: 'pale',
    eyes: 'yellow',
    hair: 'black',
    scars: 'none',
    tattoos: 'none'
  });
  
  // Estado para el formulario de configuración
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Funciones de manejo de eventos memoizadas
  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSettingsClick = useCallback(() => {
    setShowSettingsPanel(true);
  }, []);

  const handleNotificationClick = useCallback(() => {
    setShowNotifications(true);
  }, []);

  const handleAcolyteClick = useCallback(() => {
    setShowAcolyteModal(true);
  }, []);

  const handleSectionChange = useCallback((section) => {
    setCurrentContent(section);
    setShowNotifications(false);
    setShowSecurityPanel(false);
    setShowSettingsPanel(false);
  }, []);

  // Manejar el cambio de modo oscuro
  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);

  // Función para manejar cambios en el formulario de perfil
  const handleProfileChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);
  
  // Función para guardar cambios de perfil
  const handleSaveProfile = useCallback(async () => {
    try {
      // Aquí iría la lógica para actualizar el perfil en Supabase
      
      // Actualizar el nombre en localStorage
      localStorage.setItem('userName', profileData.name);
      setUserName(profileData.name);
      
      // Mostrar mensaje de éxito
      alert('Perfil actualizado correctamente');
      setShowSettingsPanel(false);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar el perfil');
    }
  }, [profileData.name]);

  const handleLogout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }, [navigate]);

  // Efecto para cargar datos iniciales - solo se ejecuta una vez
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    try {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
        setProfileData(prev => ({...prev, name: storedName}));
      }
      
      // Simular notificaciones
      setNotifications([
        { id: 1, title: 'Nuevo aprendiz asignado', read: false },
        { id: 2, title: 'Misión completada', read: false },
        { id: 3, title: 'Consejo Sith: reunión programada', read: true }
      ]);
    } catch (error) {
      console.error('Error al inicializar datos:', error);
    }
  }, []);

  // Efecto para manejar el modo oscuro
  useEffect(() => {
    try {
      // Aplicar modo oscuro
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.body.classList.add('bg-dark');
        document.body.classList.remove('bg-light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.body.classList.remove('bg-dark');
        document.body.classList.add('bg-light');
      }

      // Guardar preferencia en localStorage
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.error('Error al aplicar modo oscuro:', error);
    }
  }, [darkMode]); // Solo se ejecuta cuando cambia darkMode

  // Renderizado del componente
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      {/* Barra lateral */}
      <Sidebar 
        isOpen={isOpen}
        userName={userName}
        currentContent={currentContent}
        toggleSidebar={toggleSidebar}
        handleSectionChange={handleSectionChange}
        userRank="Maestro Sith"
      />

      {/* Botón para expandir la barra lateral cuando está colapsada - ELIMINADO */}
      {/* Eliminamos el botón redundante ya que el menú en el header cumple la misma función */}
      
      {/* Contenido principal */}
      <div className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Encabezado */}
        <Header 
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          handleNotificationClick={handleNotificationClick}
          handleSettingsClick={handleSettingsClick}
          handleLogout={handleLogout}
          notifications={notifications}
          title="Panel de Control Maestro Sith"
        />
        
        {/* Contenido principal */}
        <main className="p-6">
          {currentContent === 'welcome' && <WelcomeContent />}
          {currentContent === 'intro' && <IntroContent />}
          {currentContent === 'academy' && <AcademyContent />}
          {currentContent === 'events' && <EventsContent />}
          {currentContent === 'avatars' && (
            <AvatarsContent 
              avatarOptions={avatarOptions} 
              setAvatarOptions={setAvatarOptions} 
            />
          )}
        </main>
      </div>
      
      {/* Paneles laterales */}
      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}
      
      {showSecurityPanel && (
        <SecurityPanel onClose={() => setShowSecurityPanel(false)} />
      )}
      
      {showSettingsPanel && (
        <SettingsPanel onClose={() => setShowSettingsPanel(false)} />
      )}
      
      {/* Modal de confirmación */}
      <Modal 
        isOpen={showAcolyteModal} 
        onClose={() => setShowAcolyteModal(false)}
        title="Confirmar Acción"
      >
        <p className="text-light mb-4">
          ¿Estás seguro de que deseas realizar esta acción? Esta operación no se puede deshacer.
        </p>
      </Modal>
    </div>
  );
};

export default MasterDashboard;