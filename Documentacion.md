# Documentación Técnica: Módulo de Registro de Proveedores
## Descripción General
El componente `ProviderForm` es un formulario interactivo tipo wizard de 5 pasos desarrollado en React con TypeScript y Tailwind CSS. Permite la recolección escalonada de datos corporativos, fiscales y bancarios de proveedores, así como la carga de documentos PDF.

## Arquitectura y Diseño
Para garantizar la mantenibilidad y evitar la creación de un God Object, el formulario emplea una arquitectura modular. El estado global y la lógica de navegación se concentran en el contenedor principal, mientras que la interfaz de usuario se delega a subcomponentes estrictamente tipados.

Para el entorno de desarrollo y ejecución de los scripts, el proyecto está optimizado para funcionar con el runtime Bun, garantizando tiempos de inicio e instalación ultrarrápidos.

## Árbol de Componentes
- ProviderForm.tsx (Contenedor Padre): Orquesta el estado (formData, currentStep), la validación (isStepValid) y el tipado de eventos.
    - SectionBuilding.tsx: Manejo de selección múltiple (checkboxes simulados).
    - SectionContact.tsx: Inputs de texto y validación de longitud para teléfonos.
    - SectionFiscal.tsx: Recolección de datos de facturación y selects nativos.
    - SectionBank.tsx: Información de transferencia electrónica.
    - SectionFiles.tsx: Carga de archivos PDF y validación del aviso de privacidad.

## Gestión de Estado y Eventos
El estado principal se maneja a través de un único objeto formData utilizando el hook `useState<Record<string, any>>({})`.

Para evitar conflictos de tipado al actualizar el estado desde diferentes tipos de inputs (nativos y customizados), se implementó una interfaz unificada:
```
interface CustomFormEvent {
  target: {
    name: string;
    value: any;
    type?: string;
    checked?: boolean;
  };
}
```

Esto permite que la función `handleChange` procese limpiamente eventos tipo `ChangeEvent` estándar y eventos sintéticos generados por componentes como `SectionBuilding`.

## Integración con Backend
El formulario genera un payload JSON plano en el handleSubmit que mapea perfectamente con arquitecturas de backend modernas.

## Consideraciones de UI/UX
1. **Validación Bloqueante**: El botón de "Continuar" implementa retroalimentación visual inmediata. Utiliza la función isStepValid() para deshabilitar el avance si los campos obligatorios del paso actual no están satisfechos.
2. **Prevención de Doble Envío**: Se emplea SyntheticEvent en handleSubmit y e.preventDefault() en los controles de navegación para evitar recargas fantasma o envíos prematuros ocasionados por el reciclaje de nodos en el DOM de React.
