        document.addEventListener('DOMContentLoaded', () => {
            // Lógica para 'Clase de Tercero: Otro'
            const otroTerceroCheck = document.getElementById('tercero_otro');
            const otroTerceroInput = document.getElementById('tercero_otro_cual');
            
            otroTerceroCheck.addEventListener('change', (e) => {
                if (e.target.checked) {
                    otroTerceroInput.style.display = 'inline-block';
                    otroTerceroInput.focus();
                } else {
                    otroTerceroInput.style.display = 'none';
                    otroTerceroInput.value = '';
                }
            });

            // Lógica para 'Documento: Otro'
            const otroDocInput = document.getElementById('doc_otro_cual');
            document.querySelectorAll('input[name="documento_tipo"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    if (e.target.id === 'doc_otro' && e.target.checked) {
                        otroDocInput.style.display = 'inline-block';
                        otroDocInput.focus();
                    } else {
                        if (e.target.id !== 'doc_otro') {
                            otroDocInput.style.display = 'none';
                            otroDocInput.value = '';
                        }
                    }
                });
            });

            // Lógica para 'Producto Moneda Extranjera'
            const productosExtranjerosSection = document.getElementById('productosExtranjerosSection');
            document.querySelectorAll('input[name="tiene_productos_extranjeros"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    if (e.target.value === 'si' && e.target.checked) {
                        productosExtranjerosSection.style.display = 'flex'; /* Cambiado a flex */
                    } else {
                        productosExtranjerosSection.style.display = 'none';
                    }
                });
            });

            // Lógica para PEP Pregunta 5 (mostrar tabla)
            const pepTableSection = document.getElementById('pepTableSection');
            document.querySelectorAll('input[name="pep_pregunta_5"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    if (e.target.value === 'si' && e.target.checked) {
                        pepTableSection.style.display = 'block';
                    } else {
                        pepTableSection.style.display = 'none';
                    }
                });
            });

            // Manejo del envío del formulario (prevenir envío real)
            const form = document.getElementById('vinculacionForm');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Aquí iría la lógica para enviar los datos a un servidor
                // Usamos un modal simple en lugar de alert()
                showModal('Formulario listo para ser enviado (envío deshabilitado en este ejemplo).');
            });
            
            // Función de modal simple para evitar alert()
            function showModal(message) {
                let modalOverlay = document.createElement('div');
                modalOverlay.style.position = 'fixed';
                modalOverlay.style.top = '0';
                modalOverlay.style.left = '0';
                modalOverlay.style.width = '100%';
                modalOverlay.style.height = '100%';
                modalOverlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
                modalOverlay.style.display = 'flex';
                modalOverlay.style.justifyContent = 'center';
                modalOverlay.style.alignItems = 'center';
                modalOverlay.style.zIndex = '1000';
                
                let modalBox = document.createElement('div');
                modalBox.style.backgroundColor = 'white';
                modalBox.style.padding = '20px';
                modalBox.style.borderRadius = '5px';
                modalBox.style.textAlign = 'center';
                
                let modalMessage = document.createElement('p');
                modalMessage.textContent = message;
                modalMessage.style.margin = '0 0 15px 0';
                
                let closeButton = document.createElement('button');
                closeButton.textContent = 'Cerrar';
                closeButton.style.padding = '5px 10px';
                
                modalBox.appendChild(modalMessage);
                modalBox.appendChild(closeButton);
                modalOverlay.appendChild(modalBox);
                document.body.appendChild(modalOverlay);
                
                closeButton.onclick = function() {
                    document.body.removeChild(modalOverlay);
                }
                modalOverlay.onclick = function(e) {
                    if (e.target === modalOverlay) {
                        document.body.removeChild(modalOverlay);
                    }
                }
            }
        });