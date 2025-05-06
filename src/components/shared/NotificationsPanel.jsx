import React from 'react'
import { X } from 'lucide-react'

const NotificationsPanel = ({ onClose }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-dark border-l border-sith/20 p-4 shadow-xl z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-light">Notificaciones</h2>
        <button onClick={onClose} className="text-light/70 hover:text-light">
          <X size={20} />
        </button>
      </div>
      <div className="space-y-4">
        {/* Contenido de notificaciones aquí */}
      </div>
    </div>
  )
}

export default NotificationsPanel