import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    timeIntro: 1000,
    timeShownBrand: 10000,
    timeNoAction: 1000,
    faces: [
      {
          id: 1,
          path: 'face_awake.svg',
          emotion: 'awake',
          state: 'Ready',
          speech: 'Hi user!'
      },
      {
          id: 2,
          path: 'face_big_smile.svg',
          emotion: 'Very happy',
          state: 'Sucess',
          speech: 'Done!'
      },
      {
          id: 3,
          path: 'face_confirmation_input.svg',
          emotion: 'I understood',
          state: 'Ready',
          speech: 'Ok!'
      },
      {
          id: 4,
          path: 'face_confused.svg',
          emotion: 'Deception',
          state: 'Error',
          speech: 'Could you repeat please?'
      },
      {
          id: 5,
          path: 'face_little_smile.svg',
          emotion: 'Deception',
          state: 'In action',
          speech: false
      },
      {
          id: 6,
          path: 'face_neutral.svg',
          emotion: 'Neutral',
          state: false,
          speech: false
      },
      {
          id: 7,
          path: 'face_smile.svg',
          emotion: 'Happy',
          state: 'Stand bye',
          speech: 'OK! IF YOU WANT SOMETHING, CALL MY NAME... TETA'
      },
      {
          id: 8,
          path: 'face_snooze.svg',
          emotion: 'Snooze',
          state: 'Stand bye',
          speech: 'SNOOZE NOISE'
      },
      {
        id: 9,
        path: 'marca_teta.svg',
        emotion: 'Brand',
        state: 'Started',
        speech: 'GOOD DAY USER!'
      },
      {
        id: 10,
        path: 'face_smile.svg',
        emotion: 'Happy',
        state: 'Stand bye',
        speech: 'I AM READY! WHAT DO YOU WANT'
    },
    ],
    currentFace: 1
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
