const API_URL = "https://TU_BACKEND_RENDER.onrender.com"; // Reemplaza con la URL de tu backend en Render

async function cargarDatos() {
  const res = await fetch(`${API_URL}/inscritos`);
  const datos = await res.json();
  mostrarTabla(datos);
}

async function inscribir() {
  const rut = document.getElementById("rut").value.trim();
  const bloque = document.getElementById("bloque").value;

  if (!rut) { alert("Debe ingresar un RUT"); return; }

  try {
    const res = await fetch(`${API_URL}/inscribir`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rut, bloque })
    });

    const data = await res.json();
    if (res.ok) {
      document.getElementById("rut").value = "";
      cargarDatos();
    } else {
      alert(data.error);
    }
  } catch (err) {
    alert("Error conectando al servidor");
    console.error(err);
  }
}

function mostrarTabla(datos) {
  const tabla = document.getElementById("tabla");
  tabla.innerHTML = "";

  let bloque1 = 0, bloque2 = 0;

  datos.forEach(d => {
    tabla.innerHTML += `
      <tr>
        <td>${d.rut}</td>
        <td>${d.bloque}</td>
        <td>${d.fecha}</td>
      </tr>
    `;
    if (d.bloque === "Bloque 1") bloque1++;
    if (d.bloque === "Bloque 2") bloque2++;
  });

  document.getElementById("cupos").innerText =
    `Bloque 1: ${bloque1}/15 | Bloque 2: ${bloque2}/15`;
}

cargarDatos();
