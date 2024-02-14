// login.js
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Aquí debes hacer una solicitud al servidor para autenticar al usuario
    // Puedes usar Fetch API o cualquier otra librería para hacer peticiones HTTP
  
    // Ejemplo con Fetch API
    fetch('/login.html', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        // Maneja la respuesta del servidor, por ejemplo, redirecciona a la página principal si el inicio de sesión es exitoso
        if (data.success) {
          window.location.href = '/'; // Cambia '/' por la ruta deseada
        } else {
          alert('Inicio de sesión fallido. Verifica tus credenciales.');
        }
      })
      .catch(error => console.error('Error:', error));
  });
  