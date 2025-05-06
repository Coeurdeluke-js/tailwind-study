import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  // Estados
  const [isOpen, setIsOpen] = useState(true);
  const [userName, setUserName] = useState('');
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
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSecurityPanel, setShowSecurityPanel] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [showAcolyteModal, setShowAcolyteModal] = useState(false);
  const [avatarOptions, setAvatarOptions] = useState({
    skin: 'pale',
    eyes: 'yellow',
    hair: 'black',
    scars: 'none',
    tattoos: 'none'
  });
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();

  // Funciones
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

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);

  const handleProfileChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);
  
  // Estado para las notificaciones toast
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // Función para mostrar una notificación toast
  const showToast = useCallback((message, type = 'success') => {
    setToast({
      show: true,
      message,
      type
    });
  }, []);

  // Función para ocultar la notificación toast
  const hideToast = useCallback(() => {
    setToast(prev => ({
      ...prev,
      show: false
    }));
  }, []);
  
  const handleSaveProfile = useCallback(async () => {
    try {
      // Obtener el usuario actual
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No se encontró usuario');
      
      // Actualizar metadatos del usuario en Supabase Auth
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          name: profileData.name,
          username: profileData.username  // Cambiado de nickname a username
        }
      });
      
      if (updateError) throw updateError;
      
      // Actualizar la tabla users si existe
      const { error: dbError } = await supabase
        .from('users')
        .update({ 
          name: profileData.name
          // Eliminamos nickname ya que no existe en la tabla
        })
        .eq('id', user.id);
      
      if (dbError && dbError.code !== 'PGRST116') {
        console.error('Error al actualizar la base de datos:', dbError);
        throw dbError;
      }
      
      // Guardar en localStorage para acceso rápido
      localStorage.setItem('userName', profileData.name);
      localStorage.setItem('userNickname', profileData.username);
      
      setUserName(profileData.name);
      
      // Mostrar notificación de éxito
      showToast('Perfil actualizado correctamente');
      
      setShowSettingsPanel(false);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      // Mostrar notificación de error
      showToast('Error al actualizar el perfil: ' + error.message, 'error');
    }
  }, [profileData, showToast]);

  const handleLogout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }, [navigate]);

  // Efectos
  useEffect(() => {
    try {
      const storedName = localStorage.getItem('userName');
      const storedNickname = localStorage.getItem('userNickname');
      
      if (storedName) {
        setUserName(storedName);
        setProfileData(prev => ({...prev, name: storedName}));
      }
      
      if (storedNickname) {
        setProfileData(prev => ({...prev, username: storedNickname}));
      }
      
      // Cargar datos del usuario desde Supabase
      const loadUserData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Obtener datos de la tabla users si existe
          const { data, error } = await supabase
            .from('users')
            .select('name, nickname')
            .eq('id', user.id)
            .single();
          
          if (!error && data) {
            setUserName(data.name || user.user_metadata?.name || '');
            setProfileData(prev => ({
              ...prev, 
              name: data.name || user.user_metadata?.name || '',
              username: data.nickname || user.user_metadata?.nickname || ''
            }));
            
            // Actualizar localStorage
            localStorage.setItem('userName', data.name || user.user_metadata?.name || '');
            localStorage.setItem('userNickname', data.nickname || user.user_metadata?.nickname || '');
          } else {
            // Usar metadatos del usuario si no hay tabla users
            setUserName(user.user_metadata?.name || '');
            setProfileData(prev => ({
              ...prev, 
              name: user.user_metadata?.name || '',
              username: user.user_metadata?.nickname || ''
            }));
          }
        }
      };
      
      loadUserData();
      
      setNotifications([
        { id: 1, title: 'Nuevo evento disponible', read: false },
        { id: 2, title: 'Actualización de rango', read: false }
      ]);
    } catch (error) {
      console.error('Error al inicializar datos:', error);
    }
  }, []);

  useEffect(() => {
    try {
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

      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.error('Error al aplicar modo oscuro:', error);
    }
  }, [darkMode]);

  const value = {
    // Estados
    isOpen,
    userName,
    darkMode,
    notifications,
    currentContent,
    showNotifications,
    showSecurityPanel,
    showSettingsPanel,
    showAcolyteModal,
    avatarOptions,
    profileData,
    toast,
    
    // Funciones
    setIsOpen,
    setUserName,
    setDarkMode,
    setNotifications,
    setCurrentContent,
    setShowNotifications,
    setShowSecurityPanel,
    setShowSettingsPanel,
    setShowAcolyteModal,
    setAvatarOptions,
    setProfileData,
    toggleSidebar,
    handleSettingsClick,
    handleNotificationClick,
    handleAcolyteClick,
    handleSectionChange,
    toggleDarkMode,
    handleProfileChange,
    handleSaveProfile,
    handleLogout,
    showToast,
    hideToast
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);