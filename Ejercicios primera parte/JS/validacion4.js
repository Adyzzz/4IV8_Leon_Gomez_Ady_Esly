function calcularCalificacion() {
  const inParciales = document.getElementById('parciales');
  const inExamen = document.getElementById('examen');
  const inTrabajo = document.getElementById('trabajo');
  const resBox = document.getElementById('res4');

  const regTresNotas = /^[0-9]+(\.[0-9]{1,2})?(\s*,\s*[0-9]+(\.[0-9]{1,2})?){2}$/;
  const regNotaSimple = /^[0-9]+(\.[0-9]{1,2})?$/;

  const valParciales = inParciales.value.trim();
  const valExamen = inExamen.value.trim();
  const valTrabajo = inTrabajo.value.trim();

  inParciales.classList.remove('is-invalid');
  inExamen.classList.remove('is-invalid');
  inTrabajo.classList.remove('is-invalid');

  let formularioValido = true;

  if (!regTresNotas.test(valParciales)) { inParciales.classList.add('is-invalid'); formularioValido = false; }
  if (!regNotaSimple.test(valExamen)) { inExamen.classList.add('is-invalid'); formularioValido = false; }
  if (!regNotaSimple.test(valTrabajo)) { inTrabajo.classList.add('is-invalid'); formularioValido = false; }

  if (formularioValido) {
    const arrParciales = valParciales.split(',').map(n => parseFloat(n));
    const promParciales = (arrParciales[0] + arrParciales[1] + arrParciales[2]) / 3;
    
    const examen = parseFloat(valExamen);
    const trabajo = parseFloat(valTrabajo);

    const ptsParciales = promParciales * 0.55;
    const ptsExamen = examen * 0.30;
    const ptsTrabajo = trabajo * 0.15;
    
    const califFinal = ptsParciales + ptsExamen + ptsTrabajo;

    resBox.style.display = 'block';
    resBox.innerHTML = `
      Parciales (55%): <strong>${ptsParciales.toFixed(2)}</strong><br>
      Examen (30%): <strong>${ptsExamen.toFixed(2)}</strong><br>
      Trabajo (15%): <strong>${ptsTrabajo.toFixed(2)}</strong><br>
      <hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 10px 0;">
      Calificación Final: <strong style="font-size: 1.2rem; color: var(--color-primario);">${califFinal.toFixed(2)}</strong>
    `;
  } else {
    resBox.style.display = 'none';
    alert("Verifica los datos. Asegúrate de ingresar exactamente 3 parciales separados por coma.");
  }
}