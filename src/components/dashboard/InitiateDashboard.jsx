import React, { useState, useEffect } from 'react'
import {
  Menu, X, User, Settings, LogOut, ChevronRight, ChevronLeft,
  Book, Sword, Calendar, Star, Shield, ScrollText, 
  UserPlus, Bell, Moon, Sun, Sparkles, Clock, BookOpen,
  Play, Video, Eye, Info
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'

// Iconos adicionales para las nuevas funcionalidades
import {
  UserCircle, Palette, Scissors, Brush
} from 'lucide-react'

const InitiateDashboard = () => {
  const [isOpen, setIsOpen] = useState(false) // Cambiado a false para iniciar colapsado
  const [userName, setUserName] = useState('')
  const [darkMode, setDarkMode] = useState(() => {
    // Intenta recuperar la preferencia del usuario del localStorage
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : true // Por defecto modo oscuro
  })
  const [notifications, setNotifications] = useState([])
  const [currentContent, setCurrentContent] = useState('welcome')
  const navigate = useNavigate()

  // Estados para los paneles
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSecurityPanel, setShowSecurityPanel] = useState(false)
  const [showSettingsPanel, setShowSettingsPanel] = useState(false)
  const [showAcolyteModal, setShowAcolyteModal] = useState(false)
  
  // Estado para el avatar personalizable
  const [avatarOptions, setAvatarOptions] = useState({
    skin: 'pale',
    eyes: 'yellow',
    hair: 'black',
    scars: 'none',
    tattoos: 'none'
  })
  
  // Estado para el formulario de configuración
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setUserName(storedName)
      setProfileData(prev => ({...prev, name: storedName}))
    }
    // Simular notificaciones
    setNotifications([
      { id: 1, title: 'Nuevo evento disponible', read: false },
      { id: 2, title: 'Actualización de rango', read: false }
    ])
  }, [])

  // Función para manejar cambios en el formulario de perfil
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Función para guardar cambios de perfil
  const handleSaveProfile = async () => {
    try {
      // Aquí iría la lógica para actualizar el perfil en Supabase
      // Por ejemplo:
      /*
      const { data, error } = await supabase
        .from('users')
        .update({ 
          name: profileData.name,
          username: profileData.username 
        })
        .eq('id', user.id)
      */
      
      // Actualizar el nombre en localStorage
      localStorage.setItem('userName', profileData.name)
      setUserName(profileData.name)
      
      // Mostrar mensaje de éxito
      alert('Perfil actualizado correctamente')
      setShowSettingsPanel(false)
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
      alert('Error al actualizar el perfil')
    }
  }

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

  // Función para manejar el clic en el botón de configuración
  const handleSettingsClick = () => {
    setShowSettingsPanel(true)
  }

  // Función para manejar notificaciones
  const handleNotificationClick = () => {
    setShowNotifications(true)
  }

  // Función para manejar el clic en Acólito
  const handleAcolyteClick = () => {
    setShowAcolyteModal(true)
  }

  // Función para cambiar de sección
  const handleSectionChange = (section) => {
    setCurrentContent(section)
    setShowNotifications(false)
    setShowSecurityPanel(false)
    setShowSettingsPanel(false)
  }

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

  // Componentes de contenido para cada sección
  const contentComponents = {
    welcome: (
      <div className="space-y-6">
        <div className="bg-dark/50 border border-sith/20 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <Star className="text-sith mr-3" size={24} />
            <h2 className="text-2xl font-bold text-light">Bienvenido a la Academia Sith, {userName || 'Luke'}</h2>
          </div>
          <p className="text-light/80 mb-6">Comienza tu viaje en el camino del conocimiento oscuro.</p>
        </div>

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
            <p className="text-light/80 mb-4">Accede a contenido exclusivo y mentorías personalizadas.</p>
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
              <h3 className="text-xl font-bold text-light">Próximos Eventos</h3>
            </div>
            <p className="text-light/80 mb-4">Descubre los eventos destacados de la academia.</p>
            <button
              onClick={() => handleSectionChange('events')}
              className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors flex items-center"
            >
              <Eye size={16} className="mr-2" />
              Ver Eventos
            </button>
          </div>
        </div>
      </div>
    ),
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-dark/50 p-6 rounded-lg border border-sith/20">
            <h3 className="text-xl font-bold text-light mb-4 flex items-center gap-2">
              <Sword className="text-sith" size={20} />
              Entrenamiento de Combate
            </h3>
            <p className="text-light/80 mb-4">
              Domina las técnicas de combate Sith y aprende a canalizar tu ira en poder destructivo.
            </p>
            <div className="flex items-center gap-2 text-light/70 mb-4">
              <Clock size={16} />
              <span>Duración: 4 semanas</span>
            </div>
            <button className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors">
              Ver detalles
            </button>
          </div>
          <div className="bg-dark/50 p-6 rounded-lg border border-sith/20">
            <h3 className="text-xl font-bold text-light mb-4 flex items-center gap-2">
              <BookOpen className="text-sith" size={20} />
              Códigos Sith Ancestrales
            </h3>
            <p className="text-light/80 mb-4">
              Estudia los antiguos textos Sith y descubre secretos olvidados del lado oscuro.
            </p>
            <div className="flex items-center gap-2 text-light/70 mb-4">
              <Clock size={16} />
              <span>Duración: 3 semanas</span>
            </div>
            <button className="bg-sith text-light px-4 py-2 rounded-lg hover:bg-sith-dark transition-colors">
              Ver detalles
            </button>
          </div>
        </div>
        <div className="bg-dark/30 p-6 rounded-lg border border-sith/20 mb-8">
          <h3 className="text-xl font-bold text-light mb-4">Próximas Clases Magistrales</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-sith/10">
              <div>
                <h4 className="font-medium text-light">Manipulación de la Fuerza</h4>
                <p className="text-light/70 text-sm">Instructor: Lord Tyranus</p>
              </div>
              <div className="text-right">
                <p className="text-sith font-medium">15 de Marzo</p>
                <p className="text-light/70 text-sm">19:00 - 21:00</p>
              </div>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-sith/10">
              <div>
                <h4 className="font-medium text-light">Alquimia Sith</h4>
                <p className="text-light/70 text-sm">Instructor: Lady Zannah</p>
              </div>
              <div className="text-right">
                <p className="text-sith font-medium">18 de Marzo</p>
                <p className="text-light/70 text-sm">17:00 - 20:00</p>
              </div>
            </div>
          </div>
        </div>
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
    ),
    avatars: (
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
                      onClick={() => setAvatarOptions({...avatarOptions, skin})}
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
                      onClick={() => setAvatarOptions({...avatarOptions, eyes})}
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
              
              {/* Estilo de cabello */}
              <div>
                <label className="block text-light mb-2">Estilo de cabello</label>
                <div className="grid grid-cols-3 gap-2">
                  {['black', 'brown', 'red', 'bald', 'gray', 'white'].map(hair => (
                    <button 
                      key={hair}
                      onClick={() => setAvatarOptions({...avatarOptions, hair})}
                      className={`py-2 px-3 rounded-md ${
                        avatarOptions.hair === hair 
                          ? 'bg-sith text-light' 
                          : 'bg-dark/70 text-light/70 hover:bg-dark/90'
                      }`}
                    >
                      {hair === 'black' ? 'Negro' : 
                       hair === 'brown' ? 'Castaño' : 
                       hair === 'red' ? 'Rojo' : 
                       hair === 'bald' ? 'Calvo' :
                       hair === 'gray' ? 'Gris' : 'Blanco'}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Cicatrices */}
              <div>
                <label className="block text-light mb-2">Cicatrices</label>
                <div className="grid grid-cols-3 gap-2">
                  {['none', 'face', 'eye', 'cheek', 'multiple'].map(scars => (
                    <button 
                      key={scars}
                      onClick={() => setAvatarOptions({...avatarOptions, scars})}
                      className={`py-2 px-3 rounded-md ${
                        avatarOptions.scars === scars 
                          ? 'bg-sith text-light' 
                          : 'bg-dark/70 text-light/70 hover:bg-dark/90'
                      }`}
                    >
                      {scars === 'none' ? 'Ninguna' : 
                       scars === 'face' ? 'Facial' : 
                       scars === 'eye' ? 'Ojo' : 
                       scars === 'cheek' ? 'Mejilla' : 'Múltiples'}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tatuajes */}
              <div>
                <label className="block text-light mb-2">Tatuajes Sith</label>
                <div className="grid grid-cols-3 gap-2">
                  {['none', 'minimal', 'face', 'full', 'ritual'].map(tattoos => (
                    <button 
                      key={tattoos}
                      onClick={() => setAvatarOptions({...avatarOptions, tattoos})}
                      className={`py-2 px-3 rounded-md ${
                        avatarOptions.tattoos === tattoos 
                          ? 'bg-sith text-light' 
                          : 'bg-dark/70 text-light/70 hover:bg-dark/90'
                      }`}
                    >
                      {tattoos === 'none' ? 'Ninguno' : 
                       tattoos === 'minimal' ? 'Mínimo' : 
                       tattoos === 'face' ? 'Facial' : 
                       tattoos === 'full' ? 'Completo' : 'Ritual'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-dark/30 p-6 rounded-lg border border-sith/20">
          <h3 className="text-xl font-bold text-light mb-4">Sobre The Sith Clash</h3>
          <p className="text-light/80 mb-4">
            Tu avatar personalizado será utilizado en el minijuego The Sith Clash, donde competirás contra otros aprendices Sith en duelos de habilidad y estrategia. Personaliza tu apariencia para intimidar a tus oponentes y mostrar tu verdadera naturaleza Sith.
          </p>
          <div className="flex items-center gap-2 text-sith">
            <Info size={20} />
            <span className="font-medium">Próximamente: Armaduras y sables de luz personalizables</span>
          </div>
        </div>
      </div>
    )
  }

  // Componentes de paneles
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

  // Componente para el panel de configuración
  const SettingsPanel = () => (
    <div className="fixed top-16 right-4 w-96 max-w-full bg-dark border border-sith/20 p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto shadow-lg rounded-lg z-50 max-h-[80vh]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-light">Configuración</h2>
        <button onClick={() => setShowSettingsPanel(false)} className="text-light hover:text-sith">
          <X size={24} />
        </button>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-light">Información de Perfil</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-light mb-1">Nombre</label>
              <input 
                type="text" 
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-sith/30 rounded-lg bg-dark/80 text-light focus:outline-none focus:ring-2 focus:ring-sith"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-light mb-1">Nombre de usuario</label>
              <input 
                type="text" 
                name="username"
                value={profileData.username}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-sith/30 rounded-lg bg-dark/80 text-light focus:outline-none focus:ring-2 focus:ring-sith"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-light">Cambiar Contraseña</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-light mb-1">Contraseña actual</label>
              <input 
                type="password" 
                name="currentPassword"
                value={profileData.currentPassword}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-sith/30 rounded-lg bg-dark/80 text-light focus:outline-none focus:ring-2 focus:ring-sith"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-light mb-1">Nueva contraseña</label>
              <input 
                type="password" 
                name="newPassword"
                value={profileData.newPassword}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-sith/30 rounded-lg bg-dark/80 text-light focus:outline-none focus:ring-2 focus:ring-sith"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-light mb-1">Confirmar nueva contraseña</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={profileData.confirmPassword}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-sith/30 rounded-lg bg-dark/80 text-light focus:outline-none focus:ring-2 focus:ring-sith"
              />  
                            <label className="block text-sm font-medium text-light mb-1">Confirmar nueva contraseña</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={profileData.confirmPassword} 
                onChange={handleProfileChange} 
                className="w-full px-3 py-2 border border-sith/30 rounded-lg bg-dark/80 text-light focus:outline-none focus:ring-2 focus:ring-sith/50"
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button 
              onClick={handleSaveProfile} 
              className="bg-sith text-light px-6 py-2 rounded-lg hover:bg-sith-dark transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Componente para el panel de seguridad
  const SecurityPanel = ({ onClose }) => {
    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={handleBackdropClick}>
        <div className="bg-dark border border-sith/20 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-light">Configuración de Seguridad</h2>
            <button onClick={onClose} className="text-light hover:text-sith">
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-light mb-3">Autenticación de dos factores</h3>
              <div className="flex items-center justify-between">
                <span className="text-light/80">Activar 2FA</span>
                <button className="bg-sith/20 w-12 h-6 rounded-full flex items-center transition-colors focus:outline-none">
                  <span className="bg-light w-5 h-5 rounded-full shadow-md transform translate-x-1"></span>
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-light mb-3">Sesiones activas</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-dark/50 rounded-lg border border-sith/20">
                  <div>
                    <p className="text-light font-medium">Este dispositivo</p>
                    <p className="text-light/60 text-sm">Windows • Chrome</p>
                  </div>
                  <span className="text-green-500 text-sm">Activo ahora</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-sith/20">
              <button className="w-full bg-red-900/30 text-red-400 border border-red-900/50 px-4 py-2 rounded-lg hover:bg-red-900/50 transition-colors">
                Cerrar todas las sesiones
              </button>
            </div>
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
          {contentComponents[currentContent]}
          
          {/* Paneles y modales */}
          {showNotifications && <NotificationsPanel />}
          {showSecurityPanel && <SecurityPanel onClose={() => setShowSecurityPanel(false)} />}
          {showSettingsPanel && <SettingsPanel onClose={() => setShowSettingsPanel(false)} />}
          {showAcolyteModal && <AcolyteInfoPanel onClose={() => setShowAcolyteModal(false)} />}
        </main>
      </div>
    </div>
  )
}

export default InitiateDashboard

// Añade este componente dentro del mismo archivo, antes de la exportación
const AcolyteInfoPanel = () => {
  return (
    <div className="bg-dark/90 border border-sith/30 rounded-lg p-6 max-w-md w-full mx-auto">
      <div className="flex items-center mb-4">
        <UserCircle className="text-sith mr-3" size={24} />
        <h2 className="text-xl font-bold text-light">Información del Acólito</h2>
      </div>
      <p className="text-light/80 mb-4">
        Los acólitos son aprendices que han comenzado su camino en las artes oscuras.
        Reciben entrenamiento básico y realizan tareas para la Academia.
      </p>
      <div className="space-y-3">
        <div className="flex items-center">
          <Star className="text-sith mr-2" size={16} />
          <span className="text-light">Nivel inicial en la jerarquía Sith</span>
        </div>
        <div className="flex items-center">
          <Book className="text-sith mr-2" size={16} />
          <span className="text-light">Acceso a conocimientos básicos</span>
        </div>
        <div className="flex items-center">
          <Sword className="text-sith mr-2" size={16} />
          <span className="text-light">Entrenamiento en combate elemental</span>
        </div>
      </div>
    </div>
  )
}