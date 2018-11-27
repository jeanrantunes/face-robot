<template>
    <div class="face" v-if="face.id">
        <img :src="image" alt="">
    </div>
</template>
<script>

export default {
    name: 'Faces',
    beforeMount() {
        /*verifica se possui suporte a fala*/
        if (!('speechSynthesis' in window)) {
            alert('Sem suporte a fala!')
            return false
        }

        /*verifica se possui suporte ao reconhecimento de voz*/
        if (!window.webkitSpeechRecognition) {
            alert('Sem suporte ao reconhecimento de voz!')
            return false
        }
        
        this.voices = window.speechSynthesis.getVoices();
        this.msg = new SpeechSynthesisUtterance();
        this.msg.lang = this.$store.state.lang
        // /* google voice male */
        // this.msg.voice = this.voices[50];

        /*reconhecimento de voz*/
        const SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition
        const SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
        this.recognition = new SpeechRecognition()
        this.speechRecognitionList = new SpeechGrammarList()
    
        this.speechRecognitionList.addFromString(this.grammar)
        this.recognition.grammar = this.speechRecognitionList
        this.recognition.lang = this.$store.state.lang
        this.recognition.continuous = true
        this.recognition.interimResults = false

        this.recognition.onerror = function() {
            
        }
        /*primeira face a ser mostrada: marca do robo*/
        this.face = this.$store.getters.getFace(9)
    },
    data() {
        return {
            face: {},
            voices: [],
            msg: {},
            recognition: {},
            speechRecognitionList: {},
            grammar: `#JSGF V1.0; grammar robot; public <robot> = ${this.$store.state.commands.join(' | ')} ;`
        }
    },
    mounted() {
        /*show brand*/
        const self = this
        this.spoke(this.$store.state.timeShownBrand, 9).then(() => {
            /*show face ready*/
            this.spoke(this.$store.state.timeNoAction, 10).then(() => {
                self.recognition.start()
            })
        })

        this.recognition.onresult = function(event) {
            let last = event.results.length - 1;
            let command = event.results[last][0].transcript
            self.callAction(self.$store.state.commands.find(cm => {
                return command.includes(cm)
            }))
           // self.recognition.start()
        }
    },
    computed: {
        image() {
            return require('../assets/faces/'+this.face.path)
        }
    },
    methods: {
        /*fala da face*/
        textToSpeech(time, f) {
            return new Promise(resolve => {
                /*terminou a fala*/
                this.msg.onend = () => {
                    if (time) {
                        setTimeout(() => {
                            resolve(true)
                        }, time)   
                    } else {
                        resolve(true)
                    }
                }
                if (f) {
                    this.face = this.$store.getters.getFace(f)
                }
                if(!this.face.speech) {
                    if (time) {
                        setTimeout(() => {
                            resolve(false)
                        }, time)   
                    } else {
                        resolve(false)
                    }
                }
                this.msg.text = this.face.speech
                speechSynthesis.speak(this.msg)
            })
        },

        async spoke(time, f) {
            const ret = await this.textToSpeech(time, f)
            if(!ret) {
                return false
            }
            return true
        },
        
        callAction(command) {
            /*evita q ele se ouça*/
            this.recognition.stop()
            if(!command) {
                /*não entendeu*/
                this.textToSpeech(undefined, 4).then(() => {
                    this.recognition.start()
                    return false
                })
                return false
            }
            /*entendi*/
            const self = this
            self.textToSpeech(2000, 11).then(()=> {
                /*fazer a ação*/
                /*para de ouvir para realizar a acao*/
                
                self.textToSpeech(2000, 12).then(()=> {    
                    /*da o comando para o ROS*/
                    /*durante a acao*/
                    self.textToSpeech(3000, 5).then(() => {
                        /*quando a ação é concluida. 
                        Deve ter alguma calback do ros confirmando a ação*/
                        self.textToSpeech(3000, 2).then(() => {
                            /*acao terminada, mais alguma coisa?*/
                            
                            /*tempo de espera*/
                            self.textToSpeech(2000, 13).then(() => {
                                self.textToSpeech(3000, 7).then(() => {
                                    /*neutro*/
                                    self.textToSpeech(3000, 6).then(() => {
                                        /*dorme*/
                                        self.textToSpeech(3000, 8).then(() => {
                                            this.recognition.start()
                                        }) 
                                    }) 
                                })    
                            })
                        })
                    })
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.face {
    height: 100%;
    flex-flow: row;
    display: flex;
    img {
        display: flex;
        width: 50vw;
        margin: 30px auto;
    }
}
</style>

