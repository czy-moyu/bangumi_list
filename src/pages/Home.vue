<template>
    <div>
        <el-row>
            <el-col class="middle-view" :span="14" :offset="5">
                <div class="overflow">
                    <CardGroup week-color="#e91e63" week-name="星期一 (月)" :img-src="bangumiItem" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import CardGroup from '@/components/CardGroup.vue'

export default {
    data() {

        return {
            bangumiItem: [],
            Mon: {
                color: '#e91e63'
            },
            Tues: {
                color: '#9c27b0',
            },
            Wed: {
                color: '#2196f3',
            },
            Thur: {
                color: '#00bcd4',
            },
            Fri: {
                color: '#4caf50',
            },
            Sat: {
                color: '#ff5722',
            },
            Sun: {
                color: '#f44336',
            },
        }
    },
    components: {

        CardGroup
    },
    methods: {
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
        getCurrentWeek: function() {

            const timeStamp = new Date()

            return this.switchTimeToWeek(timeStamp.getDay())
        },
        // Convert given string which like '7/4' to week
        string2week: function(str) {

            return this.switchTimeToWeek(new Date('2019/'+str).getDay())
        }
    },
    mounted() {

        const url = 'https://acgntaiwan.github.io/Anime-List/anime-data/anime2019.07.json'
        const currentWeek = this.getCurrentWeek()
        console.log(currentWeek)
        var bangumiData = localStorage.getItem("bangumiData")
        if (!bangumiData) {
            this.$http.get(url)
                .then(function(response) {
                    localStorage.setItem('bangumiData', JSON.stringify(response))
                    bangumiData = localStorage.getItem("bangumiData")
                })
                .catch(function(error) {
                    console.log(error)
                })
                .finally(function() {

                })
        } else {
            bangumiData = JSON.parse(bangumiData);
            console.log(bangumiData)
            for (let i of bangumiData.data) {
                if (this.string2week(i.date) !== currentWeek) continue
                this.bangumiItem.push({
                    imgSrc: require('@/assets/cover/' + i.name + i.img.slice(-4)),
                    show: false,
                    name: i.name,
                })
            }
            console.log(this.bangumiItem)
        }
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
</style>
