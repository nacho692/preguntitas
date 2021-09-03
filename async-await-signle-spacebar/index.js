const main = async () => {

  let counter = 0;
  document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
      counter++;
      document.getElementById('contador').innerHTML = counter === 1
        ? '1 vez'
        : `${counter} veces`
    }
  })

  const handlerResolvedWith = (res) => {
    function handler(e) {
      if (e.code === "Space") {
        document.removeEventListener('keydown', handler)
        res()
      }
    }
    return handler
  }

  await new Promise((res) => {
    document.addEventListener('keydown', handlerResolvedWith(res))
  })

  document.getElementById(
    'container-single'
  ).innerHTML = 'Presionaste la barra de espacio'
}

main().catch(console.error)
