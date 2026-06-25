import type { ChangeEvent, KeyboardEvent } from 'react';

interface CustomFormEvent {
  target: {
    name: string;
    value: any;
    type?: string;
    checked?: boolean;
  };
}

interface SectionContactProps {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | CustomFormEvent) => void;
  values?: Record<string, any>; 
}

export default function SectionContact({ onChange, values = {} }: SectionContactProps) {
  
  // 1. Bloquea físicamente las letras en el teclado antes de que se escriban
  const preventLetters = (e: KeyboardEvent<HTMLInputElement>) => {
    // Teclas permitidas (borrar, tabulador, flechas, copiar/pegar)
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Enter', 'Meta', 'Control', 'c', 'v', 'a', 'x'];
    
    // Si la tecla no es un número (0-9) y tampoco es una tecla de control, bloqueamos el evento
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // 2. Limpia si el usuario pega texto que contenga letras mezcladas con números
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
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
            type="text" 
            name="telefono" 
            minLength={10} 
            maxLength={10} 
            value={values.telefono || ''} 
            onChange={handlePhoneChange} 
            onKeyDown={preventLetters} /* 👈 Intercepta la pulsación de la tecla */
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Celular (10 dígitos)</label>
          <input 
            type="text" 
            name="celular" 
            minLength={10} 
            maxLength={10} 
            value={values.celular || ''} 
            onChange={handlePhoneChange} 
            onKeyDown={preventLetters} /* 👈 Intercepta la pulsación de la tecla */
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