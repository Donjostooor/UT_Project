<template>
    <div id="loading" v-if="isLoading">
        <img class="img" src="../assets/loading.gif" alt="loading..." width="200" />
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            isLoading: true
        };
    }, mounted() {
        window.scrollTo(0, 0)
        setTimeout(() => {
            this.isLoading = false;
        }, 1500);
    }
};
</script>
<style>
#loading {
    position: absolute;
    z-index: 1000;
    background-color: white;
    height: 1000vh;
    width: 100vw;
    text-align: center;
    line-height: 100vh;
}

.img {
    position: relative;
    margin: auto;
}
</style>