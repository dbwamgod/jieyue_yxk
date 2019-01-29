
const homeInstructions = () => import('@/pages/homeInstructions/index');

export default [{
    path: '/homeInstructions',
    name: 'homeInstructions',
    meta:{
        title: '用户画像',
    },
    component: homeInstructions,
}];
