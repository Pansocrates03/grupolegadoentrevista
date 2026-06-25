import type { ChangeEvent } from 'react';
import type { CustomFormEvent } from '../types'

interface SectionContactProps {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | CustomFormEvent) => void;
    // Usamos Record<string, any> para decirle que 'values' es un objeto con llaves de texto y cualquier valor
  values?: Record<string, any>; 
}

export default function SectionBank({ onChange, values = {} } : SectionContactProps) {
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const inputClasses = "w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white";

  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Información para Transferencia Electrónica</h3>
      <p className="text-sm text-gray-500 mb-6">Proporcione los datos de la cuenta bancaria donde se realizarán los pagos.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelClasses}>Nombre de cuenta</label>
          <input type="text" name="nombreCuenta" value={values.nombreCuenta || ''} onChange={onChange} className={inputClasses} />
        </div>
        
        <div>
          <label className={labelClasses}>Banco</label>
          <select name="banco" value={values.banco || ''} onChange={onChange} className={inputClasses}>
            <option value="" disabled>Seleccione un banco</option>
            <option value="BANREGIO">BANREGIO</option>
            <option value="BANAMEX">BANAMEX</option>
            <option value="BANCOMEXT">BANCOMEXT</option>
            <option value="BBVABANCOMER">BBVA BANCOMER</option>
            <option value="SANTANDER">SANTANDER</option>
            <option value="HSBC">HSBC</option>
            <option value="BAJÍO">BAJÍO</option>
            <option value="INBURSA">INBURSA</option>
            <option value="SCOTIABANK">SCOTIABANK</option>
            <option value="AFIRME">AFIRME</option>
            <option value="BANORTE">BANORTE</option>
            <option value="AZTECA">AZTECA</option>
            <option value="BANCOPPEL">BANCOPPEL</option>
            <option value="CIBANCO">CIBANCO</option>
            <option value="MONEXCB">MONEX</option>
            <option value="STP">STP</option>
            <option value="OTRO">OTRO</option>
          </select>
        </div>

        <div>
          <label className={labelClasses}>Número de cuenta</label>
          <input type="text" name="numeroCuenta" value={values.numeroCuenta || ''} onChange={onChange} className={inputClasses} />
        </div>
        
        <div>
          <label className={labelClasses}>CLABE (18 dígitos)</label>
          <input type="text" name="clabe" minLength={18} maxLength={18} value={values.clabe || ''} onChange={onChange} className={inputClasses} />
        </div>
        
        <div>
          <label className={labelClasses}>Moneda</label>
          <select name="moneda" value={values.moneda || ''} onChange={onChange} className={inputClasses}>
            <option value="" disabled>Seleccione tipo de moneda</option>
            <option value="MXN">Pesos MXN</option>
            <option value="USD">Dólares USD</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className={labelClasses}>Correo para notificaciones de pago</label>
          <input type="email" name="correoNotificaciones" value={values.correoNotificaciones || ''} onChange={onChange} className={inputClasses} />
        </div>
      </div>
    </div>
  );
}