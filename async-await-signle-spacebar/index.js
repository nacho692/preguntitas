const forSingleSpaceBarOn = async (eventTarget) => {
  const handlerResolvedWith = (res) => {
    function handler(e) {
      if (e.code === "Space") {
        eventTarget.removeEventListener('keydown', handler)
        res()
      }
    }
    return handler
  }
  await new Promise((res) => {
    eventTarget.addEventListener('keydown', handlerResolvedWith(res))
  })
}

const singleEvent = async () => {
  await forSingleSpaceBarOn(document)

  document.getElementById(
    'container-single'
  ).innerHTML = 'Presionaste la barra de espacio'
}

const continousEvent = () => {
  let counter = 0;
  document.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
      counter++;
      document.getElementById('contador').innerHTML = counter === 1
        ? '1 vez'
        : `${counter} veces`
    }
  })
}

const main = async () => {
  await Promise.all([
    singleEvent(),
    continousEvent(),
  ])
}

main().catch(console.error)
