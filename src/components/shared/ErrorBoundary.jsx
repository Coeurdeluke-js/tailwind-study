import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error en el componente:', error, errorInfo)
  
    // Registrar errores específicos de URL o Supabase
    if (error.message && error.message.includes('URL')) {
      console.error('Error de URL detectado. Verifica la configuración de Supabase y las variables de entorno.')
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-light p-4 bg-red-500/20 rounded-lg">
          <h2>Algo salió mal.</h2>
          <p>Por favor, recarga la página o contacta a soporte si el problema persiste.</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary