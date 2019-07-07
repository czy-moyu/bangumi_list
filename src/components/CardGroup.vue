<template>
    <div class="card-group mt">
        <el-row>
            <transition name="bounceUp">
                <el-col v-if="week_name">
                    <div @click="test" class="bangumi-title" v-bind:style="{ 'background-color': weekColor}">
                        <span>
                            {{ week_name }}
                        </span>
                    </div>
                </el-col>
            </transition>
        </el-row>
        <el-row :gutter="16">
            <div v-for="(item, i) in imgSrc" :key="i">
                <transition name="bounceUp">
                    <el-col v-if="item.show" :xs="12" :sm="8" :md="8" :lg="6" :key="i">
                        <Card :img-src="item.imgSrc" />
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
            week_name: '',
            imgUrl: [],
            show: true,
        }
    },
    methods: {
        test() {
            this.show = ''
        }
    },
    components: {
        Card
    },
    mounted() {
        const that = this
        const mounteWeekBar = new Promise(function(resolve, reject) {

            that.week_name = that.weekName
            if (that.week_name) {
                resolve(1);
            } else {
                reject(0);
            }
        }).then((flag) => {
            let count = 0
            var appendItem = setInterval(() => {
                if (!that.imgSrc[count]) {
                    clearInterval(appendItem)
                    return
                }
                that.imgSrc[count].show = true
                count += 1
            }, 300)
        })
    },
    props: ['imgSrc', 'weekName', 'weekColor'],
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
}
</style>
