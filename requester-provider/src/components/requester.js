import Vue from 'vue'

Vue.createApp({
  template: `
    <div>
      <h1>Requester</h1>
      <div>
        <h2>Números recibidos</h2>
        <ul>
          <li v-for="n in receivedNumbers">n</li>
        </ul>
      </div>
      <button 
    </div>
  `,
  data() {
    return {
      receivedNumbers: [1,2,3],
      numberRequestIsOpen: false,
    }
  },
})

export default 'requester'
