const apiKey = 'ONBsbC3OhM3Fp1BRRyEnywlAgH48SY5qG1NKZ-NmJ_Q';

async function buscarImagenes() {
    const query = document.getElementById('category').value;
    const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        mostrarImagenes(data.results);
    } catch (error) {
        console.error("Error al obtener las imágenes:", error);
        mostrarError("No se pudieron cargar las imágenes. Intenta de nuevo más tarde.");
    }
}

function mostrarImagenes(imagenes) {
    const grid = document.getElementById('imageGrid');
    grid.innerHTML = ''; 

    imagenes.forEach(imagen => {
        const pin = document.createElement('div');
        pin.className = 'pin';

        const pin_overlay = document.createElement('div');
        pin_overlay.className = 'pin_overlay';

        const share_button = document.createElement('p');
        share_button.className = 'share_button';
        share_button.textContent = 'Perfil V'; // Texto fijo

        const save_button = document.createElement('button');
        save_button.className = 'save_button';
        save_button.textContent = 'Guardar'; // Texto fijo

        pin_overlay.appendChild(share_button);
        pin_overlay.appendChild(save_button);

        const img = document.createElement('img');
        img.src = imagen.urls.regular; 
        img.alt = imagen.alt_description || 'Imagen de Unsplash'; 

        const botones = document.createElement('div');
        botones.className = 'botones';

        const puntos_button = document.createElement('button');
        puntos_button.className = 'puntos';
        puntos_button.innerHTML = '...'; 

        const compartir_button = document.createElement('button');
        compartir_button.className = 'puntos';
        compartir_button.innerHTML = '<img src="/img/icons8-compartir-redondeado-30.png" alt="Compartir">'; 

        botones.appendChild(puntos_button);
        botones.appendChild(compartir_button);

        pin.appendChild(pin_overlay);
        pin.appendChild(img);
        pin.appendChild(botones);

        grid.appendChild(pin);
    });
}

function mostrarError(mensaje) {
    const grid = document.getElementById('imageGrid');
    grid.innerHTML = `<p class="error-message">${mensaje}</p>`;
}
