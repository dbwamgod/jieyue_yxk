<style lang="less">
  @import "../../assets/fonts/font";
</style>
<template>
  <div class="home-portrait">
          <!-- 加载字体 -->
    <span style="font-family:BebasNeue-Bold;"></span>
    <div class="home-portrait-top" :style="{backgroundImage:'url('+homeBackground+') no-repeat cover'}">
      <!-- <div class="home-portrait-header">
        <p class="fallback"></p>
        <p>用户画像</p>
        <img :src="require('@/assets/images/common/promptIcon.png')" alt="" @click="goDetails"> 
      </div> -->
      <div id="homeEcharts"></div>
      <div class="home-portrait-top-text">
        <p>超过
          <span>{{userDataInfo.campSynScorePct}}%</span>的潜在客户</p>
        <span>评估时间 {{userDataInfo.estimDt || '2018.9.11' | truncationStr}}</span>
      </div>
    </div>

    <div class="home-portrait-content">
      <div class="portrait-img-box">
        <img :src="userDataInfo.genderNm=='女'?require('./img/portraitDefaultWOman.png'):require('./img/portraitDefaultMan.png')" alt="">
        <p style="font-weight: bold;">{{userDataInfo.custNm}}</p>
      </div>
      <div class="portrait-text-box">
        <span v-show='userDataInfo.nowAddr'>{{userDataInfo.nowAddr}}</span>
        <span>{{userDataInfo.campClsNm}}</span>
      </div>
      <div class="portrait-tag">
        <div class="portrait-tag-flex">
          <div v-for=" item in processList" class="portrait-tag-item" :key="item.key">
            <div class="tag-item-img">
              <img :src="(processType>item.key&&processType!=item.key)?
                processImgList.start:
                (processType==item.key)?
                processImgList.activa:
                processImgList.end" alt="">
              <span v-show="processType<=item.key">{{item.key}}</span>
            </div>
            <div :class="processType==item.key?'tag-item-lable tag-item-lable-activa':'tag-item-lable'">{{item.name}}</div>
          </div>
        </div>
        <div class="portrait-backgroundArticle"></div>
      </div>
      <div class="portrait-tag-text" style="margin-bottom:8px; " >
        <img :src="require('./img/businessIcon.png')" alt="">
        <p >业务状况</p>
        <span>{{userDataInfo.bizSituNm}}</span>
        <p class="portrati-tag-time">{{userDataInfo.finalOprTm | truncationStr}}</p>
        
      </div>
    </div>
    <div class="home-portrait-lable">
      <p>推荐理由</p>
      <div class="home-lable-content" v-if="!isviodlable">
        <span v-for="item in userDataInfo.profileFeat">{{item}}</span>
      </div>
      <div class="home-lable-blank" v-if="isviodlable">
        <img :src="require('./img/blankIcon.png')" alt="">
        <span>暂无推荐理由</span>
      </div>
    </div>
    <div class="home-portrait-lable-hide"> 
      
    </div>
    <div class="home-portrait-footer" @click="makePhone">
      <img :src="require('./img/phoneIcon.png')" alt=""> 拨打电话
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import homeBackground from "@/assets/images/common/homeBackground.png";
import api from "@/dc/api/user.js";

