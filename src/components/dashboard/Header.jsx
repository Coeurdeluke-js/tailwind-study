import React from 'react';
import { Menu, Bell, Sun, Moon, Settings, LogOut } from 'lucide-react';

const Header = ({ 
  isOpen, 
  toggleSidebar, 
  darkMode, 
  toggleDarkMode, 
  handleNotificationClick, 
  handleSettingsClick, 
  handleLogout, 
  notifications,
  title
}) => {
  return (
    <header className="bg-dark/90 border-t-2 border-sith sticky top-0 z-20">
      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          {!isOpen && (
            <button 
              onClick={toggleSidebar}
              className="mr-4 text-light hover:text-sith transition-colors"
            >
              <Menu size={24} />
            </button>
          )}
          <h1 className="text-xl font-bold text-light">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-dark/20 transition-colors"
            aria-label="Cambiar tema"
          >
            {darkMode ? <Sun className="text-light" size={20} /> : <Moon className="text-dark" size={20} />}
          </button>
          
          <button 
            onClick={handleNotificationClick}
            className="p-2 rounded-full hover:bg-dark/20 transition-colors relative"
            aria-label="Notificaciones"
          >
            <Bell className="text-light" size={20} />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-sith rounded-full"></span>
            )}
          </button>
          
          <button 
            onClick={handleSettingsClick}
            className="p-2 rounded-full hover:bg-dark/20 transition-colors"
            aria-label="Ajustes"
          >
            <Settings className="text-light" size={20} />
          </button>
          
          <button 
            onClick={handleLogout}
            className="bg-dark/50 text-light/70 px-3 py-2 rounded-lg hover:bg-dark/70 transition-colors flex items-center"
          >
            <LogOut size={18} className="mr-2" />
            Salir
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;