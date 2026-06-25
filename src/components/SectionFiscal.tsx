import type { ChangeEvent } from 'react';
import type { CustomFormEvent } from '../types'

interface SectionFiscalProps {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | CustomFormEvent) => void;
  // Usamos Record<string, any> para decirle que 'values' es un objeto con llaves de texto y cualquier valor
  values?: Record<string, any>; 
}

export default function SectionFiscal({ onChange, values = {} }: SectionFiscalProps) {
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const inputClasses = "w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white";

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

        <div>
          <label className={labelClasses}>Código postal (5 dígitos)</label>
          <input type="text" name="codigoPostal" maxLength={5} value={values.codigoPostal || ''} onChange={onChange} className={inputClasses} />
        </div>

        <div>
          <label className={labelClasses}>País</label>
          <input type="text" name="pais" value={values.pais || ''} onChange={onChange} className={inputClasses} />
        </div>
        
        <div className="md:col-span-2">
          <label className={labelClasses}>Régimen Fiscal</label>
          <select name="regimen" value={values.regimen || ''} onChange={onChange} className={inputClasses}>
            <option value="" disabled>Seleccione un régimen fiscal</option>
            <option value="601">601 - REGIMEN GENERAL DE LEY PERSONAS MORALES</option>
            <option value="602">602 - RÉGIMEN SIMPLIFICADO DE LEY PERSONAS MORALES</option>
            <option value="603">603 - PERSONAS MORALES CON FINES NO LUCRATIVOS</option>
            <option value="604">604 - RÉGIMEN DE PEQUEÑOS CONTRIBUYENTES</option>
            <option value="605">605 - RÉGIMEN DE SUELDOS Y SALARIOS E INGRESOS ASIMILADOS A SALARIOS</option>
            <option value="606">606 - RÉGIMEN DE ARRENDAMIENTO</option>
            <option value="607">607 - RÉGIMEN DE ENAJENACIÓN O ADQUISICIÓN DE BIENES</option>
            <option value="608">608 - RÉGIMEN DE LOS DEMÁS INGRESOS</option>
            <option value="609">609 - RÉGIMEN DE CONSOLIDACIÓN</option>
            <option value="610">610 - RÉGIMEN RESIDENTES EN EL EXTRANJERO SIN ESTABLECIMIENTO PERMANENTE EN MÉXICO</option>
            <option value="611">611 - RÉGIMEN DE INGRESOS POR DIVIDENDOS (SOCIOS Y ACCIONISTAS)</option>
            <option value="612">612 - RÉGIMEN DE LAS PERSONAS FÍSICAS CON ACTIVIDADES EMPRESARIALES Y PROFESIONALES</option>
            <option value="613">613 - RÉGIMEN INTERMEDIO DE LAS PERSONAS FÍSICAS CON ACTIVIDADES EMPRESARIALES</option>
            <option value="614">614 - RÉGIMEN DE LOS INGRESOS POR INTERESES</option>
            <option value="615">615 - RÉGIMEN DE LOS INGRESOS POR OBTENCIÓN DE PREMIOS</option>
            <option value="616">616 - SIN OBLIGACIONES FISCALES</option>
            <option value="617">617 - PEMEX</option>
            <option value="618">618 - RÉGIMEN SIMPLIFICADO DE LEY PERSONAS FÍSICAS</option>
            <option value="619">619 - INGRESOS POR LA OBTENCIÓN DE PRÉSTAMOS</option>
            <option value="620">620 - SOCIEDADES COOPERATIVAS DE PRODUCCIÓN QUE OPTAN POR DIFERIR SUS INGRESOS</option>
            <option value="621">621 - RÉGIMEN DE INCORPORACIÓN FISCAL</option>
            <option value="622">622 - RÉGIMEN DE ACTIVIDADES AGRÍCOLAS, GANADERAS, SILVÍCOLAS Y PESQUERAS PM</option>
            <option value="623">623 - RÉGIMEN DE OPCIONAL PARA GRUPOS DE SOCIEDADES</option>
            <option value="624">624 - RÉGIMEN DE LOS COORDINADOS</option>
            <option value="625">625 - RÉGIMEN DE LAS ACTIVIDADES EMPRESARIALES CON INGRESOS A TRAVÉS DE PLATAFORMAS TECNOLÓGICAS</option>
            <option value="626">626 - RÉGIMEN SIMPLIFICADO DE CONFIANZA</option>
            {/* Agrega aquí el resto de opciones según necesites */}
          </select>
        </div>
      </div>
    </div>
  );
}