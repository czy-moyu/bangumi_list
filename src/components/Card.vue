<template>
    <div class="">
        <el-card shadow class="card-item card-r card-radius" :body-style="{ padding: '0px' }">
            <div class="bangumi-image">
                <div :style="{backgroundImage: `url(${imgSrc.replace(/ /g, '%20')})`}">

                </div>
                <div class="time">
                        <span>{{ time }}</span>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {

    data() {
        return {
        }
    },
    props: ['imgSrc', 'time'],
    mounted() {
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

.card-item {
    width: 100%;
    border: 0;
    margin-top: 16px;
}

.card-radius {
    border-radius: 10px;
}

.bangumi-image {
    position: relative;
    width: 100%;
    border-radius: 10px;
}

.bangumi-image div{
    width: 100%;
    min-height: 30vw;
    background-size:cover;
    background-position-x: center;
    background-position-y: center;
    background-repeat:no-repeat
}

.bangumi-name {
    background-color: #fff;
    min-height: 30px;
    border-radius: 10px;
}

div.time {
    position: absolute;
    bottom: 0px;
    font-size: 16px;
    width: 100%;
    height: 30px;
    text-align: center;
    min-height: 1px !important;
    line-height: 30px;
    color: white;
    text-shadow: 0 0 2px black;
    font-family: Roboto,Noto,Helvetica,Arial,sans-serif;
    user-select: none;
}

@media only screen and (min-width: 1200px) {
    .bangumi-image div{
        min-height: 20vw;
    }
}

@media only screen and (max-width: 768px) {
    .bangumi-image div{
        min-height: 40vw;
    }

    div.time {
    position: absolute;
    font-size: 12px;
    bottom: 0px;
    width: 100%;
    height: 20px;
    text-align:center;
    min-height: 1px;
    line-height: 20px;
    color: white;
    text-shadow: 0 0 1px black;
    font-family: Roboto,Noto,Helvetica,Arial,sans-serif;
    user-select: none;
    }
}

</style>
