function calcularDescuento() {
  const inputCompra = document.getElementById('compra');
  const resBox = document.getElementById('res3');
  const valor = inputCompra.value.trim();

 
  const regexDinero = /^[0-9]+(\.[0-9]{1,2})?$/;

 
  inputCompra.classList.remove('is-invalid');

  if (regexDinero.test(valor)) {
    const totalCompra = parseFloat(valor);
    const descuento = totalCompra * 0.15; // 15% de descuento
    const totalAPagar = totalCompra - descuento;

 
    resBox.style.display = 'block';
    resBox.innerHTML = `
      Descuento aplicado (15%): <strong style="color: var(--color-error);">-$${descuento.toFixed(2)}</strong><br>
      <hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 10px 0;">
      Total a pagar: <strong style="font-size: 1.2rem; color: var(--color-primario);">$${totalAPagar.toFixed(2)}</strong>
    `;
  } else {
 
    inputCompra.classList.add('is-invalid');
    resBox.style.display = 'none';
    alert("Por favor, ingresa un monto de compra válido.");
  }
}