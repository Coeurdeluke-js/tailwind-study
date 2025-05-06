import React from 'react'
import { X, Shield } from 'lucide-react'

const SecurityPanel = ({ onClose }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-dark border-l border-sith/20 p-4 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-light">Seguridad</h2>
        <button onClick={onClose} className="text-light/70 hover:text-light">
          <X size={20} />
        </button>
      </div>
      {/* Contenido de seguridad aquí */}
    </div>
  )
}

export default SecurityPanel