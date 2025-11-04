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
            // (Aquí también deberías limpiar/resetear los campos de esa sección si es necesario)
        }
    });


    // --- Lógica para la Pregunta 5 de PEP (Parientes) ---
    const pepQ5SiRadio = document.getElementById('pep-q5-si');
    const pepQ5NoRadio = document.getElementById('pep-q5-no');
    const pepRelativeSection = document.getElementById('pep-relative-section');

    pepQ5SiRadio.addEventListener('change', () => {
        if (pepQ5SiRadio.checked) {
            // Si tiene vínculo (Pregunta 5), muestra la tabla de parientes [cite: 110]
            pepRelativeSection.classList.remove('hidden');
        }
    });

    pepQ5NoRadio.addEventListener('change', () => {
        if (pepQ5NoRadio.checked) {
            // Si no tiene vínculo, oculta la tabla [cite: 110]
            pepRelativeSection.classList.add('hidden');
        }
    });
});