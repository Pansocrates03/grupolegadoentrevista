import type { ChangeEvent } from 'react';
import type { CustomFormEvent } from '../types'

interface SectionContactProps {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | CustomFormEvent) => void;
    // Usamos Record<string, any> para decirle que 'values' es un objeto con llaves de texto y cualquier valor
  values?: Record<string, any>; 
}

export default function SectionContact({ onChange, values = {} } : SectionContactProps) {
  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Información de contacto</h3>
      <p className="text-sm text-gray-500 mb-6">Por favor, ingrese los datos de la persona de contacto.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre comercial</label>
          <input 
            type="text" 
            name="nombreComercial" 
            value={values.nombreComercial || ''} 
            onChange={onChange} 
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contacto de venta</label>
          <input 
            type="text" 
            name="contactoVenta" 
            value={values.contactoVenta || ''} 
            onChange={onChange} 
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Puesto contacto</label>
          <input 
            type="text" 
            name="puestoContacto" 
            value={values.puestoContacto || ''} 
            onChange={onChange} 
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono (10 dígitos)</label>
          <input 
            type="tel" 
            name="telefono" 
            minLength={10} 
            maxLength={10} 
            value={values.telefono || ''} 
            onChange={onChange} 
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Celular (10 dígitos)</label>
          <input 
            type="tel" 
            name="celular" 
            minLength={10} 
            maxLength={10} 
            value={values.celular || ''} 
            onChange={onChange} 
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
          <input 
            type="email" 
            name="correoContacto" 
            value={values.correoContacto || ''} 
            onChange={onChange} 
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
          />
        </div>
      </div>
    </div>
  );
}