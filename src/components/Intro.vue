<template>
    <div class="logos">
        <img src="../assets/logos/logo-ufpel.svg" alt="">
        <img src="../assets/logos/logo-ifsul.svg" alt="">
        <img src="../assets/logos/logo-cyphy.svg" alt="">
        <img src="../assets/logos/logo-freedom.svg" alt="">
    </div>
</template>
<script>


export default {
    name: 'Intro',
    mounted() {
        setTimeout(() => {
            this.$emit('hide-intro')
        }, this.$store.state.timeIntro)
    },
}
</script>
<style lang="scss" scoped>
.logos {
    height: 100%;
    flex-flow: column;
    display: flex;
    justify-content: center;
    img {
        display: flex;
        width: 20vw;
        margin: 30px auto;
    }
}
</style>
