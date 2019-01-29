<template>
	<div id="asideList" style="width:100%;height:100%;overflow-x: hidden;">
		<el-row style="width:100%;display: -webkit-box;display: flex;margin-top:50px;">
		 <div style="height:100%;width: 180px;position: fixed;z-index: 10;-webkit-box-flex: 1;flex:1;">
			<el-menu @open="handleOpen" 
			@close="handleClose" 
			:router="true" 
			:default-active="defaultActive" 
			background-color="#3C404C" 
			text-color='#CCCCCC'
			active-text-color='#FFFFFF'
			style="height:100%;" >

		       <el-submenu v-for="item in listArr" :index="item.index">
		        <template slot="title">
							<img :src="item.icon" alt="" style='vertical-align: middle;'>
							<span style='vertical-align: middle;'>{{item.title}}</span>
							<!-- <img class='el-submenu__icon-arrow el-icon-arrow-down'  :src="require('../assets/images/arrowIcon.png')" alt="" > -->
							</template>
		        <el-menu-item-group v-for="itema in item.list">
		          <el-menu-item :index="itema.index" @click="gotoPath(itema.routes,itema.index)">
							<span class='activeAfter'></span>
							{{itema.textc}}
							</el-menu-item>
		        </el-menu-item-group>
		      </el-submenu>

	    	</el-menu>
    	</div>

    	<div style="padding:20px 0px 40px 0px;margin-left: 200px;margin-right:20px;width:100%;height:100%;position: relative;overflow: hidden;">
            <router-view v-if="hackReset"></router-view>
       </div>
    </el-row>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {mapActions} from 'vuex'
	  export default {
	    data() {
	      return {
	      	defaultActive:'',
	      	dass:"",
	      	hackReset:true,
	      }
	    },
	    props: {
	      	listArr: Array,
	      	statrA:String,
      		required: true
	    },
	    computed:{
	    	...mapState(['state_router']),
	    },
	    watch:{
	    	state_router(){
	    		this.defaultActive = this.state_router;
	    	},
	    	listArr(){
	    		this.defaultActive = this.statrA;
	    	}
	    },
	    created(){
	    	this.defaultActive = this.statrA;
	    },
	    beforeUpdate(){
	    	this.defaultActive = this.state_router;
	    },
	     methods: {
	     	...mapActions(['stateRouter']),
      		handleOpen(key, keyPath) {
		    },
		    handleClose(key, keyPath) {
		    },
		    gotoPath(address,index){
		    	this.$router.push({path:address});
					sessionStorage.setItem("state", index);
					if (address !=='/saas/message/taskHand') sessionStorage.setItem("taskHandListType", '0');	
					if (address !=='/saas/message/customTaskList') sessionStorage.setItem("customHandListType", '0');	
		    	this.stateRouter(index);
		    	this.hackReset = false
				this.$nextTick(() => {
				  this.hackReset = true
				})
		    }
	    },
	  };
</script>

<style>
	.el-submenu .el-menu-item{
		min-width:0!important;
	}
</style>
