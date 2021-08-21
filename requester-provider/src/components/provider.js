import { createApp } from 'vue'

const socket = io();
socket.on("connect", () => {
  socket.send('llegó el proveedor')   
})
socket.on("bienvenido", d => console.log(d))
socket.on('message', console.log)

createApp({
  template: `
    <div>
      <div>
        <h2>Números provistos</h2>
        {{ providedNumbers }}
        <ul>
          <li v-for="n in providedNumbers">{{ n }}</li>
        </ul>
      </div>
      <form v-if="numberRequestIsOpen" action="/number-provision" method="POST">
        <input type="number" name="number">
        <input value="Submit" type="submit">
      </form>
      <p v-else>
        Por ahora no hay pedidos abiertos
      </p>
    </div>
  `,
  data() {
    return {
      providedNumbers: [1,2,3],
      numberRequestIsOpen: false,
    }
  },
  mounted() {
    socket.on('number-requested', () => Object.assign(this.$data, { numberRequestIsOpen: true }))
  }
}).mount('#provider-component');