export default Vue.extend({
  name: "home",
  data() {
    return {
      homeBackground,
      processType: 2,
      processImgList: {
        activa: require("./img/activaLocationIcon.png"),
        start: require("./img/activaPastIcon.png"),
        end: require("./img/noActiveIcon.png")
      },
      unifCustId: new this.$GetQueryString()["custId"] || 1,
      userDataInfo: {},
      isviodlable: true,
      processList: [
        {
          name: "注册",
          key: 1
        },
        {
          name: "申请",
          key: 2
        },
        {
          name: "质检",
          key: 3
        },
        {
          name: "信审",
          key: 4
        },
        {
          name: "签约",
          key: 5
        },
        {
          name: "放款",
          key: 6
        }
      ]
    };
  },
  filters: {
    truncationStr: data => {
      if (data) {
        let newdata = data.split(" ");
        return newdata[0];
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      api.userPortrait
        .getUserInfoF({
          data: { unifCustId: this.unifCustId }
        })
        .then(
          res => {
            if (res.code == 200) {
              console.log(res);
              this.userDataInfo = { ...res.data };
              this.processType = Number(this.userDataInfo.prcsNodeCd);
              this.isviodlable = !this.userDataInfo.profileFeat.length;
              this.initEcharts();
            } else {
              this.processType = 0;
              this.initEcharts();
              this.$vux.toast.show({
                type: "text",
                text: res.msg,
                time: 1500,
                position: "top"
              });
            }
          },
          err => {
            this.processType = 0;
            this.initEcharts();
            this.$vux.toast.show({
              type: "text",
              text: "网络错误",
              time: 1500,
              position: "top"
            });
          }
        );
    },
    initEcharts() {
      // this.userDataInfo.campSynScore
      let activaNumber = this.userDataInfo.campSynScore
        ? this.userDataInfo.campSynScore / 100
        : 0;
      const myChart = this.$Echarts.init(
        document.getElementById("homeEcharts")
      );
      myChart.setOption({
        series: [
          {
            name: "综合得分",
            type: "gauge",
            radius: "130%",
            center: ["50%", "64%"],
            min: 0,
            max: 100,
            splitNumber: 5, //刻度数量
            startAngle: 210,
            endAngle: -30,
            title: {
              fontSize: 14,
              color: "#fff"
            },
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                color: [[activaNumber, "#FFFFFF"], [1, "#A1CBF9"]],
                opacity: 0
              }
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: "#fff",
              distance: 5,
              fontSize: 11,
              formatter: "{value}"
            }, //刻度标签。
            axisTick: {
              show: true,
              lineStyle: {
                width: 3,
                color: "auto"
              },
              length: 10
            }, //刻度样式
            splitLine: {
              show: true,
              lineStyle: {
                width: 2,
                color: "auto"
              },
              length: 10
            }, //分隔线样式
            detail: {
              show: true,
              color: "#fff",
              fontSize: 65,
              offsetCenter: ["0", "20%"],
              fontFamily: "BebasNeue-Bold"
            },
            pointer: {
              show: false
            },
            data: [
              {
                name: "综合得分",
                value: this.userDataInfo.campSynScore || 0
              }
            ]
          }
        ]
      });
    },
    goDetails() {
      this.$router.push({
        name: "homeInstructions"
      });
    },
    makePhone() {
      window.location.href = `tel:${this.userDataInfo.moblNum}`;
    },
    touchstart(e) {
      console.log("touchmove ", e.touches[0].clientX);
      let event = e || event;
      let target = event.target;
      let clicentX = event.touches[0].clientX - target.offsetLeft;
      let clicentY = event.touches[0].clientY - target.offsetTop;
      document.addEventListener(
        "touchmove",
        function(e) {
          e.preventDefault();
          event.target.style.left = e.touches[0].clientX - clicentX + "px";
          console.log(event.target.style.left);
        },
        false
      );
    },
    touchend(e) {
      document.removeEventListener("touchmove", function() {
        e.preventDefault();
      });
    }
  }
});
</script>
<style lang="scss" scoped>
.home-portrait{
  width:100%;
  height:100%;
  overflow-y: scroll;
  overflow-x: hidden;
  position: fixed;
  top:0;
}
.home-portrait-top {
  width: 100%;
  height: 270px;
  background-image: url("./img/homeBackground.png");
  background-repeat: no-repeat;
  background-size: 100% 270px;
  background-color: #fff;
  padding-top: 12px;
  box-sizing: border-box;
  & > #homeEcharts {
    width: 182px;
    height: 132px;
    margin: 30px auto 0px;
  }
  & > .home-portrait-top-text {
    width: 100%;
    text-align: center;
    color: #fff;
    margin-top: 11px;
    & > p {
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      & > span {
        font-weight: bold;
      }
    }
    & > span {
      opacity: 0.72;
      font-size: 12px;
    }
  }
}
.home-portrait-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  height: 22px;
  & > img {
    display: block;
    width: 18px;
    height: 18px;
  }
  & > p {
    font-size: 17px;
    color: #ffffff;
  }
}
.home-portrait-content {
  height: 190px;
  background: #fff;
  position: relative;
  & > .portrait-img-box {
    width: 48px;
    padding-bottom: 4px;
    font-size: 14px;
    color: #29354d;
    text-align: center;
    margin: 0 auto;
    position: absolute;
    top: -21px;
    left: 50%;
    transform: translateX(-24px);
    & > img {
      width: 48px;
      height: 48px;
    }
  }
  & > .portrait-text-box {
    text-align: center;
    padding-top: 50px;
    font-size: 14px;
    color: #29354d;
    & > span:nth-child(1) {
      margin-right: 5px;
      position: relative;
    }
    & > span:nth-child(1)::before {
      content: "";
      height: 10px;
      width: 1px;
      position: absolute;
      right: -5px;
      top: 50%;
      transform: translateY(-5px);
      background-color: #cdcdcd;
    }
    & > span:nth-child(2) {
      color: #ff8d00;
    }
  }
  .portrait-tag {
    position: relative;
    margin-top: 20.5px;
    & > .portrait-tag-flex {
      display: flex;
      justify-content: space-around;
      margin-bottom: 16px;
      .portrait-tag-item {
        width: 30px;
        text-align: center;
        z-index: 2;
        .tag-item-img {
          width: 23px;
          height: 23px;
          position: relative;
          margin: 0 auto;
          color: #fff;
          img {
            width: 23px;
            height: 23px;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
          }
          & > span {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            height: 23px;
            width: 23px;
            text-align: center;
            line-height: 23px;
          }
        }
        .tag-item-lable {
          margin-top: 6px;
          font-size: 14px;
          color: #656e7b;
        }
        .tag-item-lable-activa {
          color: #3680fd;
          font-weight: bold;
        }
      }
    }
    & > .portrait-backgroundArticle {
      width: 100%;
      height: 4px;
      background-image: linear-gradient(-270deg, #96b9fb 0%, #eeeeee 100%);
      position: absolute;
      top: 10px;
      z-index: 1;
    }
  }
  .portrait-tag-text {
    padding-left: 20px;
    display: flex;
    height: 30px;
    align-items: center;
    box-sizing: border-box;
    color: #656e7b;
    img {
      display: block;
      width: 14px;
      height: 14px;
      margin-right: 8px;
    }
    p {
      font-size: 14px;
      margin-right: 14px;
    }
    span {
      display: block;
      font-size: 14px;
      color: #29354d;
    }
    .portrati-tag-time {
      margin-left: 10px;
      font-size: 14px;
      color: #c5c5c5;
    }
  }
}
.home-portrait-lable {
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
  height: 141px;
  background-color: #fff;
  margin-top: 10px;
  padding-top: 13px;
  position: relative;
  // margin-bottom:44px;
  // border:1px solid transparent;
  & > p {
    font-size: 15px;
    color: #29354d;
  }
  & > .home-lable-content {
    margin-top: 10px;
    height: 70px;
    display: flex;
    display: -webkit-flex;
    // justify-content: space-between;
    align-content: space-around;
    flex-wrap: wrap;
    font-size: 14px;
    color: #3680fd;
    & > span {
      padding: 2px 14px;
      height: 20px;
      opacity: 0.76;
      border: 1px solid #3680fd;
      border-radius: 4px;
      margin-right: 20px;
    }
  }
  & > .home-lable-blank {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
    img {
      width: 115px;
      height: 90px;
    }
    span {
      text-align: center;
      font-size: 12px;
      color: #999999;
      letter-spacing: 0;
    }
  }
}
.home-portrait-lable-hide{
   height:50px;
   width:100%;
}
.home-portrait-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(-90deg, #5b9afc 0%, #497cf0 100%);
  font-size: 18px;
  color: #ffffff;
  z-index: 99;
  img {
    width: 20px;
    height: 19px;
    margin-right: 8px;
  }
}
</style>
