import type { ChangeEvent } from 'react';
import type { CustomFormEvent } from '../types'

interface SectionFilesProps {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | CustomFormEvent) => void;
   // Usamos Record<string, any> para decirle que 'values' es un objeto con llaves de texto y cualquier valor
  values?: Record<string, any>; 
}

export default function SectionFiles({ onChange, values = {} } : SectionFilesProps) {
  const fileInputClasses = `
    block w-full text-sm text-gray-500 
    file:mr-4 file:py-2.5 file:px-4 
    file:rounded-lg file:border-0 
    file:text-sm file:font-semibold 
    file:bg-indigo-50 file:text-indigo-700 
    hover:file:bg-indigo-100 file:cursor-pointer 
    file:transition-colors cursor-pointer 
    border border-gray-200 rounded-lg p-1 bg-white
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
  `;

  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Documentos Adjuntos</h3>
      <p className="text-sm text-gray-500 mb-6">Por favor, cargue los documentos solicitados en formato PDF.</p>
      
      <div className="flex flex-col space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Constancia de Situación Fiscal
          </label>
          <input 
            type="file" 
            name="constanciaFiscal" 
            accept=".pdf" 
            onChange={onChange} 
            className={fileInputClasses} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Carátula de Estado de Cuenta
          </label>
          <input 
            type="file" 
            name="caratulaEstadoCuenta" 
            accept=".pdf" 
            onChange={onChange} 
            className={fileInputClasses} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Opinión de Cumplimiento de Obligaciones Fiscales
          </label>
          <input 
            type="file" 
            name="opinionCumplimiento" 
            accept=".pdf" 
            onChange={onChange} 
            className={fileInputClasses} 
          />
        </div>

        {/* Casilla de Aviso de Privacidad Estilizada */}
        <div className="pt-4 border-t border-gray-100">
          <label className="flex items-start cursor-pointer select-none">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                name="avisoPrivacidad"
                checked={values.avisoPrivacidad || false}
                onChange={onChange}
                required
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer transition-all"
              />
            </div>
            <div className="ml-3 text-sm">
              <span className="font-medium text-gray-700">
                Acepto el{' '}
                <a 
                  href="https://adminlegado.com/formulario/aviso-privacidad" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
                >
                  aviso de privacidad
                </a>{' '}
                y autorizo el tratamiento de mis datos personales *
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}