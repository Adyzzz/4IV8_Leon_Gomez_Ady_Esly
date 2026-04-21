function calcularEdad() {
  const cajaTexto = document.getElementById('fechaNac');
  const cajaResultado = document.getElementById('res6');
  const textoIngresado = cajaTexto.value.trim();

  const miRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}$/;


  cajaTexto.classList.remove('is-invalid');
  
  if (miRegex.test(textoIngresado)) {
    
    const partes = textoIngresado.split('/');
    const diaNac = parseInt(partes[0]);
    const mesNac = parseInt(partes[1]);
    const anioNac = parseInt(partes[2]);
    
    const hoy = new Date();
    const diaActual = hoy.getDate();
    const mesActual = hoy.getMonth() + 1;
    const anioActual = hoy.getFullYear();

    
    let edadFinal = anioActual - anioNac;
    
    if (mesActual < mesNac) {
      edadFinal = edadFinal - 1;
    } else if (mesActual === mesNac && diaActual < diaNac) {
      edadFinal = edadFinal - 1;
    }

    
    cajaResultado.style.display = 'block';
    cajaResultado.innerHTML = `Tienes <strong>${edadFinal} años</strong>.`;

  } else {
    
    cajaTexto.classList.add('is-invalid');
    cajaResultado.style.display = 'none';
    alert("Formato incorrecto. Usa: DD/MM/AAAA (ejemplo: 01/01/2000)");
  }
}