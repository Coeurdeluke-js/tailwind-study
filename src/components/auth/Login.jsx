import React, { useState } from 'react'
import { supabase } from '../../services/supabase'
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Login = ({ onSwitchMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''  // Nuevo campo
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })

      if (error) throw error

      // Obtener el nombre del usuario de la base de datos
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('name')
        .eq('email', formData.email)
        .single()

      if (userError) throw userError

      // Guardar el nombre en el localStorage para usarlo en el dashboard
      localStorage.setItem('userName', userData.name)

      navigate('/dashboard')
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-dark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-sith/20 border-sith/20">
        {/* Eliminamos cualquier borde rojo no deseado */}
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-light md:text-2xl">
            Iniciar sesión
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-light">
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@email.com"
                  className="bg-dark/80 border border-sith/30 text-light text-sm rounded-lg focus:ring-sith focus:border-sith block w-full p-2.5 pl-10"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-sith/70" size={18} />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-light">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-dark/80 border border-sith/30 text-light text-sm rounded-lg focus:ring-sith focus:border-sith block w-full p-2.5 pl-10"
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-sith/70" size={18} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sith hover:text-sith-dark"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-light bg-sith hover:bg-sith-dark focus:ring-4 focus:outline-none focus:ring-sith-light font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
            <p className="text-sm font-light text-light/70">
              ¿No tienes cuenta? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchMode() }} className="font-medium text-sith hover:underline">Registrarse</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login