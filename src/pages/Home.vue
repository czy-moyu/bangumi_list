<template>
    <div>
        <el-row>
            <el-col class="middle-view" :span="14" :offset="5">
                <div class="overflow">
                    <router-view />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {

        return {

        }
    },
    methods: {
        beforeDay() {
            this.$router.push({ path: '/Fri' })
        },
        afterDay() {
            this.$router.push({ path: '/Sun' })
        }
    },
    mounted() {

    },
    created() {

    }

}
</script>

<style scoped>
.middle-view {}

.overflow {
    overflow: scroll;
    height: 99vh;
    overflow-x: hidden;
}

.overflow::-webkit-scrollbar {
    display: none;
}

.after {
    position: absolute;
    right: 0;
}

.before {
    position: absolute;
    left: 0;
}
</style>
