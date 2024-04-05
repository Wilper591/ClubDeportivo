$(document).ready(function () {
  getData();
});

function getData() {
  $("#cuerpo").html("");
  axios.get("/deportes").then((data) => {
    let deportes = data.data.deportes;
    deportes.forEach((d, i) => {
      $("#cuerpo").append(`
        <tr>
          <th scope="row">${i + 1}</th>
          <td class="d-none">${d.id}</td>
          <td class="text-capitalize">${d.nombre}</td>
          <td>${d.precio}</td>
          <td>
            <button class="btn btn-warning" onclick='preEdit("${d.id}","${
        d.nombre
      }","${
        d.precio
      }")' data-toggle="modal" data-target="#exampleModal">Editar</button>
            <button class="btn btn-danger" onclick='eliminar("${d.id}","${
        d.nombre
      }","${d.precio}")'>Eliminar</button>
          </td>
        </tr>
        `);
    });
  });
}

function preEdit(id, nombre, precio) {
  $("#idModal").val(id);
  $("#nombreModal").val(nombre);
  $("#precioModal").val(precio);
}

function agregar() {
  let nombre = $("#nombre").val();
  let precio = $("#precio").val();
  /* Regex para validar los input nombre y precio */
  const regexNombre = /^[A-Za-zñÑ\sáíéóúÁÍÉÓÚäÄëËïÏöÖüÜ]+$/;
  const regexPrecio = /^\d+$/;
  if (!regexNombre.test(nombre)) {
    alert("El nombre solo puede contener letras");
    return;
  }
  if (nombre.length < 3) {
    alert("El nombre ingresado no puede ser menor a 3 carácteres");
    return;
  }
  if (nombre.length > 100) {
    alert("El nombre ingresado no puede ser mayor a 100 carácteres");
    return;
  }
  if (!regexPrecio.test(precio)) {
    alert("El precio solo puede contener números");
    return;
  }
  if (parseInt(precio) > 1000000) {
    alert("El precio máximo permitido es 1000000");
    return;
  }
  axios.get(`/agregar?nombre=${nombre}&precio=${precio}`).then((data) => {
    alert(data.data);
    getData();
  });
  $("#exampleModal").modal("hide");
}

function edit() {
  let id = $("#idModal").val();
  let nombre = $("#nombreModal").val();
  let precio = $("#precioModal").val();
  /* Validación para input precio */
  const regexPrecio = /^\d+$/;
  if (!regexPrecio.test(precio)) {
    alert("El precio solo puede contener números");
    return;
  }
  if (parseInt(precio) > 1000000) {
    alert("El precio máximo permitido es 1000000");
    return;
  }
  axios
    .get(`/editar?id=${id}&nombre=${nombre}&precio=${precio}`)
    .then((data) => {
      alert(data.data);
      getData();
    });
  $("#exampleModal").modal("hide");
}

function eliminar(id, nombre, precio) {
  axios
    .get(`/eliminar?id=${id}&nombre=${nombre}&precio=${precio}`)
    .then((data) => {
      alert(data.data);
      getData();
    });
  $("#exampleModal").modal("hide");
}
