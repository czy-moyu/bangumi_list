<template>
    <div class="card-group mt">
        <el-row>
            <transition name="bounceUp">
                <el-col v-if="name">
                    <div class="bangumi-title" v-bind:style="{ 'background-color': week[current].color}">
                        <span>
                            {{ name }}
                        </span>
                    </div>
                </el-col>
            </transition>
        </el-row>
        <el-row :gutter="16">
            <div v-for="(item, i) in bangumiItem" :key="i">
                <transition name="bounceUp">
                    <el-col v-if="item.show" :xs="12" :sm="8" :md="8" :lg="6" :key="i">
                        <Card :img-src="item.imgSrc" :time="item.time" />
                    </el-col>
                </transition>
            </div>
        </el-row>
    </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
    data() {
        return {
            bangumiItem: [],
            // 当前星期几英文缩写
            current: '',
            // 初始名为空，便于出现形成动画
            name: '',
            // 星期名和棒的颜色
            week: {
                Mon: {
                    color: '#e91e63',
                    name: '星期一',
                    fullName: '星期一 (月)',
                },
                Tues: {
                    color: '#9c27b0',
                    name: '星期二',
                    fullName: '星期二 (火)',
                },
                Wed: {
                    color: '#2196f3',
                    name: '星期三',
                    fullName: '星期三 (水)',
                },
                Thur: {
                    color: '#00bcd4',
                    name: '星期四',
                    fullName: '星期四 (木)',
                },
                Fri: {
                    color: '#4caf50',
                    name: '星期五',
                    fullName: '星期五 (金)',
                },
                Sat: {
                    color: '#ff5722',
                    name: '星期六',
                    fullName: '星期六 (土)',
                },
                Sun: {
                    color: '#f44336',
                    name: '星期日',
                    fullName: '星期日 (日)',
                },
            },
        }
    },
    watch: {
        '$route' (to, from) {
            // 对路由变化作出响应...
            this.name = ''
            for (let i of this.bangumiItem) {
                i.show = false
            }

            function sleep(ms) {
                return new Promise(resolve =>
                    setTimeout(resolve, ms)
                )
            }
            sleep(800).then(() => {
                this.bangumiItem = []
                this.refresh()
            })
        },
    },
    methods: {

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
        // '7/4'这类日期转换为星期几
        string2week: function(str) {

            return this.switchTimeToWeek(new Date('2019/' + str).getDay())
        },
        floatingUp: function() {

            // 一个个让卡片上浮
            this.name = this.week[this.current].fullName
            let count = 0
            let appendItem = setInterval(() => {
                if (!this.bangumiItem[count]) {
                    clearInterval(appendItem)
                    return
                }
                this.bangumiItem[count].show = true
                count += 1
            }, 300)
        },
        filterBangumi: function(bangumiData) {
            // 筛选番剧
            for (let i of bangumiData) {
                if (this.string2week(i.date) !== this.current) continue
                this.bangumiItem.push({
                    imgSrc: require('@/assets/cover/' + i.name + i.img.slice(-4)),
                    show: false,
                    name: i.name,
                    time: `${i.date}(${this.week[this.current].name.slice(-1)}) ${i.time}`,
                })
            }
        },
        // flag为真传数字，假传英文缩写
        getCurrentWeek: function(flag) {

            const timeStamp = new Date()

            if (flag) {
                return timeStamp.getDay()
            }
            return this.switchTimeToWeek(timeStamp.getDay())
        },
        refresh: function() {
            // 获取星期参数
            this.current = this.$route.params.week ? this.$route.params.week : this.getCurrentWeek()
            // 获取今天的所有番剧
            let bangumiData = localStorage.getItem("bangumiData")

            if (!bangumiData) {

                this.getNewData(bangumiData)
                return
            } else {

                bangumiData = JSON.parse(bangumiData)
                let modifiedDate = new Date(bangumiData.headers.expires)
                let now = new Date()
                if(modifiedDate.valueOf() > now.valueOf()) {
                    bangumiData = localStorage.getItem("bangumiData")
                    bangumiData = JSON.parse(bangumiData)
                    this.getNewData(bangumiData)
                    return
                }
                this.filterBangumi(bangumiData.data)
                this.floatingUp()
            }
        },
        getNewData: function(bangumiData) {

            const url = 'https://acgntaiwan.github.io/Anime-List/anime-data/anime2019.07.json'
            let that = this
            this.$http.get(url)
                .then(function(response) {
                    localStorage.setItem('bangumiData', JSON.stringify(response))
                    bangumiData = response
                    that.filterBangumi(bangumiData.data)
                    that.floatingUp()
                })
                .catch(function(error) {
                    console.log(error)
                })
                .finally(function() {

                })
        }
    },
    components: {
        Card
    },
    mounted() {

        this.refresh()
    },
}
</script>

<style scoped>
.card-group {}

.bangumi-title {
    min-height: 30px;
    margin-top: 16px;
    border-radius: 10px;
    text-align: center;
}

.bangumi-title span {
    font-weight: 400;
    color: white;
    line-height: 30px;
    user-select: none;
}
</style>
