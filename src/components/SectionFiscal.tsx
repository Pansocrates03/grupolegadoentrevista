import type { ChangeEvent, KeyboardEvent } from 'react';

interface CustomFormEvent {
  target: {
    name: string;
    value: any;
    type?: string;
    checked?: boolean;
  };
}

interface SectionFiscalProps {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | CustomFormEvent) => void;
  values?: Record<string, any>; 
}

export default function SectionFiscal({ onChange, values = {} }: SectionFiscalProps) {
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const inputClasses = "w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white";

  // 1. Bloquea físicamente las letras en el teclado antes de que se escriban
  const preventLetters = (e: KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter', 'Meta', 'Control', 'c', 'v', 'a', 'x'];
    
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // 2. Limpia si el usuario pega texto que contenga letras
  const handleNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = e.target.value.replace(/\D/g, '');

    onChange({
      target: {
        name: e.target.name,
        value: cleanedValue,
        type: e.target.type,
      }
    });
  };

  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Información básica (Fiscal)</h3>
      <p className="text-sm text-gray-500 mb-6">Ingrese los datos de facturación y registro fiscal de la empresa o persona física.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelClasses}>Razón social</label>
          <input type="text" name="razonSocial" value={values.razonSocial || ''} onChange={onChange} className={inputClasses} />
        </div>
        
        <div>
          <label className={labelClasses}>RFC (10 caracteres mín.)</label>
          <input type="text" name="rfc" minLength={10} value={values.rfc || ''} onChange={onChange} className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>CURP</label>
          <input type="text" name="curp" value={values.curp || ''} onChange={onChange} className={inputClasses} />
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>Domicilio Fiscal</label>
          <input type="text" name="domicilioFiscal" value={values.domicilioFiscal || ''} onChange={onChange} className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Ciudad</label>
          <input type="text" name="ciudad" value={values.ciudad || ''} onChange={onChange} className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>Estado</label>
          <input type="text" name="estado" value={values.estado || ''} onChange={onChange} className={inputClasses} />
        </div>

        {/* 3. Aplicamos las funciones de validación al Código Postal */}
        <div>
          <label className={labelClasses}>Código postal (5 dígitos)</label>
          <input 
            type="text" 
            name="codigoPostal" 
            maxLength={5} 
            value={values.codigoPostal || ''} 
            onChange={handleNumberChange} /* 👈 Interceptor para pegar */
            onKeyDown={preventLetters}    /* 👈 Interceptor de teclado */
            className={inputClasses} 
          />
        </div>

        <div>
          <label className={labelClasses}>País</label>
          <input type="text" name="pais" value={values.pais || ''} onChange={onChange} className={inputClasses} />
        </div>
        
        <div className="md:col-span-2">
          <label className={labelClasses}>Régimen Fiscal</label>
          <select name="regimen" value={values.regimen || ''} onChange={onChange} className={inputClasses}>
            <option value="" disabled>Seleccione un régimen fiscal</option>
            <option value="601">601 - RÉGIMEN GENERAL DE LEY PERSONAS MORALES</option>
            <option value="612">612 - RÉGIMEN DE LAS PERSONAS FÍSICAS CON ACTIVIDADES EMPRESARIALES Y PROFESIONALES</option>
            <option value="626">626 - RÉGIMEN SIMPLIFICADO DE CONFIANZA</option>
            {/* Agrega aquí el resto de opciones según necesites */}
          </select>
        </div>
      </div>
    </div>
  );
}