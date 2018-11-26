<template>
  <div id="app">
    <img src="./assets/loader.svg" v-if="loader" class="loader">

    <intro v-else @hide-intro="showFace" v-show="!showFaceComp"></intro>

    <faces v-if="showFaceComp"></faces>
  </div>
</template>
<script>
import Intro from './components/Intro.vue'
import Faces from './components/Faces.vue'

export default {
  name: 'app',
  components: {
    Intro,
    Faces
  },
  beforeMount() {
    this.isReady()
  },
  data() {
    return {
      loader: true,
      showFaceComp: false
    }
  },
  methods: {
    /*recebe do ros o retorno que o robo está pronto*/
    isReady() {
      setTimeout(() => {
        this.loader = false
      }, 1000)
    },
    showFace() {
      this.showFaceComp = true
    }
  }
}
</script>

<style lang="scss">
body,
html,
#app {
  height: 100%;
}
body {
  background-color: #232B29;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  align-items: center;
}
.loader {
  max-width: 500px;
  display: flex;
  height: 100%;
  margin: 0 auto;
}
</style>
