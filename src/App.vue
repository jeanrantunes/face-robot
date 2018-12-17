<template>
  <div id="app">
    <div v-if="btnStart" class="container-button">
      <button class="btn-start" @click="start">Start</button>
    </div>
    
    <div class="content" v-else>
      <img src="./assets/00_loading.gif" v-if="loader" class="loader">

      <intro v-else @hide-intro="showFace" v-show="!showFaceComp"></intro>

      <faces v-if="showFaceComp"></faces>
    </div>

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
  data() {
    return {
      loader: true,
      btnStart: true,
      showFaceComp: false
    }
  },
  methods: {
    /*recebe do ros o retorno que o robo está pronto*/
    isReady() {
      setTimeout(() => {
        this.loader = false
      }, 4000)
    },
    showFace() {
      this.showFaceComp = true
    },
    start() {
      this.openFullscreen(document.querySelector('body'))
      this.btnStart = false
      this.isReady()
    },
    openFullscreen(elem) {
      if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      } else if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }  
    }
  }
}
</script>

<style lang="scss">

body,
html,
#app,
.content {
  height: 100%;
}
body,
:not(:root):-webkit-full-screen::backdrop {
  background-color: #282721 !important;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  align-items: center;
}
.content {
  display: flex;
  align-self: center;
  flex-flow: column;
  justify-content: center;
}
.loader {
  max-width: 300px;
  max-height: 300px;
  width: auto;
  height: auto;
  display: flex;
  height: 100%;
  margin: 0 auto;
}
.container-button {
  display: flex;
  height: 100%;
  align-self: center;
  justify-content: center;
  flex-flow: column;
}
.btn-start {
  display: inline-block;
  font-size: 30px;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  color: #282721;
  background-color: #FFE433;
  box-shadow: 0 9px #999;
  margin: 0 auto;
  &:hover,
  &:focus {
    outline: none;
  }
  &:active {
    background-color: #FFE433;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
}
</style>
