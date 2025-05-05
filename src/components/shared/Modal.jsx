import React from 'react'
import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={handleBackdropClick}>
      <div className="bg-dark border border-sith/20 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-light/70 hover:text-light transition-colors"
        >
          <X size={20} />
        </button>
        <div className="flex flex-col items-center text-center pt-4">
          {children}
          <button
            onClick={onClose}
            className="mt-4 bg-sith text-light px-6 py-2 rounded-lg hover:bg-sith-dark transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal