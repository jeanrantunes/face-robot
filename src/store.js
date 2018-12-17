import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: 'Teta',
    timeIntro: 3000,
    timeShownBrand: 3000,
    timeNoAction: 1000,
    faces: [
      {
        id: 1,
        path: '09_quiet.gif',
        emotion: 'awake',
        state: 'Ready',
        speech: 'Hi user!'
      },
      {
        id: 2,
        path: '07_smile.gif',
        emotion: 'Very happy',
        state: 'Sucess',
        speech: 'Done!'
      },
      {
        id: 3,
        path: '06_ok.gif',
        emotion: 'Ready',
        state: 'Ready',
        speech: 'Ok!'
      },
      {
        id: 4,
        path: '08_sad.gif',
        emotion: 'Deception',
        state: 'Error',
        speech: 'Could you repeat please?'
      },
      {
        id: 5,
        path: '01_happy.gif',
        emotion: 'Happy',
        state: 'In action',
        speech: ''
      },
      {
        id: 6,
        path: '02_neutral.gif',
        emotion: 'Neutral',
        state: false,
        speech: ''
      },
      {
        id: 7,
        path: '01_happy.gif',
        emotion: 'Happy',
        state: 'Stand bye',
        speech: 'OK! IF YOU WANT SOMETHING, ASK ME...'
      },
      {
        id: 8,
        path: '04_deepsleep.gif',
        emotion: 'Snooze',
        state: 'Stand bye',
        speech: 'SNOOZE NOISE'
      },
      {
        id: 9,
        path: '00_splash.gif',
        emotion: 'Brand',
        state: 'Started',
        speech: 'GOOD DAY USER!'
      },
      {
        id: 10,
        path: '01_happy.gif',
        emotion: 'Happy',
        state: 'Stand bye',
        speech: 'I AM READY! WHAT DO YOU WANT'
      },
      {
        id: 11,
        path: '01_happy.gif',
        emotion: 'Happy',
        state: 'I understood',
        speech: 'I understood'
      },
      {
        id: 12,
        path: '07_smile.gif',
        emotion: 'Very happy',
        state: 'Sucess',
        speech: 'LETS DO IT!!'
      },
      {
        id: 13,
        path: '05_curious.gif',
        emotion: 'awake',
        state: 'Finished',
        speech: 'DO YOU WANT ANYTHING ELSE?'
      },
    ],
    lang: 'en-US',
    commands: ['go ahead', 'turn left', 'turn right', 'teta', 'follow me', 'stop'],
  },
  getters: {
    getFace: state => id => {
      return state.faces.find(item => item.id === id)
    }
  },
  mutations: {
    
  },
  actions: {

  }
})
