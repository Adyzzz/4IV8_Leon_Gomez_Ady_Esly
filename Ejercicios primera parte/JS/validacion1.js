function calcularGanancia() {
  const inputCapital = document.getElementById('capital');
  // Cambiamos 'resultado' por 'res1' para que coincida con el HTML
  const resBox = document.getElementById('res1'); 
  const valor = inputCapital.value.trim();

  const regexDinero = /^[0-9]+(\.[0-9]{1,2})?$/;

  // Usamos la nueva clase de error del CSS global
  inputCapital.classList.remove('is-invalid'); 

  if (regexDinero.test(valor)) {
    const capital = parseFloat(valor);
    const ganancia = capital * 0.02; // 2% mensual
    
    // Mostramos la caja verde del CSS
    resBox.style.display = 'block'; 
    resBox.innerHTML = `Ganancia estimada a un mes: <br><strong style="font-size: 1.2rem; color: #2ecc71;">$${ganancia.toFixed(2)}</strong>`;
  } else {
    // Aplicamos el borde rojo del CSS
    inputCapital.classList.add('is-invalid'); 
    resBox.style.display = 'none';
    alert("Por favor, ingresa un monto válido (ej. 1500 o 1500.50).");
  }
}