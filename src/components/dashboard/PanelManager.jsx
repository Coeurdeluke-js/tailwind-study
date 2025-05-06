import React from 'react';
import { useDashboard } from '../../contexts/DashboardContext';
import Modal from '../shared/Modal';
import NotificationsPanel from '../shared/NotificationsPanel';
import SecurityPanel from '../shared/SecurityPanel';
import SettingsPanel from '../shared/SettingsPanel';

const PanelManager = () => {
  const {
    showNotifications,
    showSecurityPanel,
    showSettingsPanel,
    showAcolyteModal,
    setShowNotifications,
    setShowSecurityPanel,
    setShowSettingsPanel,
    setShowAcolyteModal,
    profileData,
    handleProfileChange,
    handleSaveProfile,
    darkMode,
    toggleDarkMode
  } = useDashboard();

  return (
    <>
      {/* Modal de Acólito */}
      <Modal
        isOpen={showAcolyteModal}
        onClose={() => setShowAcolyteModal(false)}
        title="Convertirse en Acólito"
      >
        <p className="text-light/80 mb-4">
          Estás a punto de iniciar el camino para convertirte en Acólito Sith.
          Este es un paso importante en tu viaje hacia el lado oscuro.
        </p>
      </Modal>

      {/* Panel de Notificaciones */}
      {showNotifications && (
        <NotificationsPanel onClose={() => setShowNotifications(false)} />
      )}

      {/* Panel de Seguridad */}
      {showSecurityPanel && (
        <SecurityPanel onClose={() => setShowSecurityPanel(false)} />
      )}

      {/* Panel de Configuración */}
      {showSettingsPanel && (
        <SettingsPanel 
          profileData={profileData}
          onChange={handleProfileChange}
          onSave={handleSaveProfile}
          onClose={() => setShowSettingsPanel(false)}
          onSecurityClick={() => {
            setShowSecurityPanel(true);
            setShowSettingsPanel(false);
          }}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      )}
    </>
  );
};

export default PanelManager;