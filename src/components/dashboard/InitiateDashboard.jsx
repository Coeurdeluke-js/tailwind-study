import React, { useState, useEffect } from 'react'
import {
  Menu, X, User, Settings, LogOut, ChevronRight, ChevronLeft,
  Book, Sword, Calendar, Star, Shield, ScrollText, 
  UserPlus, Bell, Moon, Sun, Sparkles, Clock, BookOpen,
  Play, Video, Eye, Info
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'

const InitiateDashboard = () => {
  const [isOpen, setIsOpen] = useState(false) // Cambiado a false para iniciar colapsado
  const [userName, setUserName] = useState('')
  const [darkMode, setDarkMode] = useState(() => {
    // Intenta recuperar la preferencia del usuario del localStorage
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : true // Por defecto modo oscuro
  })
  const [notifications, setNotifications] = useState([])
  const [activeSection, setActiveSection] = useState('welcome')
  const [currentContent, setCurrentContent] = useState('welcome') // Añadido esta línea para definir currentContent
  const navigate = useNavigate()

  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setUserName(storedName)
    }
    // Simular notificaciones
    setNotifications([
      { id: 1, title: 'Nuevo evento disponible', read: false },
      { id: 2, title: 'Actualización de rango', read: false }
    ])
  }, [])

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      navigate('/')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const [showNotifications, setShowNotifications] = useState(false)
  const [showSecurityPanel, setShowSecurityPanel] = useState(false)
  // Añade este estado para controlar la visibilidad del panel de configuración
  const [showSettingsPanel, setShowSettingsPanel] = useState(false)
  
  // Función para manejar el clic en el botón de configuración
  const handleSettingsClick = () => {
    setShowSettingsPanel(true)
  }

  // Añadir función para manejar notificaciones
  const handleNotificationClick = () => {
    setShowNotifications(true)
  }

  const contentComponents = {
    intro: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-light flex items-center gap-2">
          <ScrollText className="text-sith" size={24} />
          Contenido Introductorio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-dark/50 p-6 rounded-lg border border-sith/20">
            <h3 className="text-xl font-bold text-light mb-4 flex items-center gap-2">
              <Sparkles className="text-sith" size={20} />
              Fundamentos del Poder Oscuro
            </h3>
            <p className="text-light/80 mb-4">Duración: 2 horas</p>
            <button className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors">
              Comenzar
            </button>
          </div>
          <div className="bg-dark/50 p-6 rounded-lg border border-sith/20">
            <h3 className="text-xl font-bold text-light mb-4 flex items-center gap-2">
              <BookOpen className="text-sith" size={20} />
              Historia Sith
            </h3>
            <p className="text-light/80 mb-4">Duración: 1.5 horas</p>
            <button className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors">
              Comenzar
            </button>
          </div>
        </div>
      </div>
    ),
    academy: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-light flex items-center gap-2">
          <Book className="text-sith" size={24} />
          Explorar Academia
        </h2>
        <div className="aspect-video rounded-lg overflow-hidden border border-sith/20">
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/your-video-id"
            title="Recorrido Virtual"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    ),
    events: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-light flex items-center gap-2">
          <Calendar className="text-sith" size={24} />
          Eventos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Ceremonia de Iniciación",
              date: "15 de Marzo, 2024",
              time: "19:00",
              location: "Sala Principal"
            },
            {
              title: "Entrenamiento Especial",
              date: "20 de Marzo, 2024",
              time: "16:00",
              location: "Campo de Entrenamiento"
            }
          ].map((event, index) => (
            <div key={index} className="bg-dark/50 p-6 rounded-lg border border-sith/20">
              <h3 className="text-xl font-bold text-light mb-2">{event.title}</h3>
              <div className="space-y-2 text-light/80">
                <p className="flex items-center gap-2">
                  <Calendar size={16} className="text-sith" />
                  {event.date}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={16} className="text-sith" />
                  {event.time}
                </p>
              </div>
              <button className="mt-4 bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors">
                Inscribirse
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const handleSectionChange = (section) => {
    setCurrentContent(section)
    setShowNotifications(false)
    setShowSecurityPanel(false)
    setShowSettingsPanel(false)
  }

  const NotificationsPanel = () => (
    <div className="fixed top-16 right-4 w-80 bg-dark border border-sith/20 p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto shadow-lg rounded-lg z-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-light">Notificaciones</h2>
        <button onClick={() => setShowNotifications(false)} className="text-light hover:text-sith">
          <X size={24} />
        </button>
      </div>
      <div className="space-y-4">
        {notifications.map(notification => (
          <div key={notification.id} className={`p-4 rounded-lg border ${notification.read ? 'border-sith/20 bg-dark/50' : 'border-sith bg-sith/10'}`}>
            <h3 className="font-bold text-light">{notification.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )

  // Mejorar el manejo del modo oscuro
  useEffect(() => {
    // Guarda la preferencia en localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    
    // Aplica las clases al documento
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      document.body.classList.add('bg-dark')
      document.body.classList.remove('bg-light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
      document.body.classList.remove('bg-dark')
      document.body.classList.add('bg-light')
    }
  }, [darkMode])

  const [showAcolyteModal, setShowAcolyteModal] = useState(false)
  const [selectedAcolyte, setSelectedAcolyte] = useState(null)

  const handleAcolyteClick = () => {
    setShowAcolyteModal(true)
  }

  // Componente AcolyteInfoPanel definido dentro de InitiateDashboard
  const AcolyteInfoPanel = ({ onClose }) => {
    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={handleBackdropClick}>
        <div className="bg-dark border border-sith/20 rounded-lg p-6 max-w-2xl w-full mx-4 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-light">Programa de Acólitos</h2>
            <button onClick={onClose} className="text-light hover:text-sith">
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6 text-light/80">
            <div>
              <h3 className="text-xl font-bold text-light mb-3">Beneficios Exclusivos</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Acceso a entrenamientos avanzados</li>
                <li>Mentorías personalizadas</li>
                <li>Recursos exclusivos de trading</li>
              </ul>
            </div>
            {/* Más contenido del panel */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-dark">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-dark border-r border-sith/20 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:w-auto`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Shield className="text-sith" size={24} />
              <span className="ml-2 text-xl font-bold text-light">Academia Sith</span>
            </div>
            <button onClick={toggleSidebar} className="md:hidden text-light hover:text-sith">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-4 overflow-y-auto">
            <div className="space-y-2">
              <button
                onClick={() => handleSectionChange('welcome')}
                className={`w-full flex items-center px-4 py-2 text-left rounded-lg ${currentContent === 'welcome' ? 'bg-sith text-light' : 'text-light hover:bg-sith/10'}`}
              >
                <Star size={20} className="mr-3" />
                <span>Inicio</span>
              </button>

              <button
                onClick={() => handleSectionChange('intro')}
                className={`w-full flex items-center px-4 py-2 text-left rounded-lg ${currentContent === 'intro' ? 'bg-sith text-light' : 'text-light hover:bg-sith/10'}`}
              >
                <ScrollText size={20} className="mr-3" />
                <span>Contenido Introductorio</span>
              </button>

              <button
                onClick={() => handleSectionChange('academy')}
                className={`w-full flex items-center px-4 py-2 text-left rounded-lg ${currentContent === 'academy' ? 'bg-sith text-light' : 'text-light hover:bg-sith/10'}`}
              >
                <Book size={20} className="mr-3" />
                <span>Explorar Academia</span>
              </button>

              <button
                onClick={() => handleSectionChange('events')}
                className={`w-full flex items-center px-4 py-2 text-left rounded-lg ${currentContent === 'events' ? 'bg-sith text-light' : 'text-light hover:bg-sith/10'}`}
              >
                <Calendar size={20} className="mr-3" />
                <span>Eventos</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={handleAcolyteClick}
                className="w-full flex items-center px-4 py-2 text-left rounded-lg text-light hover:bg-sith/10"
              >
                <UserPlus size={20} className="mr-3 text-sith" />
                <span>Convertirse en Acólito</span>
              </button>
            </div>
          </nav>

          {/* Footer con usuario - Ahora con posición fija en la parte inferior */}
          <div className="mt-auto pt-4 border-t border-sith/20">
            <div className="flex items-center px-4 py-2 text-light">
              <User size={20} className="mr-3 text-sith" />
              <span>{userName || 'Luke'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto">
        <header className="bg-dark/80 border-b border-sith/20 p-4 sticky top-0 z-20">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="mr-4 text-light hover:text-sith md:hidden">
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-bold text-light">Crypto Force</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAcolyteClick}
                className="bg-sith text-light px-4 py-1 rounded-lg hover:bg-sith-dark transition-colors hidden sm:block"
              >
                Convertirse en Acólito
              </button>
              <button
                onClick={handleNotificationClick}
                className="p-2 text-light hover:text-sith relative"
              >
                <Bell size={20} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-sith rounded-full"></span>
                )}
              </button>
              <button
                onClick={() => setDarkMode(prevMode => !prevMode)}
                className="p-2 text-light hover:text-sith"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={handleSettingsClick}
                className="p-2 text-light hover:text-sith"
              >
                <Settings size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-light hover:text-sith"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {currentContent === 'welcome' && (
            <div className="bg-dark/50 border border-sith/20 rounded-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <Star className="text-sith mr-3" size={24} />
                <h2 className="text-2xl font-bold text-light">Bienvenido a la Academia Sith, {userName || 'Luke'}</h2>
              </div>
              <p className="text-light/80 mb-6">Comienza tu viaje en el camino del conocimiento oscuro.</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-dark/50 border border-sith/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <ScrollText className="text-sith mr-3" size={24} />
                <h3 className="text-xl font-bold text-light">Contenido Introductorio</h3>
              </div>
              <p className="text-light/80 mb-4">Descubre los fundamentos del poder oscuro.</p>
              <button
                onClick={() => handleSectionChange('intro')}
                className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors flex items-center"
              >
                <Eye size={16} className="mr-2" />
                Explorar
              </button>
            </div>

            <div className="bg-dark/50 border border-sith/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Book className="text-sith mr-3" size={24} />
                <h3 className="text-xl font-bold text-light">Explorar Academia</h3>
              </div>
              <p className="text-light/80 mb-4">Conoce nuestras instalaciones y recursos.</p>
              <button
                onClick={() => handleSectionChange('academy')}
                className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors flex items-center"
              >
                <Video size={16} className="mr-2" />
                Recorrido Virtual
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-dark/50 border border-sith/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <UserPlus className="text-sith mr-3" size={24} />
                <h3 className="text-xl font-bold text-light">Conviértete en Acólito</h3>
              </div>
              <p className="text-light/80 mb-4">Accede a conocimiento exclusivo y beneficios especiales.</p>
              <button
                onClick={handleAcolyteClick}
                className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors flex items-center"
              >
                <Info size={16} className="mr-2" />
                Más Información
              </button>
            </div>

            <div className="bg-dark/50 border border-sith/20 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Calendar className="text-sith mr-3" size={24} />
                <h3 className="text-xl font-bold text-light">Eventos Destacados</h3>
              </div>
              <p className="text-light/80 mb-4">Participa en nuestros próximos eventos.</p>
              <button
                onClick={() => handleSectionChange('events')}
                className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors flex items-center"
              >
                <Calendar size={16} className="mr-2" />
                Ver Calendario
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-light mb-4">Módulos Gratuitos</h3>
            {/* Contenido de módulos gratuitos */}
          </div>

          {currentContent !== 'welcome' && contentComponents[currentContent]}
        </main>
      </div>

      {/* Paneles laterales */}
      {showNotifications && <NotificationsPanel />}
      {/* Panel de configuración */}
      {showSettingsPanel && (
        <div className="fixed top-16 right-4 w-80 bg-dark border border-sith/20 p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto shadow-lg rounded-lg z-50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-light">Configuración</h2>
            <button onClick={() => setShowSettingsPanel(false)} className="text-light hover:text-sith">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-light">Modo Oscuro</span>
              <button
                onClick={() => setDarkMode(prevMode => !prevMode)}
                className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${darkMode ? 'bg-sith justify-end' : 'bg-gray-600 justify-start'}`}
              >
                <span className="w-5 h-5 bg-light rounded-full mx-0.5"></span>
              </button>
            </div>
            {/* Más opciones de configuración */}
          </div>
        </div>
      )}

      {/* Modal de Acólito */}
      {showAcolyteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-dark border border-sith/20 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl relative">
            <button
              onClick={() => setShowAcolyteModal(false)}
              className="absolute top-4 right-4 text-light/70 hover:text-light transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center pt-4">
              <Sword className="text-sith mb-4" size={48} />
              <h2 className="text-2xl font-bold text-light mb-2">Programa de Acólitos</h2>
              <p className="text-light/80 mb-4">
                Únete a nuestro programa exclusivo para acceder a conocimientos avanzados, entrenamientos especiales y beneficios únicos.
              </p>
              <div className="bg-sith/10 border border-sith/30 rounded-lg p-4 w-full mb-4">
                <h3 className="text-lg font-bold text-light mb-2">Beneficios:</h3>
                <ul className="text-left text-light/80 space-y-2">
                  <li className="flex items-start">
                    <ChevronRight className="text-sith mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Acceso a módulos de entrenamiento avanzado</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="text-sith mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Mentoría personalizada con Maestros Sith</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="text-sith mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Participación en eventos exclusivos</span>
                  </li>
                </ul>
              </div>
              <button
                className="bg-sith text-light px-6 py-2 rounded-lg hover:bg-sith-dark transition-colors"
              >
                Solicitar Ingreso
              </button>
              <button
                onClick={() => setShowAcolyteModal(false)}
                className="mt-4 text-light/70 hover:text-light"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InitiateDashboard