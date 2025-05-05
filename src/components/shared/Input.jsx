import React from 'react'

const Input = ({ 
  type = 'text', 
  label, 
  placeholder, 
  value, 
  onChange, 
  error 
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-light mb-1">{label}</label>
      <input 
        type={type} 
        className={`w-full px-3 py-2 border border-sith/30 rounded-lg bg-dark/80 text-light focus:outline-none focus:ring-2 focus:ring-sith ${error ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

export default Input