# async-await-signle-spacebar

Me surgió tener que detectar una única vez el apretado de la barra de espacio. 
En general se usa [`EventTarget.addEventListener`](
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters
) para detectar eventos e idealmente usaría el parámetro `once`.  
Los dramas son que:
- el mismo evento se llama para cualquier tecla que uno apriete
- la detección de qué tecla se apretó se hace dentro del handler

por lo que no puedo usar directamente `once`.
