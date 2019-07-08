import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['@/pages/Home'], resolve),
      children: [{
                path: ':week',
                name: 'week',
                component: resolve => require(['@/components/CardGroup'], resolve),
            },{
                path: '',
                name: 'week_default',
                component: resolve => require(['@/components/CardGroup'], resolve),
            }]
    }
  ]
})
