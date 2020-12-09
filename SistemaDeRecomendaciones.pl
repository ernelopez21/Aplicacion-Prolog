%clauses
compu("Asus",caracteristicas(15.6,"500 GB"),buscar("Laptop","Diseño",15000,"Intel")).
compu("Dell",caracteristicas(14,"1000 GB"),buscar("Escritoio","Gaming",25000,"AMD")).
compu("Hp",caracteristicas(20,"1500 GB"),buscar("Escritoio","Oficina",20000,"Intel")).
compu("Acer",caracteristicas(13,"250 GB"),buscar("Laptop","Escuela",10000,"AMD")).
compu("Vaio",caracteristicas(17,"2000 GB"),buscar("Escritorio","Escuela",17000,"Intel")).

rec():-compu(X,_,buscar(_,"Escuela",_,_)),
       write(X),write(" ,"),fail.
recomendacion(Tipo,Area,Precio,Procesador):-compu(X,_,buscar(Tipo,Area,Precio,Procesador)),
       write(X),fail.
