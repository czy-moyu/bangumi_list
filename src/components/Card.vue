<template>
    <div class="">
        <el-card shadow class="card-item card-r card-radius" :body-style="{ padding: '0px' }">
            <div class="bangumi-image">
                <div :ss="imgSrc" :style="{backgroundImage: `url(${imgSrc})`}"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {

    data() {
        return {
            msg: ''
        }
    },
    props: ['imgSrc'],
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

@media only screen and (min-width: 1200px) {
    .bangumi-image div{
        min-height: 20vw;
    }
}

@media only screen and (max-width: 768px) {
    .bangumi-image div{
        min-height: 40vw;
    }
}

.bangumi-name {
    background-color: #fff;
    min-height: 30px;
    border-radius: 10px;
}
</style>
