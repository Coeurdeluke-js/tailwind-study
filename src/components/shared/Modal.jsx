import React from 'react'
import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dark border border-sith/20 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-light/70 hover:text-light transition-colors"
        >
          <X size={20} />
        </button>
        <div className="flex flex-col items-center text-center pt-4">
          {title && <h2 className="text-2xl font-bold text-light mb-4">{title}</h2>}
          {children}
          <div className="flex gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-sith text-light hover:bg-sith/10 transition-colors"
            >
              Cancelar
            </button>
            <button
              className="bg-sith text-light px-6 py-2 rounded-lg hover:bg-sith-dark transition-colors"
            >
              Quiero ser un Acólito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal