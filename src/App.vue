<template>
    <div>
        <div id="app">
            <router-view/>
        </div>
        <canvas class="fireworks" style="position: fixed; left: 0px; top: 0px; z-index: 99999999; pointer-events: none; width: 1114px; height: 890px;" width="2228" height="1780">
        </canvas>
    </div>
</template>

<script>
import { go } from './fireworks';

export default {
    name: 'App',
    mounted() {
        go()
    },
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
