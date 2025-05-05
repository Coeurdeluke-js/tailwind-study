import React, { useState } from 'react'
import { supabase } from '../../services/supabase'
import { Eye, EyeOff } from 'lucide-react'
import Modal from '../shared/Modal'

const Register = ({ onSwitchMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    uid: '',
    phone: '' // Añadido para inicializar el campo de teléfono
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const validatePhone = (phone) => {
    // Limpiamos el número de espacios y caracteres especiales
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
    
    // Verificamos que comience con + y tenga entre 10 y 15 dígitos en total
    // Este rango cubre la mayoría de los formatos internacionales
    const phoneRegex = /^\+\d{10,15}$/
    return phoneRegex.test(cleanPhone)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            uid: formData.uid
          }
        }
      })
      
      if (authError) throw authError
      
      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            name: formData.name,
            email: formData.email.toLowerCase(),
            uid: formData.uid
          }
        ])
      
      if (insertError) throw insertError

      setShowModal(true)
    } catch (error) {
      setError('Error al registrarse: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-dark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-sith/20 border-sith/20 h-card">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-light md:text-2xl">
              Crear cuenta
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-light">Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre completo"
                  className="bg-dark/80 border border-sith/30 text-light text-sm rounded-lg focus:ring-sith focus:border-sith block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-light">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@email.com"
                  className="bg-dark/80 border border-sith/30 text-light text-sm rounded-lg focus:ring-sith focus:border-sith block w-full p-2.5"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-light">Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+56 9 1234 5678"
                  className="bg-dark/80 border border-sith/30 text-light text-sm rounded-lg focus:ring-sith focus:border-sith block w-full p-2.5"
                  required
                />
                <p className="mt-1 text-xs text-light/70">
                  Formato: +[código de país] seguido del número (Ejemplo: +56 9 1234 5678)
                </p>
                {formData.phone && !validatePhone(formData.phone) && (
                  <p className="mt-1 text-xs text-red-500">
                    Ingresa un número válido que comience con + y el código de país
                  </p>
                )}
              </div>
              <div className="relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-light">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-dark/80 border border-sith/30 text-light text-sm rounded-lg focus:ring-sith focus:border-sith block w-full p-2.5"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sith hover:text-sith-dark"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="relative">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-light">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="bg-dark/80 border border-sith/30 text-light text-sm rounded-lg focus:ring-sith focus:border-sith block w-full p-2.5 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sith hover:text-sith-dark"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="uid" className="block mb-2 text-sm font-medium text-light">UID</label>
                <input
                  type="text"
                  name="uid"
                  id="uid"
                  value={formData.uid}
                  onChange={handleChange}
                  placeholder="Tu identificador único"
                  className="bg-dark/80 border border-sith/30 text-light text-sm rounded-lg focus:ring-sith focus:border-sith block w-full p-2.5"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-light bg-sith hover:bg-sith-dark focus:ring-4 focus:outline-none focus:ring-sith-light font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Registrando...' : 'Crear cuenta'}
              </button>
              <p className="text-sm font-light text-light/70">
                ¿Ya tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchMode() }} className="font-medium text-sith hover:underline">Iniciar sesión</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      
      <Modal 
        isOpen={showModal} 
        onClose={() => {
          setShowModal(false)
          window.location.href = '/login'
        }}
      >
        <h2 className="text-xl font-bold text-light mb-4">Registro Exitoso</h2>
        <p className="text-light/80">
          Por favor, verifica tu correo electrónico para completar el registro
        </p>
      </Modal>
    </>
  )
}

export default Register