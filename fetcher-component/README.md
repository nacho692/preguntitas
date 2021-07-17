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

## Solución

No sorpresivamente, la solución propuesta es abstraer la lógica de fetching en
un único componente.
Para esto usamos los
[scoped slots](https://v3.vuejs.org/guide/component-slots.html#scoped-slots)
de vue.
En [`index.js`](index.js) y su diff de commits puede verse el detalle del cambio
necesario.
Esencialmente el componente padre se encarga de pedir la data
```javascript
async created() {
  const response = await getResource(this.url)
  if (response.status === 200) {
    Object.assign(this.$data, {
      loading: false,
      errorOccurred: false,
      fetchedData: response.data,
    })
  } else {
    Object.assign(this.$data, {
      loading: false,
      errorOccurred: true,
      fetchedData: null,
    })
  }
}
```
y mostrar lo relacionado al fetching:
```html
<div>
  <section>
    <h2>{{ title }}</h2>
    <h5>{{ description }}</h5>
  </section>
  <section v-if="loading">
    <p>Cargando...</p>
  </section>
  <section v-else-if="errorOccurred">
    <p>Ocurrió un error</p>
  </section>
  <section v-else>
    <slot :data="fetchedData" />
  </section>
</div>
```
mientras que los componentes hijos implementan la presentación:
```html
<fetcher
  title="Primer componente"
  description="Este componente espera un arreglo de strings y los concatena."
  url="/api/first"
  v-slot="myStrings"
>
  {{ myStrings.data.join(" - ") }}
</fetcher>
```

## Consideraciones

La solución propuesta se queda corta por algunas razones:
- Además del fetch de la data, el componente `fetcher` está encargándose de
mostrar el título y la descripción del componente hijo.
Idealmente debería haber un tercer componente que se encargue de eso.
- Esta solución asume que la data buscada en cada componente hijo se utiliza
únicamente en ese componente.
Es decir, asume que no hay otros lugares en la aplicación en los cuales se
utilice el mismo recurso pero tal que se lo presente de una manera distinta.
Esto es sin embargo común en SPAs, por lo que da para ver como se extiende esta
idea en tales casos y en particular con el uso de stores como redux o vuex.
- Tampoco exploré el tema de la actualización de la data.
En seguida surgen varias preguntas respecto de qué componentes deben encargarse
de realizar los pedidos de modificaciones, de cómo debe enterarse el componente
padre que debe realizar una actualización o de cómo debe realizarse tal
actualización.
