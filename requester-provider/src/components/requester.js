import { createApp } from 'vue'

const socket = io();
socket.on("connect", () => {
  socket.send('llegó el requester')   
})
socket.on("bienvenido", console.log)
socket.on('message', console.log)

createApp({
  template: `
    <div>
      <div v-if="receivedNumbers.length > 0">
        Números recibidos:
        <ul>
          <li v-for="n in receivedNumbers">{{ n }}</li>
        </ul>
      </div>
      <p v-else>
        Todavía no llego ningún número
      </p>

      <form v-if="!numberRequestIsOpen" @submit="submitNumberRequest">
        <input value="Pedir un número" type="submit">
      </form>
      <p v-else>
        Ya hay un pedido de número abierto
      </p>
    </div>
  `,
  data() {
    return {
      receivedNumbers: [],
      numberRequestIsOpen: false,
    }
  },
  mounted() {
    socket.on('number-provided', (number) => Object.assign(this.$data, {
      receivedNumbers: [ ...this.receivedNumbers, number ],
      numberRequestIsOpen: false,
    }))
  },
  methods: {
    async submitNumberRequest(e) {
      e.preventDefault()
      try {
        const res = await fetch(`${window.location.origin}/number-request`, {
          method: 'POST'
        })
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        Object.assign(this.$data, { numberRequestIsOpen: true })
      } catch (e) {
        console.error(e)
      }
    },
  },
}).mount('#requester-component');
