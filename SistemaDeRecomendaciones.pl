%clauses
compu('Asus',caracteristicas(15.6,'500 GB'),buscar('Laptop','Diseño',15000,'Intel')).
compu('Dell',caracteristicas(14,'1000 GB'),buscar('Escritorio','Gaming',25000,'AMD')).
compu('Hp',caracteristicas(20,'1500 GB'),buscar('Escritorio','Oficina',20000,'Intel')).
compu('Acer',caracteristicas(13,'250 GB'),buscar('Laptop','Escuela',10000,'AMD')).
compu('Vaio',caracteristicas(17,'2000 GB'),buscar('Escritorio','Escuela',17000,'Intel')).
recomendacion(buscar(Tipo,Area,Precio,Procesador)):-compu(X,caracteristicas(P,G),buscar(Tipo,Area,Precio,Procesador)).
