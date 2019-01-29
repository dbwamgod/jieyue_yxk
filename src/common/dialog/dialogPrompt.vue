<template>
    <div>
        <transition name="dbwdialog" @enter="enter">
            <div class='dbw-dialog-box' v-show='typeVisible' @click="boxcancel($event)" >
              <transition name="dbwdialogT" @enter="enter">
                  <div class="dbw-dialog-tips" :style="style" v-show='typeVisible' >
                      <div class="dbw-dialog-header clearfloat">
                          <div class="fl">{{title}}</div>
                          <div class="fr" @click.stop="cancel"><i class="el-icon-error" style="font-size:24px; color: #A3A2A2;vertical-align: middle;cursor:pointer "></i></div>
                      </div>
                      <div style="padding: 24px 22px;">
                          <div v-html="info" style="color: #606266;font-size: 14px;padding:10px">
                              {{info}}
                          </div> 	
                          <div class="dbw-dialog-footer" :style="{'text-align':align}" v-if="footer">
                              <el-button  size="medium" @click.stop="cancel" v-if="footerCancel">{{cancelText}}</el-button>
                              <el-button size="medium" type="primary" @click.stop="ok">{{okText}}</el-button>
                          </div>
                          <div style="height:60px;" v-if="!footer">
                          </div>        
                      </div>
                  </div>
              </transition>
            </div>
        </transition>   
    </div>
      
</template>
<script>
export default {
  data() {
    return {
      typeVisible: false,
      info: "",
      align: "right",
      style: {},
      footer: true,
      footerCancel: true,
      title: "提示",
      okText:'确定',
      cancelText:'取消'
    };
  },
  methods: {
    ok: () => {},
    cancel: () => {},
    boxcancel: e => {},
    enter: () => {
    }
  }
};
</script>
<style scoped>
.dbw-dialog-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 12020;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.2s cubic-bezier(0.08, 0.65, 1, 1);
}
.dbw-dialog-header {
  height: 40px;
  line-height: 36px;
  font-size: 14px;
  background: #f6f6f6;
  padding: 0 22px;
  border-radius: 4px 4px 0 0;
  font-weight: bold;
}
.dbw-dialog-tips {
  width: 400px;
  min-width: 220px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 8px 15px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s cubic-bezier(0.08, 0.65, 1, 1);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.dbw-dialog-footer {
  margin-top: 20px;
}
.dbwdialog-enter-active {
  opacity: 0;
}
.dbwdialog-leave-active {
  opacity: 0;
}
.dbwdialogT-enter-active {
  opacity: 0;
  transform: translateY(-30px);
}

.dbwdialogT-leave-active {
  opacity: 0;
  transform: translateY(-30px);
}


/*<div class="barBox">
				<div class="barBoxTitle">【我是模板名称A】存在于任务中, 不能删除!</div>
				<div class="barBoxContent">
					<div class="barBoxContentTitle">
						<div class="leftbox">预警任务</div>
						<div class="rightbox">普通任务</div>
					</div>
					<div class="barBoxContentScroll">
						<div class="barScrooLeft">
							<div class="barItems"><div class="barItemsBall">1</div>放款任务已达标放款</div>
						</div>
						<div class="barScrooRight">
							<div class="barItems"><div class="barItemsBall">1</div>放款任务已达标放款</div>
						</div>
					</div>
				</div>
			</div>*/
</style>
