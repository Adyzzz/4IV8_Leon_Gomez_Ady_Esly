function procesarNomina() {
  const baseInput = document.getElementById('base');
  const ventasInput = document.getElementById('ventas');
  
  const resBox = document.getElementById('res2'); 

  const regDinero = /^[0-9]+(\.[0-9]{1,2})?$/;
  const regLista = /^[0-9]+(\.[0-9]{1,2})?(\s*,\s*[0-9]+(\.[0-9]{1,2})?)*$/;

  const valBase = baseInput.value.trim();
  const valVentas = ventasInput.value.trim();

  
  baseInput.classList.remove('is-invalid');
  ventasInput.classList.remove('is-invalid');

  if (regDinero.test(valBase) && regLista.test(valVentas)) {
    const sueldoBase = parseFloat(valBase);
    const arrayVentas = valVentas.split(',').map(v => parseFloat(v));
    const sumaVentas = arrayVentas.reduce((a, b) => a + b, 0);
    
    const comisiones = sumaVentas * 0.10;
    const pagoTotal = sueldoBase + comisiones;

    
    resBox.style.display = 'block';
    resBox.innerHTML = `
      Total Comisiones (10%): <strong>$${comisiones.toFixed(2)}</strong><br>
      <hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 10px 0;">
      Total a recibir: <strong style="font-size: 1.2rem; color: var(--color-primario);">$${pagoTotal.toFixed(2)}</strong>
    `;
  } else {
    
    if (!regDinero.test(valBase)) baseInput.classList.add('is-invalid');
    if (!regLista.test(valVentas)) ventasInput.classList.add('is-invalid');
    
    resBox.style.display = 'none';
    alert("Por favor, verifica que los montos sean numéricos y sigan el formato solicitado.");
  }
}