import React from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import Sidebar from './Sidebar';
import Header from './Header';
import ContentRenderer from './ContentRenderer';
import PanelManager from './PanelManager';
import Toast from '../shared/Toast';

const DashboardLayout = ({ userRank }) => {
  const {
    isOpen,
    userName,
    darkMode,
    notifications,
    currentContent,
    profileData,
    toast,
    toggleSidebar,
    handleSectionChange,
    toggleDarkMode,
    handleNotificationClick,
    handleSettingsClick,
    handleLogout,
    hideToast
  } = useDashboard();

  // Función para determinar el título según el contenido actual
  const getTitle = () => {
    switch (currentContent) {
      case 'welcome':
        return `Bienvenido, ${profileData.username || 'Iniciado'}`;
      case 'intro':
        return 'Introducción';
      case 'academy':
        return 'Academia Sith';
      case 'events':
        return 'Eventos';
      case 'avatars':
        return 'Personalización de Avatar';
      case 'rank':
        return 'Información de Rango';
      default:
        return 'Academia Sith';
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      {/* Barra lateral */}
      <Sidebar 
        isOpen={isOpen}
        userName={userName}
        currentContent={currentContent}
        toggleSidebar={toggleSidebar}
        handleSectionChange={handleSectionChange}
        userRank={userRank}
      />
      
      {/* Contenido principal */}
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Barra superior */}
        <Header 
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          handleNotificationClick={handleNotificationClick}
          handleSettingsClick={handleSettingsClick}
          handleLogout={handleLogout}
          notifications={notifications}
          title={getTitle()}
        />
        
        {/* Contenido dinámico */}
        <ContentRenderer />
        
        {/* Paneles y modales */}
        <PanelManager />
        
        {/* Notificaciones Toast */}
        {toast.show && (
          <Toast 
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;