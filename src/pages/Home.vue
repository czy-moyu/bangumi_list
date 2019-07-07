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
    mounted() {
        const url = 'https://acgntaiwan.github.io/Anime-List/anime-data/anime2019.07.json'
        var bangumiData = localStorage.getItem("bangumiData")
        if (!bangumiData) {
            this.$http.get(url)
                .then(function(response) {
                    localStorage.setItem('bangumiData', JSON.stringify(response));
                    bangumiData = localStorage.getItem("bangumiData")
                })
                .catch(function(error) {
                    console.log(error);
                })
                .finally(function() {

                })
        } else {
            bangumiData = JSON.parse(bangumiData);
            console.log(bangumiData)
            for (let i of bangumiData.data) {
                this.bangumiItem.push({
                    imgSrc: i.img,
                    show: false,
                })
            }
            console.log(this.bangumiItem)
        }
    }

}
</script>

<style scoped>
.middle-view {
}

.overflow {
    overflow: scroll;
    height: 99vh;
    overflow-x: hidden;
}

.overflow::-webkit-scrollbar {
  display: none;
}
</style>
