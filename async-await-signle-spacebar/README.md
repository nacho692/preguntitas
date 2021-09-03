# async-await-signle-spacebar

Me surgió tener que detectar una única vez el apretado de la barra de espacio. 
En general se usa [`EventTarget.addEventListener`](
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters
) para detectar eventos e idealmente usaría el parámetro `once`.  
Los dramas son que:
- el mismo evento se llama para cualquier tecla que uno apriete
- la detección de qué tecla se apretó se hace dentro del handler

por lo que no puedo usar directamente `once`.

---

Lo más prolijo es arreglárselas para borrar el evento que se agrega para
adetectar el evento 'keydown'. Como la detección de la barra de espacio se hace
dentro del handler, hay que borrar el handler desde adentro.

Tmb pasa que hay que [usar named functions](
https://stackoverflow.com/a/4402359/2923526) para poder pasar la función a
`removeEventListener`.
