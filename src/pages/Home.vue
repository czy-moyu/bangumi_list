<template>
    <div>
        <el-row>
            <el-col @click.native.stop="onBefore" :span="5" style="min-height: 50vh;">
            </el-col>
            <el-col class="middle-view" :span="14" :offset="0">
                <div class="overflow">
                    <router-view />
                </div>
            </el-col>
            <el-col @click.native.stop="onAfter" :span="5" style="min-height: 50vh;">
            </el-col>
            <div id="landlord">
                <canvas id="live2d" width="280" height="250" class="live2d"></canvas>
            </div>
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

        onBefore: function() {

            if (!this.$isPc()) return
            this.beforeDay()
        },
        onAfter: function() {

            if (!this.$isPc()) return
            this.afterDay()
        },
        afterDay() {

            var tomorrow = !this.$route.params.week ? this.getCurrentWeek(1) : this.switchWeekToTime(this.$route.params.week)
            console.log(tomorrow)
            tomorrow = tomorrow + 1 > 6 ? 0 : tomorrow + 1
            this.$router.push({ path: `/${this.switchTimeToWeek(tomorrow)}` })
        },
        beforeDay() {

            var yesterday = !this.$route.params.week ? this.getCurrentWeek(1) : this.switchWeekToTime(this.$route.params.week)
            console.log(yesterday)
            yesterday = yesterday - 1 < 0 ? 6 : yesterday - 1
            this.$router.push({ path: `/${this.switchTimeToWeek(yesterday)}` })
        },
        // 将数字转换为日期英文缩写
        switchTimeToWeek(num) {

            let weekName
            switch (num) {
                case 0:
                    weekName = "Sun";
                    break;
                case 1:
                    weekName = "Mon";
                    break;
                case 2:
                    weekName = "Tues";
                    break;
                case 3:
                    weekName = "Wed";
                    break;
                case 4:
                    weekName = "Thur";
                    break;
                case 5:
                    weekName = "Fri";
                    break;
                case 6:
                    weekName = "Sat";
                    break;
                default:
                    weekName = "error"
            }
            return weekName
        },
        // 将英文缩写转为数字
        switchWeekToTime(weekName) {

            let num
            switch (weekName) {
                case "Sun":
                    num = 0;
                    break;
                case "Mon":
                    num = 1;
                    break;
                case "Tues":
                    num = 2;
                    break;
                case "Wed":
                    num = 3;
                    break;
                case "Thur":
                    num = 4;
                    break;
                case "Fri":
                    num = 5;
                    break;
                case "Sat":
                    num = 6;
                    break;
                default:
                    num = 0
            }
            return num
        },
        // flag为真传数字，假传英文缩写
        getCurrentWeek: function(flag) {

            const timeStamp = new Date()

            if (flag) {
                return timeStamp.getDay()
            }
            return this.switchTimeToWeek(timeStamp.getDay())
        },
    },
    mounted() {

        this.$slide(this.afterDay, this.beforeDay)
        this.$isPc();
        this.$loadLive2d();
        loadlive2d("live2d", "./models/kesshouban_v2/model.json");
    },
    created() {

    }

}
</script>

<style scoped>
.middle-view {
    z-index: 10;
}

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

.live2d {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 999;
}
</style>
