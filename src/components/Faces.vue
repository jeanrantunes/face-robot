<template>
    <div class="face">
        <img :src="image" alt="">
    </div>
</template>
<script>
const lang = 'en-US'
export default {
    name: 'Faces',
    beforeMount() {
        /*primeira face a ser mostrada: marca do robo*/
        this.face = this.$store.getters.getFace(9)
        
        
    },
    data() {
        return {
            face: {}
        }
    },
    mounted() {
        this.spoke(this.$store.state.timeShownBrand)

        this.spoke(this.$store.state.timeNoAction, 10)
        
        

        // const self = this
        // async function speakBrand() {
        //     const ret = await self.textToSpeech()
        //     if(!ret) {
        //         return false
        //     }
        //     setTimeout(() => {
        //         /*executa após mostrar a marca pelo tempo determinado no store*/
        //         self.face = self.$store.getters.getFace(10)
        //             async function speakReady() {
        //                 const ret = await self.textToSpeech()
        //                 if(!ret) {
        //                     return false
        //                 }
        //                 setTimeout(() => {
        //                     this.face = this.$store.getters.getFace(7)

        //                 }, self.$store.state.timeNoAction)
        //             }
        //             speakReady()
        //     }, self.$store.state.timeShownBrand)
        // }
        // speakBrand()
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
                if (!('speechSynthesis' in window)) {
                    alert('Sem suporte a fala!')
                    return false
                }

                if (!this.face.speech) {
                    return false
                }
                let voices = window.speechSynthesis.getVoices();
                let msg = new SpeechSynthesisUtterance();
                /* google voice male */
                msg.voice = voices[50];
                
                /*terminou a fala*/
                msg.onend = () => {
                    console.log(time)
                    resolve(true)
                }
                if (time && f) {
                    setTimeout(() => {
                        this.face = this.$store.getters.getFace(f)
                        speechSynthesis.speak(msg)
                        msg.text = this.face.speech;
                    }, time)
                } else {
                    msg.text = this.face.speech;
                    speechSynthesis.speak(msg)
                }
                
            })
        },
        async spoke(time, f) {
            const ret = await this.textToSpeech(time, f)
            if(!ret) {
                return false
            }
            return true
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

