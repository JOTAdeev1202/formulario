// Espera a que todo el contenido del DOM (la página) esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para "Clase de Tercero" (Otro) ---
    const otroCheckbox = document.getElementById('clase-tercero-otro');
    const otroCualInput = document.getElementById('clase-tercero-cual');

    otroCheckbox.addEventListener('change', () => {
        if (otroCheckbox.checked) {
            // Si marcan "Otro", muestra el campo de texto
            otroCualInput.classList.remove('hidden');
        } else {
            // Si lo desmarcan, oculta y limpia el campo
            otroCualInput.classList.add('hidden');
            otroCualInput.value = '';
        }
    });

    // --- Lógica principal de la Declaración PEP ---
    const pepSiRadio = document.getElementById('pep-si');
    const pepNoRadio = document.getElementById('pep-no');
    const pepSection = document.getElementById('pep-declaration-section');
    const pepRelativeSection = document.getElementById('pep-relative-section'); // Definido aquí para usarlo en pepNoRadio

    pepSiRadio.addEventListener('change', () => {
        if (pepSiRadio.checked) {
            // Si es PEP, muestra toda la sección de declaración 
            pepSection.classList.remove('hidden');
        }
    });

    pepNoRadio.addEventListener('change', () => {
        if (pepNoRadio.checked) {
            // Si NO es PEP, oculta la sección 
            pepSection.classList.add('hidden');
            // También oculta la sub-sección de parientes
            pepRelativeSection.classList.add('hidden');
        }
    });


    // --- Lógica para la Pregunta 5 de PEP (Parientes) ---
    const pepQ5SiRadio = document.getElementById('pep-q5-si');
    const pepQ5NoRadio = document.getElementById('pep-q5-no');
    // pepRelativeSection ya está definida arriba

    pepQ5SiRadio.addEventListener('change', () => {
        if (pepQ5SiRadio.checked) {
            // Si tiene vínculo (Pregunta 5), muestra la tabla de parientes
            pepRelativeSection.classList.remove('hidden');
        }
    });

    pepQ5NoRadio.addEventListener('change', () => {
        if (pepQ5NoRadio.checked) {
            // Si no tiene vínculo, oculta la tabla
            pepRelativeSection.classList.add('hidden');
        }
    });
    
    // --- Lógica de Fecha (Tu código original) ---
    const campoFecha = document.getElementById('fecha');
    const fechaEncabezado = document.getElementById('fecha-encabezado');

    campoFecha.addEventListener('input', function () {
        const fechaSeleccionada = this.value;
        if (fechaSeleccionada) {
            const fechaFormateada = formatearFecha(fechaSeleccionada);
            fechaEncabezado.textContent = fechaFormateada;
        } else {
            fechaEncabezado.textContent = 'dd-mm-aaaa'; // Resetea si no hay fecha
        }
    });


    // --- LÓGICA PARA GENERAR PDF (VERSIÓN FINAL CORREGIDA) ---
    const form = document.getElementById('form-vinculacion');
    
    form.addEventListener('submit', (event) => {
        // 1. Evita que el formulario se envíe de la forma tradicional
        event.preventDefault(); 
        
        // 2. Elementos que queremos convertir o modificar
        const element = document.body; // <-- CAMBIO: Capturamos todo el body
        const submitButton = form.querySelector('button[type="submit"]');
        const authSections = document.querySelectorAll('.auth-section'); 

        // 3. Opciones para html2pdf
        const opt = {
          margin:       [0.5, 0.5, 0.5, 0.5], // [top, left, bottom, right] en pulgadas
          filename:     'formulario_vinculacion.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true, scrollY: 0 }, // Asegura empezar arriba
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
          pagebreak:    { mode: ['css', 'avoid-all'] } // Respeta los saltos de página CSS
        };

        // --- 4. PREPARAR EL HTML ANTES DE LA "CAPTURA" ---
        
        // Oculta el botón "Enviar"
        submitButton.style.display = 'none';
        
        // Expande las cajas de texto con scroll
        authSections.forEach(section => {
            section.style.maxHeight = 'none';
            section.style.overflowY = 'visible';
        });

        // Aseguramos que la "foto" se tome desde el inicio de la página
        window.scrollTo(0, 0);

        // 5. Llama a la biblioteca para generar y descargar el PDF
        html2pdf().set(opt).from(element).save().finally(() => {
            // --- 6. RESTAURAR EL HTML (después de que el PDF se genere o falle) ---
            
            // Vuelve a mostrar el botón
            submitButton.style.display = 'block';
            
            // Devuelve el scroll a las cajas de texto
            authSections.forEach(section => {
                section.style.maxHeight = '150px'; // El valor original de tu CSS
                section.style.overflowY = 'auto';  // El valor original de tu CSS
            });
        });
    });

}); // Fin del DOMContentLoaded principal


// --- Funciones (Tu código original) ---
// (Movidas fuera del DOMContentLoaded)

function formatearFecha(fechaISO) {
  // Tu formato de (YYYY-MM-DD) a (DD-MM-YYYY) es más eficiente
  if (!fechaISO) return '';
  const [año, mes, dia] = fechaISO.split('-');
  return `${dia}-${mes}-${año}`;
}