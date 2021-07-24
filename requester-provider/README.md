# requester-provider

Interacciones entre usuarios actualizadas en tiempo real.
Una excusa para jugar con web sockets y reactividad.

## Motivación

Ahora las páginas andan llenas de Javascript pero sigue siendo necesario
recargar la página (o esperar 15 segundos!) para enterarnos que nuestro
compañero tocó el botón que tenía que tocar.  
Impresentable, inaudito.

En este directorio busco jugar un poco con comunicaión bidireccional entre
servidor y clientes.
Voy a ustar usando web sockets y en particular la implementación de la librería
[socket.io](https://socket.io/).
La parte reactiva será con [vuejs](https://vuejs.org/) y si me pongo fancy voy a
usar [semantic-ui](https://semantic-ui.com/) para el maquetado.

El sistema para ilustrar todo esto va a ser bien sencillo: un requester que pide
un número a un provider.
Mientra el requester no pida el número, el provider verá un mensaje indicando
que se está esperando el pedido.
Similarmente, una vez hecho pedido el requester tendrá que esperar a que el
número sea provisto.

## Solución

La fase core inicial de la implementación propuesta va a incluir lo lógica
mínima necesaria para lograr la comunicación entre ambos usuarios.
En fases subsiguientes estaré embelleciendo la solución, ya sea a nivel UI o a
nivel código.