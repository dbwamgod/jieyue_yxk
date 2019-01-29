import Vue from 'vue'
import Router from 'vue-router'
import saas from '@/view/saasHT'
import circleFriends from '@/view/circleFriends/friendsContainer'

//const Login = r => require.ensure([], () => r(require('@/view/login')), 'Login');


Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'content',
      path: '/content',
      component: saas,
      redirect: '/content/report',
      meta: {
        title: '容器'
      },
      children: [
        {
          name: 'circleFriends',
          path: '/content/report',
          component: circleFriends,
          meta: {
            title: '朋友圈'
          },
        }
        
      ]
    },
  ]
})

