document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();

  var preferencia = $("input:radio[name=preferencia]:checked").val();
  var area = document.getElementById("area").value;
  // var presupuesto = document.getElementById('presupuesto').value;
  var presupuesto = 15000;
  var procesador = document.getElementById("procesador").value;

  var option = {
    preferencia,
    area,
    presupuesto,
    procesador,
  };
  search(option);
});

function search(option) {
  // Create session
  var session = pl.create(1000);

  var program = document.getElementById("program").value;

  // Consult program
  session.consult(program);

  // Query goal
  // El filtro esta X Tipo de compu y Procesador
  var query = `compu(Nombre,caracteristicas(Pantalla,Memoria),buscar('${option.preferencia}', Area, Presupuesto ,'${option.procesador}')).`;
  //var query = `compu(X,caracteristicas(S,M),buscar('${option.preferencia}', '${option.area}', P ,'${option.procesador}')).`

  session.query(query);
  console.log(query);

  // Find answers
  session.answers(show(option), 100);
}

function show(option) {
  // Get output container
  var result = document.getElementById("formulario");
  result.innerHTML = "";
  var res = false;

  // Return callback function
  return function (answer) {
    // Valid answer
    if (pl.type.is_substitution(answer)) {
      res = true;

      // Get the value of the food
      var computadora = answer.lookup("Nombre");
      var pantalla = answer.lookup("Pantalla");
      var memoria = answer.lookup("Memoria");
      var presupuesto = answer.lookup("Presupuesto");
      var area = answer.lookup("Area");

      // Show answer
      result.innerHTML =
        result.innerHTML +
        `
        <div class="row">
            <div class="card margen" style="width: 100%">
                <div class="card-body">
                    <h4 class="card-title">Computadora recomendada: ${computadora}</h4>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    
                    <h5 class="card-title w-100">Procesador: ${option.procesador}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Tipo de computadora: ${option.preferencia}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Tamaño de pantalla: ${pantalla}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Área de trabajo: ${area}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Almacenamiento: ${memoria}</h6>
                    
                    <a href="#" class="btn btn-primary">Ver más</a>
                    <div class="seccion-1-2 d-flex">                  
                        <h1 style="color: #196F3D">$${presupuesto}.00 MXN</h1>  
                        <button type="button" class="btn btn-success" style="position:absolute; right: 2rem" onclick="alert('reservado!');location.reload()">Comprar</button>                   
                    </div> 
                </div>          
            </div>
        </div>
        `;
    } else {
      //console.log(pl.type.is_substitution(answer));
      if (!res) {
        result.innerHTML =
          result.innerHTML +
          `<div class="d-flex justify-content-center align-items-center" style="width: 100%; height: 100%">
                    <h1>No hay recomendaciones por el momento :( </h1>
                </div>`;
      }
    }
  };
}
