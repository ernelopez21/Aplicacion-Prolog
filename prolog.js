document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault()

    // $('#Buscar').addClass("hidden");
    // $('#Reservar').removeClass("hidden");

    // $('#nav-2').addClass("active-nav");
    // $('#nav-1').removeClass("active-nav");

    var preferencia = ($('input:radio[name=preferencia]:checked').val());
    var area = document.getElementById('area').value;
    var presupuesto = document.getElementById('presupuesto').value;
    var procesador = document.getElementById('procesador').value;
    console.log(procesador);

    // fecha = new Date(fecha);

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
    
    // Consult program
    session.consult(flights);

    // Query goal
    var query = `buscar( '${option.origen}', '${option.destino}' ,  fecha( ${option.fecha.getDate()}, ${option.fecha.getMonth() + 1}, ${option.fecha.getFullYear()} ),  hora(H,M),  ${option.asientos},  P).`;
    session.query(query);

    // Find answers
    session.answers(show(option), 1000);
}