<!--主页头部-->
<!--lijinyang-->
<template>
    <!--头部内容-->
    <div style="width: 100%;height:100%;">
    	<div class='clearfloat' style="height:50px;width:100%;padding:0px;background-color: #1F283A;position: fixed;top: 0;z-index: 10; font-size:16px;">
    		<div class="fl userFont" style="width:180px;height:50px;position: relative;">
          		<!-- <img style="vertical-align: middle;position: absolute;left:50%;top:50%;margin-top:-16.5px;margin-left:-54.5px;" :src="require('../assets/images/sinan-logo.png')" alt=""> -->
        	</div>
	       	<div class="fl" style="margin-left:20px;">
	       		<div class='item fl' v-for="items in navList" :class="{active:items.isActive}" @click="activeFun(items)"><span >{{ items.label }}</span></div>
	       	</div>
	       	<div v-if='screenWidth'>
	       		<div class='fr userOut' @click="outLogin" style="width:100px;find-size:14px; border-left:1px solid #14171A;"> <img style='vertical-align: middle; margin-right:6px;' :src="require('../assets/images/userOut.png')"/><span style="vertical-align: middle;">安全退出</span></div>
	       		<div class='fr userOut' style="width:100px;find-size:14px;"> <img style='vertical-align: middle; margin-right:6px;' :src="require('../assets/images/userIcon.png')"/><span style="vertical-align: middle;">{{name}}</span></div>
    		</div>
	    </div>
       	<div style="height:100%;width: 100%;">
       		<el-container>
            	<asides :listArr="arr" :statrA="stateA"  v-if="hackReset"></asides>
            </el-container>
       	</div>
    </div>
    <!--头部内容-->
</template>

<script>
	import asides from '@/components/aside'
	import list from '@/common/listArr.js'
	import {mapActions} from 'vuex'
   	import api from '../api'

	  export default {
        data () {
            return {
                name:"admin",
                mrRouter:'',
                mrIndex:'',
                stateA:'',
                screenWidth:true,
				hackReset:true,
                arr:[],
                navList:[
                	{index:'2-1',isActive: true,label: '消息运营',routersa:"/saas/message",arrs:list.listArrs.msgList},
                	{index:'1-1',isActive: false, label: '简报',routersa:"/saas/briefing/nationwide",arrs:list.listArrs.jbList},
                   /* {index:'1-1',isActive: false, label: '权限设置',routersa:"",arrs:[]},*/
                    {index:'1-1',isActive: false, label: '参数维护',routersa:"/saas/param/dataIndicators",arrs:list.listArrs.paramList},
                ],
            }
        },
        mounted:function(){
        	const that = this
	        window.onresize = () => {
	            return (() => {
	                console.log(window.outerWidth)
	                if(window.outerWidth<'650'){
	                	this.screenWidth = false;
	                }else{
	                	this.screenWidth = true;
	                }
	            })()
	        }
            //路由
         	if(this.$router.history.current.path.indexOf('briefing')!== -1){
         		this.navList[1].isActive = true;
         		this.navList[0].isActive = false;
         		this.navList[2].isActive = false;
         		this.arr=list.listArrs.jbList;
         	}else if(this.$router.history.current.path.indexOf('message')!== -1){
         		this.navList[0].isActive = true;
         		this.navList[1].isActive = false;
         		this.navList[2].isActive = false;
         		this.arr=list.listArrs.msgList;
         	}else if(this.$router.history.current.path.indexOf('param')!== -1){
         		this.navList[0].isActive = false;
	       		this.navList[2].isActive = true;
         		this.navList[1].isActive = false;
         		this.arr=list.listArrs.paramList;
         	}else{
         		this.navList[0].isActive = true;
         		this.navList[1].isActive = false;
         		this.navList[2].isActive = false;
         		this.arr=list.listArrs.msgList;
         		this.$router.push({path:'/saas/message'});
         	}

        },
      	created:function(){
      		if(window.outerWidth<'650'){
	            this.screenWidth = false;
	        }else{
	            this.screenWidth = true;
	        }
			if(localStorage.getItem("userName")){
				this.name = localStorage.getItem("userName");
			}
			this.$http.get(api.pdng(),
              ).then((res) => {
              	if(res.data.data==null||res.data.data==undefined||res.data.data==""){
              		this.navList.splice(1,1);
              	}
            })
      	},
        components:{
            asides
        },
        methods: {
        	...mapActions(['stateRouter']),
	        activeFun: function(data){
	        	this.isRouterAlive = false
                this.navList.forEach(function(obj){
                    obj.isActive = false;
                });
                data.isActive = !data.isActive;
                //if(data.label=="消息运营"){
            if(data.label == "简报"){
              this.$http.get(api.pdng(),
              ).then((res) => {
                if(res.data.data.length == 1){
                  let jbLists = [
                    {
                      index:"1",
                      title:'简报',
                      icon:'el-icon-view',
                      list:[
                        {
                          index:"1-1",
                          textc:'大区简报',
                          routes:'/saas/briefing/regionEcharts'
                        }
                      ]
                    }
                  ]
                  data.routersa = "/saas/briefing/regionEcharts";
                  this.arr=jbLists;
                  this.$router.push({path:data.routersa});
                }else{
                  let jbLists = [
                    {
                      index:"1",
                      title:'简报',
                      icon:'el-icon-view',
                      list:[
                        {
                          index:"1-1",
                          textc:'全国简报',
                          routes:'/saas/briefing/nationwide'
                        },
                        {
                          index:"1-2",
                          textc:'大区简报',
                          routes:'/saas/briefing/regionEcharts'
                        }
                      ]
                    }
                  ]
                  data.routersa = "/saas/briefing/nationwide";
                  this.arr=jbLists;
                  this.$router.push({path:data.routersa});
                }

                }).catch(() => {
              });
             }else{
              	this.$router.push({path:data.routersa});
              	this.arr=data.arrs;
            }
            sessionStorage.setItem("state",data.index);
            this.stateRouter(data.index);
            this.stateA = data.index;
            this.hackReset = false
            this.$nextTick(() => {
              this.hackReset = true
            })

            },
            outLogin(){
            	localStorage.removeItem("userName");
            	localStorage.removeItem("userid");
            	sessionStorage.removeItem("taskHandListType");
            	this.$router.push({name:"Login"});
            }
      }
    }
</script>

<style>
	.userFont{
		text-align: center;
		line-height: 50px;
    background: #000000;
	}
	.userOut{
		text-align: center;
		line-height: 49px;
		color:#fff;
		font-size: 14px;
		cursor: default;
    
	}
	.item{
		color:#BCC9DB;
		margin: 0 12px;
		line-height: 44px;
		cursor: pointer;
	}
	.active{
		border-bottom: 3px solid #5594EB;
    	color: #FFFFFF;
	}

</style>
