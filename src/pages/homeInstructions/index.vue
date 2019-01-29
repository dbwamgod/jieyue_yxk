<template>
  <div class="homeInstructions">
        <div class="homeInstructions-top" >
            <!-- <div class="homeInstructions-header">
                <p class="fallback" style="border-color:black" @click="goFallback"></p>
                <p>了解画像</p>
                <p style=" width: 18px;height: 18px;"></p>
            </div> -->
            <div class="homeInstructions-top-text">
              <p class="homeInstructions-text-content">
              用户画像是通过用户的真实数据构建出来的用户模型，
              </p>  
              <p class="homeInstructions-text-content">
              通过用户信息的标签化来抽象用户的全貌信息。根据客户的特征进行：营销、推荐、风控等业务活动，通过业务的强相关性和数据化场景服务，为公司产生巨大的商业价值和风险防范。<br>
              备注：综合得分随着时间的推移，信息的完善会更精准！请您随时关注客户综合得分更新!
              </p>  
            </div>
            <!-- <div class="homeInstructions-top-text">
              <p class="homeInstructions-top-title">对应分值</p>
              <div class="homeInstructions-img-box" id="homeInstructions-img-box">
                 <img :src="require('./scoreLegend.png')" alt="">
              </div>
            </div> -->
        
        
        </div>


  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "homeInstructions",
  data() {
    return {};
  },
  mounted() {
    // this.initEcharts();
  },
  methods: {
    initEcharts() {
      const myChart = this.$Echarts.init(
        document.getElementById("homeInstructions-img-box")
      );
      const option = {
        tooltip: {
          show: false
        },
        grid: {
          top: "40%",
          left: "-4%",
          right: "-15%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["35", "55", "60", "65", "70", "95"],
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              align: "left",
              width: "100%",
              padding: [0, 0, 0, -38],
              fontSize: 16,
              color: "#656E7B"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            max: 20,
            min: 0,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "较差",
            type: "bar",
            barWidth: "95%",
            barGap: "-100%",
            itemStyle: {
              normal: {
                color: new this.$Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(255,253,220,0.0)" },
                  { offset: 0.2, color: "rgba(255,253,220,0.3)" },
                  { offset: 0.3, color: "rgba(255,253,220,0.3)" },
                  { offset: 0.4, color: "rgba(255,253,220,0.3)" },
                  { offset: 0.7, color: "#FFA726" },
                  { offset: 0.8, color: "#FFA726" },
                  { offset: 1, color: "#FFA726" }
                ])
              },
              barBorderRadius:[4,4,0,0]
            },
            label: {
              normal: {
                show: true,
                position: "insideTop",
                formatter: "{a}",
                color: "#FFA726"
              }
            },
            data: [50]
          },
          {
            name: "普通",
            type: "bar",
            barGap: "-100%",
            barWidth: "95%",
            itemStyle: {
              normal: {
                color: new this.$Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(255,253,220,0.0)" },
                  { offset: 0.2, color: "rgba(255,253,220,0.3)" },
                  { offset: 0.3, color: "rgba(255,253,220,0.3)" },
                  { offset: 0.7, color: "#FCA935" },
                  { offset: 0.8, color: "#FCA935" },
                  { offset: 1, color: "#FCA935" }
                ])
              },
              barBorderRadius:[4,4,0,0]
            },
            label: {
              normal: {
                show: true,
                position: "insideTop",
                formatter: "{a}",
                color: "#FFA726"
              }
            },
            data: [, 50]
          },
          {
            name: "良好",
            type: "bar",
            barGap: "-100%",
            barWidth: "95%",
            itemStyle: {
              normal: {
                color: new this.$Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(99,188,102,0.0)" },
                  { offset: 0.1, color: "rgba(99,188,102,0.0)" },
                  { offset: 0.2, color: "rgba(99,188,102,0.0)" },
                  { offset: 0.3, color: "rgba(99,188,102,0.2)" },
                  { offset: 0.5, color: "rgba(99,188,102,0.5)" },
                  { offset: 0.7, color: "#63BC66" },
                  { offset: 0.8, color: "#63BC66" },
                  { offset: 1, color: "#63BC66" }
                ])
              },
              barBorderRadius:[4,4,0,0]
            },
            label: {
              normal: {
                show: true,
                position: "insideTop",
                formatter: "{a}",
                color: "#63BC66"
              }
            },
            data: [, , 50]
          },
          {
            name: "优质",
            type: "bar",
            barGap: "-100%",
            barWidth: "95%",
            itemStyle: {
              normal: {
                color: new this.$Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(71,176,75,0.0)" },
                  { offset: 0.1, color: "rgba(71,176,75,0.0)" },
                  { offset: 0.2, color: "rgba(71,176,75,0.2)" },
                  { offset: 0.3, color: "rgba(71,176,75,0.3)" },
                  { offset: 0.5, color: "rgba(71,176,75,0.5)" },
                  { offset: 0.7, color: "#47B04B" },
                  { offset: 0.8, color: "#47B04B" },
                  { offset: 1, color: "#47B04B" }
                ])
              },
              barBorderRadius:[4,4,0,0]
            },
            label: {
              normal: {
                show: true,
                position: "insideTop",
                formatter: "{a}",
                color: "#47B04B"
              }
            },
            data: [, , , 50]
          },
          {
            name: "重点",
            type: "bar",
            barGap: "-100%",
            barWidth: "95%",
            itemStyle: {
              normal: {
                color: new this.$Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(52,143,55,0)" },
                  { offset: 0.1, color: "rgba(52,143,55,0.1)" },
                  { offset: 0.2, color: "rgba(52,143,55,0.2)" },
                  { offset: 0.3, color: "rgba(52,143,55,0.3)" },
                  { offset: 0.5, color: "rgba(52,143,55,0.5)" },
                  { offset: 0.7, color: "#40964F" },
                  { offset: 0.8, color: "#40964F" },
                  { offset: 1, color: "#40964F" }
                ])
              },
              barBorderRadius:[4,4,0,0]
            },
            label: {
              normal: {
                show: true,
                position: "insideTop",
                formatter: "{a}",
                color: "#40964F"
              }
            },
            data: [, , , , 50]
          }
        ]
      };
      myChart.setOption(option);
    },
    goFallback() {
        this.$router.go(-1)
    }
  }
});
</script>

<style lang="scss" scoped>
.homeInstructions {
  background: #f6f6fb;
  width: 100%;
  height: 100%;
  .homeInstructions-top {
    .homeInstructions-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      box-sizing: border-box;
      height: 32px;
      background: #fff;
      & > p {
        font-size: 17px;
        color: #29354d;
      }
    }
    .homeInstructions-top-text {
      margin-top: 10px;
      width: 100%;
      // height: 210px;
      padding: 15px 0;
      box-sizing: border-box;
      background-color: #fff;
      font-size: 16px;
      color: #29354d;
      letter-spacing: 0;
      text-align: justify;
      .homeInstructions-top-title {
        font-size: 18px;
        color: #29354d;
        letter-spacing: 0.79px;
        line-height: 24px;
        margin-bottom:20px;
        padding-left:20px;
        box-sizing: border-box;
      }
      .homeInstructions-text-content{
         text-indent:20px;
         padding:0 20px;
         box-sizing: border-box;
      }
      .homeInstructions-img-box {
        width: 100%;
        height: 88px;
        &>img{
          width:100%;
          height:100%;
        }
      }
    }
  }
}
</style>
