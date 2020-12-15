document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault()


    var preferencia = ($('input:radio[name=preferencia]:checked').val());
    var area = document.getElementById('area').value;
    // var presupuesto = document.getElementById('presupuesto').value;
    var presupuesto = 15000;
    var procesador = document.getElementById('procesador').value;


    // var preferencia = "Laptop";
    // var area = document.getElementById('area').value;
    // // var presupuesto = document.getElementById('presupuesto').value;
    // var presupuesto = 10000;
    // var procesador = document.getElementById('procesador').value;

    var option = {
        preferencia,
        area,
        presupuesto,
        procesador
    }
    search(option);
});

function search(option) {

    // Create session
    var session = pl.create(1000);

    var program = document.getElementById("program").value;
    
    // Consult program
    session.consult(program);
    //console.log(consulta);
    var query = `compu(X,caracteristicas(S,M),buscar('${option.preferencia}', A, P , Z)).`
    //var query = `compu(X,caracteristicas(S,M),buscar('${option.preferencia}', '${option.area}', P ,'${option.procesador}')).`
    //var query = `reca():-compu(X,_,buscar(_,_,_,_)),write(X),write(" ,"),fail.`;
    // Query goal
    //var query = `buscar( '${option.origen}', '${option.destino}' ,  fecha( ${option.fecha.getDate()}, ${option.fecha.getMonth() + 1}, ${option.fecha.getFullYear()} ),  hora(H,M),  ${option.asientos},  P).`;
    session.query(query);
    console.log(query);

    // Find answers
    session.answers(show(), 100);
}

function show() {
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
            var computadora = answer.lookup("X");
            var pantalla = answer.lookup("S");
            var memoria = answer.lookup("M");
            var presupuesto = answer.lookup("P");
            // Imventos de alvaro
            var area = answer.lookup("A");
            var procesador = answer.lookup("Z");
            

            // Show answer
            result.innerHTML = result.innerHTML + `<h1>Computadora recomendada: ${computadora}, ${pantalla}, ${memoria}, ${presupuesto}, ${area},${procesador}</h1>`;
        } else {
            //console.log(pl.type.is_substitution(answer));
            if (!res) {
                result.innerHTML = result.innerHTML + `<div class="d-flex justify-content-center align-items-center" style="width: 100%; height: 100%">
                    <h1>No hay recomendaciones por el momento :( </h1>
                </div>`;
            }
        }
    };
}
