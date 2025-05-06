import React from 'react';
import { 
  User, ChevronLeft, Star, ScrollText, Book, 
  Calendar, UserCircle, Award
} from 'lucide-react';

const Sidebar = ({ 
  isOpen, 
  userName, 
  currentContent, 
  toggleSidebar, 
  handleSectionChange,
  userRank 
}) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-dark/90 border-r border-sith/20 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Encabezado de la barra lateral con línea roja */}
      <div className="border-t-2 border-sith">
        {/* Perfil de usuario en la parte superior */}
        <div className="p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-sith/30 flex items-center justify-center mr-3">
            <User className="text-light" size={20} />
          </div>
          <div>
            <p className="text-light font-medium">{userName || 'Usuario'}</p>
            <p className="text-light/50 text-sm">{userRank}</p>
          </div>
          <button 
            onClick={toggleSidebar}
            className="ml-auto text-light hover:text-sith transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      </div>
      
      {/* Menú de navegación */}
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => handleSectionChange('welcome')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                currentContent === 'welcome' 
                  ? 'bg-sith text-light' 
                  : 'text-light/70 hover:bg-dark/50'
              }`}
            >
              <Star className="mr-3" size={20} />
              Inicio
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleSectionChange('intro')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                currentContent === 'intro' 
                  ? 'bg-sith text-light' 
                  : 'text-light/70 hover:bg-dark/50'
              }`}
            >
              <ScrollText className="mr-3" size={20} />
              Introducción
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleSectionChange('academy')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                currentContent === 'academy' 
                  ? 'bg-sith text-light' 
                  : 'text-light/70 hover:bg-dark/50'
              }`}
            >
              <Book className="mr-3" size={20} />
              Academia
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleSectionChange('events')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                currentContent === 'events' 
                  ? 'bg-sith text-light' 
                  : 'text-light/70 hover:bg-dark/50'
              }`}
            >
              <Calendar className="mr-3" size={20} />
              Eventos
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleSectionChange('avatars')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                currentContent === 'avatars' 
                  ? 'bg-sith text-light' 
                  : 'text-light/70 hover:bg-dark/50'
              }`}
            >
              <UserCircle className="mr-3" size={20} />
              Avatares
            </button>
          </li>
     
          <li>
            <button 
              onClick={() => handleSectionChange('rank')}
              className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                currentContent === 'rank' 
                  ? 'bg-sith text-light' 
                  : 'text-light/70 hover:bg-dark/50'
              }`}
            >
              <Award className="mr-3" size={20} />
              Rangos
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;