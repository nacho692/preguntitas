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

const fetcherComponent = {
  template: `
    <div>
      <section>
        <h2>{{ title }}</h2>
        <h5>{{ description }}</h5>
      </section>
      <section v-if="loading">
        <p>Cargando...</p>
      </section>
      <section v-else-if="errorOccurred">
        <p>Ocurrió un error</p>
      </section>
      <section v-else>
        <slot :data="fetchedData" />
      </section>
    </div>
  `,
  props: ["title", "description", "url"],
  data() {
    return {
      loading: true,
      errorOccurred: false,
      fetchedData: null,
    };
  },
  async created() {
    const response = await getResource(this.url)
    if (response.status === 200) {
      Object.assign(this.$data, {
        loading: false,
        errorOccurred: false,
        fetchedData: response.data,
      })
    } else {
      Object.assign(this.$data, {
        loading: false,
        errorOccurred: true,
        fetchedData: null,
      })
    }
  }
}

Vue.createApp({
  template: `
    <fetcher
      title="Primer componente"
      description="Este componente espera un arreglo de strings y los concatena."
      url="/api/first"
      v-slot="myStrings"
    >
      {{ myStrings.data.join(" - ") }}
    </fetcher>
  `,
})
.component('fetcher', fetcherComponent)
.mount('#first');

Vue.createApp({
  template: `
    <fetcher
      title="Segundo componente"
      description="Este componente espera un arreglo de objetos y presenta cada uno en un párrafo."
      url="/api/second"
      v-slot="myObjects"
    >
      <p
        v-for="({ id, name }, index) in myObjects.data"
        v-bind:key="index"
      >
        id: {{ id }}; name: {{ name }}
      </p>
    </fetcher>
  `,
})
.component('fetcher', fetcherComponent)
.mount('#second');

Vue.createApp({
  template: `
    <fetcher
      title="Tercer componente"
      description="Este componente espera un arreglo de números y luego los suma, pero va a fallar debido a una url incorrecta."
      url="/api/third"
      v-slot="myNumbers"
    >
      {{ myNumbers.data.reduce((acc, cur) => acc + cur, 0) }}
    </fetcher>
  `,
})
.component('fetcher', fetcherComponent)
.mount('#third');
