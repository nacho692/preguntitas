import { createApp } from 'vue'

const socket = io();
socket.on("connect", () => {
  socket.send('llegó el requester')   
})

createApp({
  template: `
    <div>
      Números recibidos:
      {{ receivedNumbers }}
      <ul>
        <li v-for="n in receivedNumbers">{{ n }}</li>
      </ul>
      <form v-if="!numberRequestIsOpen" id="my-form" action="#" v-on:submit="submitNumber">
        <input value="Pedir un número" type="submit">
      </form>
      <p v-else>
        Ya hay un pedido de número abierto
      </p>
    </div>
  `,
  data() {
    return {
      receivedNumbers: [1,2,3],
      numberRequestIsOpen: false,
    }
  },
  methods: {
    async submitNumber() {
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
      return true
    }
  }
}).mount('#requester-component');
