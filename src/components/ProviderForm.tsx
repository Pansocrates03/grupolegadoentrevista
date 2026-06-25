import { useState } from 'react';
import type { ChangeEvent, MouseEvent, SyntheticEvent } from 'react';
import SectionBuilding from './SectionBuilding';
import SectionContact from './SectionContact';
import SectionFiscal from './SectionFiscal';
import SectionBank from './SectionBank';
import SectionFiles from './SectionFiles';

interface CustomFormEvent {
  target: {
    name: string;
    value: any;
    type?: string;
    checked?: boolean;
  };
}

export default function ProviderForm() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  // 1. Nuevo estado para controlar si el formulario ya fue enviado
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      return formData.edificios && formData.edificios.length > 0;
    }
    return true; 
  };

  const handleNext = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    if (!isStepValid()) return;
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrev = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos listos para enviar a la API:", formData);
    
    // Aquí iría tu lógica de fetch() o axios() hacia tu backend
    // Una vez que el backend responda con éxito, cambiamos el estado:
    setIsSubmitted(true); 
  };

  const progressPercentage = ((currentStep) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-[#F4F0EC] py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-800 flex flex-col items-center justify-center">

      <div className="mb-8">
        <img 
          src="https://adminlegado.com/images/Fotos/gl2.png" 
          alt="Logo Grupo Legado" 
          className="h-18 sm:h-26 w-auto object-contain drop-shadow-sm" 
        />
      </div>
      
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* 2. Renderizado Condicional: Evaluamos si ya se envió */}
        {isSubmitted ? (
          
          /* --- PANTALLA DE ÉXITO --- */
          <div className="p-8 sm:p-16 text-center animate-fade-in">
            
            <h2 className="text-3xl font-extrabold text-[#4b3621] mb-4">
              ¡Registro Exitoso!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Se ha registrado al proveedor correctamente en nuestro sistema.
            </p>
            
            <div className="border-t border-gray-100 pt-8 mt-4">
              <p className="text-sm text-gray-500">
                Si tienes dudas o necesitas modificar alguna información, por favor contacta a nuestro equipo en:{' '}
                <a 
                  href="mailto:soporte@adminlegado.com" 
                  className="text-[#4b3621] font-bold hover:underline"
                >
                  soporte@adminlegado.com
                </a>
              </p>
            </div>
          </div>

        ) : (
          
          /* --- PANTALLA DEL FORMULARIO ORIGINAL --- */
          <>
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
                <div className="min-h-[250px]">
                  {currentStep === 1 && <SectionBuilding onChange={handleChange} values={formData} />}
                  {currentStep === 2 && <SectionContact onChange={handleChange} values={formData} />}
                  {currentStep === 3 && <SectionFiscal onChange={handleChange} values={formData} />}
                  {currentStep === 4 && <SectionBank onChange={handleChange} values={formData} />}
                  {currentStep === 5 && <SectionFiles onChange={handleChange} values={formData} />}
                </div>

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
                      disabled={!isStepValid()}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors shadow-md ${
                        isStepValid()
                          ? 'text-[#4b3621] bg-[#e8e0d0] hover:bg-[#D5CDBE]' 
                          : 'text-gray-400 bg-gray-300 cursor-not-allowed shadow-none'
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
          </>
        )}
      </div>
    </div>
  );
}