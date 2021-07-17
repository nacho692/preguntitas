// https://stackoverflow.com/questions/46937581/sleep-in-node-js
const sleep = async ms => new Promise(res => setTimeout(res, ms));

// Esta función emula un servidor
const getResource = async (url) => {
  if (url === "/api/first") {
    await sleep(1000);
    return {
      status: 200,
      data: [ "foo1", "foo2" ]
    };
  }
  if (url === "/api/second") {
    await sleep(2000);
    return {
      status: 200,
      data: [ { id: 1, name: "bar1" }, { id: 2, name: "bar2" } ]
    };
  }
  return { status: 404 };
};

Vue.createApp({
  template: `
    <div>
      <section>
        <h2>Primer componente</h2>
        <h5>
          Este componente espera un arreglo de strings y los concatena.
        </h5>
      </section>
      <section v-if="loading">
        <p>Cargando...</p>
      </section>
      <section v-else-if="errorOccurred">
        <p>Ocurrió un error</p>
      </section>
      <section v-else>
        {{ myStrings.join(" - ") }}
      </section>
    </div>
  `,
  data() {
    return {
      loading: true,
      errorOccurred: false,
      myStrings: null,
    };
  },
  async created() {
    const response = await getResource("/api/first")
    if (response.status === 200) {
      Object.assign(this.$data, {
        loading: false,
        errorOccurred: false,
        myStrings: response.data,
      })
    } else {
      Object.assign(this.$data, {
        loading: false,
        errorOccurred: true,
        myStrings: null,
      })
    }
  }
})
.mount('#first');

Vue.createApp({
  template: `
    <div>
      <section>
        <h2>Segundo componente</h2>
        <h5>Este componente espera un arreglo de objetos y presenta cada uno en un párrafo.</h5>
      </section>
      <section v-if="loading">
        <p>Cargando...</p>
      </section>
      <section v-else-if="errorOccurred">
        <p>Ocurrió un error</p>
      </section>
      <section v-else>
        <p
          v-for="({ id, name }, index) in myObjects"
          v-bind:key="index"
        >
          id: {{ id }}; name: {{ name }}
        </p>
      </section>
    </div>
  `,
  data() {
    return {
      loading: true,
      errorOccurred: false,
      myObjects: null,
    };
  },
  async created() {
    const response = await getResource("/api/second")
    if (response.status === 200) {
      Object.assign(this.$data, {
        loading: false,
        errorOccurred: false,
        myObjects: response.data,
      })
    } else {
      Object.assign(this.$data, {
        loading: false,
        errorOccurred: true,
        myObjects: null,
      })
    }
  }
})
.mount('#second');

Vue.createApp({
  template: `
    <div>
      <section>
        <h2>Tercer componente</h2>
        <h5>Este componente espera un arreglo de números y luego los suma, pero va a fallar debido a una url incorrecta.</h5>
      </section>
      <section v-if="loading">
        <p>Cargando...</p>
      </section>
      <section v-else-if="errorOccurred">
        <p>Ocurrió un error</p>
      </section>
      <section v-else>
        {{ myNumbers.reduce((acc, cur) => acc + cur, 0) }}
      </section>
    </div>
  `,
  data() {
    return {
      loading: true,
      errorOccurred: false,
      myNumbers: null,
    };
  },
  async created() {
    const response = await getResource(this.url)
    if (response.status === 200) {
      Object.assign(this.$data, {
        loading: false,
        errorOccurred: false,
        myNumbers: response.data,
      })
    } else {
      Object.assign(this.$data, {
        loading: false,
        errorOccurred: true,
        myNumbers: null,
      })
    }
  }
})
.mount('#third');
