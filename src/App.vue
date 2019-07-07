<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
#app {
    background-image: url('./assets/overload.jpg');
    width: 100vw;
    background-size: 960px;
    height: 100vh;
}
</style>
