<template>
    <div class="face" v-if="face.id">
        <img :src="image" alt="">
        <!-- <h1 v-if="face.id == 9">{{ this.$store.state.name }}</h1> -->
    </div>
</template>
<script>
import ROSLIB from 'roslib';
import EventEmitter2 from 'eventemitter2'

export default {
    name: "Faces",
    beforeMount() {
        /*verifica se possui suporte a fala*/
        if (!("speechSynthesis" in window)) {
            alert("Sem suporte a fala!")
            return false
        }

        /*verifica se possui suporte ao reconhecimento de voz*/
        if (!window.webkitSpeechRecognition) {
            alert("Sem suporte ao reconhecimento de voz!")
            return false
        }

        this.voices = window.speechSynthesis.getVoices();
        this.msg = new SpeechSynthesisUtterance();
        this.msg.lang = this.$store.state.lang;
        // /* google voice male */
        // this.msg.voice = this.voices[50];

        /*reconhecimento de voz*/
        const SpeechRecognition =
        SpeechRecognition || window.webkitSpeechRecognition
        const SpeechGrammarList =
        SpeechGrammarList || window.webkitSpeechGrammarList
        this.recognition = new SpeechRecognition()
        this.speechRecognitionList = new SpeechGrammarList()

        this.speechRecognitionList.addFromString(this.grammar)
        this.recognition.grammar = this.speechRecognitionList
        this.recognition.lang = this.$store.state.lang
        this.recognition.continuous = true
        this.recognition.interimResults = false

        /*primeira face a ser mostrada: marca do robo*/
        this.face = this.$store.getters.getFace(9)

        window.EventEmitter2 = EventEmitter2.EventEmitter2

        var ros = new ROSLIB.Ros({
            url : 'ws://127.0.0.1:9090'
        })

        ros.on('connection', function(){
            console.log('Connected to websocket server.')
        })

        ros.on('error', function(error){
            console.log('Error connecting to websocket server: ', error)
        })

        this.topicRos = new ROSLIB.Topic({
            ros : ros,
            name : '/walk',
            messageType : 'std_msgs/String'
        })

        const strin = new ROSLIB.Message({
            data : 'theta'
        });

        this.topicRos.publish(strin);

        this.topicRos.subscribe(function(message){
            console.log('Received message on' + this.topicRos.name + ': ' + message.data);
            //testStr.unsubscribe();
        });
    },
    data() {
        return {
            face: {},
            voices: [],
            msg: {},
            recognition: {},
            speechRecognitionList: {},
            grammar: `#JSGF V1.0; grammar robot; public <robot> = ${this.$store.state.commands.join(
                " | "
            )} ;`,
            startTime: 0,
            timeout: 0,
            topicRos: {}
        };
    },
    watch: {
        startTime: {
            handler(val) {
                if(val > 0) {
                    const self = this
                    // console.log(self.startTime)
                    // setTimeout(() => {
                    //     /* mais de 10 segundo sem falar*/
                    //     if ((new Date().getTime() - new Date(self.startTime)) / 1000 > 10) {
                    //         self.recognition.stop()
                    //         self.textToSpeech(2000, 7).then(() => {
                    //             /*neutro*/
                    //             self.textToSpeech(3000, 6).then(() => {
                    //                 /*dorme*/
                    //                 self.textToSpeech(3000, 8).then(() => {
                    //                     self.startTime = 0
                    //                     self.recognition.start()
                    //                 })
                    //             })
                    //         })
                    //     }
                    // }, 10000)
                }
            }
        }
    },
    mounted() {
        /*show brand*/
        const self = this;
        this.textToSpeech(this.$store.state.timeShownBrand, 9).then(() => {
            /*show face ready*/
            this.textToSpeech(this.$store.state.timeNoAction, 10).then(() => {
                self.recognition.start()
                self.startTime = new Date().getTime()
            })
        })
        
        /* callback resultado do reconhecimento de voz*/
        this.recognition.onresult = function(event) {
            let last = event.results.length - 1
            let command = event.results[last][0].transcript
            self.startTime = new Date().getTime()
            //window.speechSynthesis.cancel()
            //console.log(command)
            if (command) {
                //clearTimeout(this.timeout)
                
                self.callAction(
                    self.$store.state.commands.find(cm => {
                        return command.includes(cm)
                    })
                )
                return
            }
        }
        
        /* ao falar, para de escutar*/
        this.msg.addEventListener('start', function () {
            //self.recognition.stop()
        })

        /* quando para de falar, volta a escutar escutar*/
        this.msg.addEventListener('end', function () {
            //self.recognition.start()
        })

    },
    computed: {
        image() {
            return require("../assets/faces/" + this.face.path);
        }
    },
    methods: {
        /*fala da face*/
        textToSpeech(time, f) {
            return new Promise(resolve => {
                /*terminou a fala*/
                this.msg.onend = () => {
                if (time) {
                    this.timeout = setTimeout(() => {
                        resolve(true)
                    }, time)
                } else {
                    resolve(true)
                }
                };
                if (f) {
                    this.face = this.$store.getters.getFace(f)
                }
                if (!this.face.speech) {
                    if (time) {
                        this.timeout = setTimeout(() => {
                            resolve(false)
                        }, time)
                    } else {
                    resolve(false)
                    }
                }
                this.msg.text = this.face.speech
                speechSynthesis.speak(this.msg)
            });
        },

        callAction(command) {
            /*evita q ele se ouça*/
            //this.recognition.stop();
            const self = this
            this.recognition.stop()

            if (command == "stop") {
                const str = new ROSLIB.Message({
                    data : command
                })
                this.topicRos.publish(str)
                return false
            }

            if (!command) {
                /*não entendeu*/
                this.textToSpeech(undefined, 4).then(() => {
                    this.recognition.start();
                    return false
                })
                return false
            }
            /*entendi*/
            
            self.startTime = new Date().getTime()
            
            
            self.textToSpeech(2000, 11).then(() => {
                /*fazer a ação*/
                /*para de ouvir para realizar a acao*/
                self.textToSpeech(2000, 12).then(() => {
                    /*da o comando para o ROS*/
                    self.startTime = new Date().getTime()
                    var strin = new ROSLIB.Message({
                        data : command
                    })
                    self.topicRos.publish(strin);
                    /*durante a acao*/
                    self.textToSpeech(3000, 5).then(() => {
                        /*quando a ação é concluida. 
                        Deve ter alguma callback do ros confirmando a ação*/
                        self.startTime = new Date().getTime()
                        self.textToSpeech(2000, 2).then(() => {
                            /*acao terminada, mais alguma coisa?*/
                            //self.recognition.start()
                            /*tempo de espera*/
                            //self.startTime = new Date().getTime()
                            self.startTime = new Date().getTime()
                            self.recognition.start()
                            // self.textToSpeech(2000, 13).then(() => {
                                    
                            // })
                        })
                    })
                })
            })
        }
    }
};
</script>
<style lang="scss" scoped>
h1 {
  position: absolute;
  width: 100%;
  bottom: 0;
}
.face {
  height: 100%;
  flex-flow: row;
  display: flex;
  img {
    display: flex;
    max-width: 600px;
    max-height: 600px;
    width: auto;
    height: auto;
    margin: 30px auto;
    align-self: center;
  }
}
</style>

