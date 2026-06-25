import type { ChangeEvent } from 'react';
import type { CustomFormEvent } from '../types'

interface SectionBuildingProps {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | CustomFormEvent) => void;
    // Usamos Record<string, any> para decirle que 'values' es un objeto con llaves de texto y cualquier valor
  values?: Record<string, any>; 
}

export default function SectionBuilding({ onChange, values = {} } : SectionBuildingProps) {
  // Recuperamos la lista de edificios seleccionados o inicializamos un arreglo vacío
  const selectedBuildings = values.edificios || [];

  const listadoEdificios = [
    "Legado Corporativo",
    "Axiss",
    "Equus 335",
    "Equus 444"
  ];

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let updatedBuildings;

    if (checked) {
      // Si se marca, lo añadimos al arreglo
      updatedBuildings = [...selectedBuildings, value];
    } else {
      // Si se desmarca, lo filtramos del arreglo
      updatedBuildings = selectedBuildings.filter((edificio:string) => edificio !== value);
    }

    // Simulamos la estructura de un evento nativo para que el padre lo reciba sin problemas
    onChange({
      target: {
        name: 'edificios',
        value: updatedBuildings,
        type: 'custom' // Evita que caiga en la validación 'checkbox' del padre
      }
    });
  };

  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Seleccione el o los edificios
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Por favor, marque todos los edificios a los que brindará servicios. Puede seleccionar más de uno.
      </p>

      {/* Grid de opciones estilizadas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {listadoEdificios.map((edificio) => {
          const isChecked = selectedBuildings.includes(edificio);

          return (
            <label
              key={edificio}
              className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isChecked
                  ? 'border-indigo-600 bg-indigo-50/50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <input
                type="checkbox"
                name="edificios-opcion"
                value={edificio}
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-4 transition-all"
              />
              <span className={`font-medium ${isChecked ? 'text-indigo-900' : 'text-gray-700'}`}>
                {edificio}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}