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

### Core

Todos los cables estos para comunicación bidireccional picantean la
escalabilidad del código.
Si se usan a lo largo de toda la aplicación habría que ver si se pueden abstraer
todos estos enchufes.
No es que la comunicación unidireccional sea sencilla tampoco.
Pero que sea para ambos lados agrega una vuelta de tuerca menos común.
Parece entonces conveniente limitar el uso de comunicación bidireccional a los
flujos `servidor -> cliente`, dejando los flujos `cliente -> servidor` armados
con requests http comunes.

No me queda claro cómo conviene configurar webpack.
Me surgen dudas de cómo minimizar el tamaño de los bundles o de cómo dividir
los módulos.
Cómo funciona el cache del browser?  
Hacía qué directorio conviene mandar los archivos?
Buildeo sólo los js o tmb las imágenes como parece ser comentado en la docu?

