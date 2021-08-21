import { createApp } from 'vue'

createApp({
  template: `
    <div>
      <div>
        <h2>Números recibidos</h2>
        {{ receivedNumbers }}
        <ul>
          <li v-for="n in receivedNumbers">{{ n }}</li>
        </ul>
      </div>
    </div>
  `,
  data() {
    return {
      receivedNumbers: [1,2,3],
      numberRequestIsOpen: false,
    }
  },
}).mount('#requester-component');
