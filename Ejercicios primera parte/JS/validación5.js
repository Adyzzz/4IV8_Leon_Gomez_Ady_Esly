function calcularPorcentajes() {
  const inHombres = document.getElementById('hombres');
  const inMujeres = document.getElementById('mujeres');
  const resBox = document.getElementById('res5');


  const regEntero = /^[0-9]+$/;

  const valHombres = inHombres.value.trim();
  const valMujeres = inMujeres.value.trim();

  inHombres.classList.remove('is-invalid');
  inMujeres.classList.remove('is-invalid');

  let formularioValido = true;

  if (!regEntero.test(valHombres)) { inHombres.classList.add('is-invalid'); formularioValido = false; }
  if (!regEntero.test(valMujeres)) { inMujeres.classList.add('is-invalid'); formularioValido = false; }

  if (formularioValido) {
    const hombres = parseInt(valHombres, 10);
    const mujeres = parseInt(valMujeres, 10);
    const total = hombres + mujeres;

    if (total === 0) {
      resBox.style.display = 'none';
      alert("El total de estudiantes no puede ser cero. Ingresa al menos a una persona.");
      return;
    }

    const porcHombres = (hombres / total) * 100;
    const porcMujeres = (mujeres / total) * 100;

    resBox.style.display = 'block';
    resBox.innerHTML = `
      Total de alumnos: <strong>${total}</strong><br>
      <hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 10px 0;">
      Hombres: <strong style="color: var(--color-primario);">${porcHombres.toFixed(1)}%</strong><br>
      Mujeres: <strong style="color: #8b5cf6;">${porcMujeres.toFixed(1)}%</strong>
    `;
  } else {
    resBox.style.display = 'none';
    alert("Por favor, ingresa únicamente números enteros válidos.");
  }
}