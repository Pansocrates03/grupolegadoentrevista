import { useState } from 'react';
import type { ChangeEvent, MouseEvent, SyntheticEvent } from 'react';
import SectionBuilding from './SectionBuilding';
import SectionContact from './SectionContact';
import SectionFiscal from './SectionFiscal';
import SectionBank from './SectionBank';
import SectionFiles from './SectionFiles';

// Interfaz para aceptar tanto eventos nativos como nuestro evento simulado de edificios
interface CustomFormEvent {
  target: {
    name: string;
    value: any;
    type?: string;
    checked?: boolean;
  };
}

export default function ProviderForm() {
  // Tipamos el estado como un objeto que recibe cualquier llave de texto y cualquier valor
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Tipado completo para aceptar inputs, selects y nuestro CustomFormEvent
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | CustomFormEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      // Verifica que exista el arreglo 'edificios' y que tenga al menos 1 elemento
      return formData.edificios && formData.edificios.length > 0;
    }
    // Aquí podrías agregar validaciones para los pasos 2, 3 y 4 en el futuro
    return true; 
  };

  const handleNext = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    if (!isStepValid()) return; // 👈 Bloquea el avance si no es válido
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  // Se añade el tipado y el preventDefault() a handlePrev por buena práctica
  const handlePrev = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // 👈 Usamos SyntheticEvent en lugar de FormEvent para evitar el error del compilador
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('current step', currentStep);
    console.log("Datos enviados:", formData);
    alert("¡Registro exitoso!");
  };

  // Cálculo de la barra de progreso
  const progressPercentage = ((currentStep) / totalSteps) * 100;

  return (
    /* Contenedor principal con tu color de fondo */
    <div className="min-h-screen bg-[#F4F0EC] py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800 flex flex-col items-center justify-center">

      {/* 2. El logo de la empresa, centrado y con un margen inferior (mb-8) */}
      <div className="mb-8">
        <img 
          src="https://adminlegado.com/images/Fotos/gl2.png" 
          alt="Logo Grupo Legado" 
          className="h-18 sm:h-26 w-auto object-contain drop-shadow-sm" 
        />
      </div>
      
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 h-2">
          <div 
            className="bg-[#4b3621] h-2 transition-all duration-500 ease-in-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-extrabold text-[#4b3621] mb-2 text-center">
            Registro de Proveedor
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Paso {currentStep} de {totalSteps}
          </p>

          <form onSubmit={handleSubmit}>
            {/* Renderizado condicional de los pasos */}
            <div className="min-h-[250px]">
              {currentStep === 1 && <SectionBuilding onChange={handleChange} values={formData} />}
              {currentStep === 2 && <SectionContact onChange={handleChange} values={formData} />}
              {currentStep === 3 && <SectionFiscal onChange={handleChange} values={formData} />}
              {currentStep === 4 && <SectionBank onChange={handleChange} values={formData} />}
              {currentStep === 5 && <SectionFiles onChange={handleChange} values={formData} />}
            </div>

            {/* Controles de Navegación */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 1 
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                    : 'text-[#4b3621] bg-[#e8e0d0] hover:bg-[#D5CDBE]'
                }`}
              >
                ← Regresar
              </button>

              {currentStep < totalSteps ? (
                <button
                  key="btn-next"
                  type="button"
                  onClick={handleNext}
                  disabled={!isStepValid()} /* 👈 Deshabilita el botón nativamente */
                  className={`px-6 py-2 rounded-lg font-medium transition-colors shadow-md ${
                    isStepValid()
                      ? 'text-[#4b3621] bg-[#e8e0d0] hover:bg-[#D5CDBE]' /* Estilo Activo */
                      : 'text-gray-400 bg-gray-300 cursor-not-allowed shadow-none' /* Estilo Inactivo */
                  }`}
                >
                Continuar →
              </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg font-medium text-white bg-[#4b3621] hover:bg-[#60462B] transition-colors shadow-md"
                >
                  Finalizar Registro
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}