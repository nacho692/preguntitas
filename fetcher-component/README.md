# fetcher-component

o cómo reutilizar lógica de data fetching

## Motivación

En en contexto de reactividad, un patrón encontrado hace un tiempo sugería
dividir en distintos componentes la presentación de la data de su búsqueda al
servidor.  
Si tuviera el artículo en cuestión a mano lo linkearía y no me refiero a los
[`React.PureComponent`s](https://stackoverflow.com/questions/41340697/react-component-vs-react-purecomponent).
Sería algo así como tener por un lado un `MyStatefulComponent` y un
`MyPureComponent` por el otro.
El primero se encarga de realizar los pedidos necesarios al servidor y además de
mostrar los correspondientes mensajes de error u odiosos spinner de que la data
está cargando.
También sería responsabilidad suya actualizar la data si correspondiera.
El segundo se encarga únicamente de presentar la data en cuestión sin nunca
modificarla.

Ahora, si aplicamos este patrón a múltiples componentes vamos a terminar con esa
misma cantidad de componentes que esencialmente hacen lo mismo:
dada la URL del recurso que tienen que mostrar, pedir tal recurso y pasarlo al 
componente hijo que presenta la data;
si el fetch falla, mostrar un mensaje y si hay que actualizar, actualizar.
