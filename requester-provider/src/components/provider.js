import { createApp } from 'vue'

const socket = io();
socket.on("connect", () => {
  socket.send('llegó el proveedor')   
})
socket.on("bienvenido", console.log)
socket.on('message', console.log)

createApp({
  template: `
    <div>
      <div v-if="providedNumbers.length > 0">
        Números provistos:
        <ul>
          <li v-for="n in providedNumbers">{{ n }}</li>
        </ul>
      </div>
      <p v-else>
        Todavía no enviaste ningún número
      </p>

      <form v-if="numberRequestIsOpen" id="my-form" @submit="submitNumber">
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
      providedNumbers: [],
      numberRequestIsOpen: false,
    }
  },
  mounted() {
    socket.on('number-requested', () => Object.assign(this.$data, {
      numberRequestIsOpen: true
    }))
  },
  methods: {
    async submitNumber(e) {
      e.preventDefault()
      try {
        const form = document.getElementById('my-form')
        let number;
        form.childNodes.forEach(e => {
          if (e.name === 'number') {
            number = parseInt(e.value)
          }
        })
        const res = await fetch(`${window.location.origin}/number-provision`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ number }),
        })
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        Object.assign(this.$data, {
          numberRequestIsOpen: false,
          providedNumbers: [ ...this.providedNumbers, number ],
        })
        form.reset()
      } catch (e) {
        console.error(e)
      }
    },
  },
}).mount('#provider-component');
