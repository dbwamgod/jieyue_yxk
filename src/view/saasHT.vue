<template>
    <div class="home" style="width: 100%;height: 100%;overflow: auto;">
        <el-container height="100%" style="width: 100%;height: 100%;overflow: auto;">
         <el-main ref="content" > 
              <router-view></router-view>
         </el-main>
            <!-- <headers></headers> -->
        </el-container>
           
    </div>
</template>

<script>
// import headers from '@/components/header'
import circleFriends from '@/view/circleFriends/friendsContainer'
export default {
  name: "home",
  data() {
    return {
      inputStyWidth: ""
    };
  },
  components:{
      circleFriends,
  },
  created: function() {},
  mounted () {
    // this.$nextTick(() => {
    //     console.log(this)
    //   console.log(this.$refs.content);
    // });
  },
  methods: {},
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.home .el-container {
  width: 100%;
  height: 100%;
}
.el-aside {
  color: #333;
}
</style>
