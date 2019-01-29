<template>
  <div id="friendsBox" ref='content'>
    <div class="fr-anchor" :style="{left:anchorLeft+'px',top:anchorTop+'px'}" @mousemove="anchorMousemove" @mouseout="anchorMouseout">
      <img id="fr-anchor-jt" :style="{top:anchorActive+4+'px'}" :src="require('@/assets/images/Triangle.png')" alt="">
      <div class="anchor-item" :class="isAnchorClick==item.key?'anchor-active':''" v-for="(item,index) in anchorList" @click="anchorClick(item.key, index)" :data-anchorKey="item.key" :data-index="index" :key="item.key">{{item.name}}</div>
    </div>
    <div class="fr-banner">
      <span class="fr-banner-time">{{generateTime}}</span>
      <div class="fr-banner-title">
        <img :src="require('@/assets/images/reportIcon.png')" alt="">
        <div class="fr-ban-text">
          <div>朋 友 圈 报 告</div>
          <span>{{circleOfFriendsNum || '-'}}</span>
        </div>
      </div>
    </div>

    <div class="fr-content" id="fr-info-monito">
      <div class="fr-info-monito">
        <p class="fr-content-title">
          <span class="fr-vertical">基础信息检测</span>
        </p>
        <div class="fr-info-form">
          <el-row>
            <el-col>姓名</el-col>
            <el-col> {{basicInfoDetection.name || '-'}}</el-col>
            <el-col>{{basicInfoDetection.gender || '-'}}, {{basicInfoDetection.age || '-'}}</el-col>
          </el-row>
          <el-row>
            <el-col>身份证</el-col>
            <el-col>{{basicInfoDetection.idCardNum || '-'}}</el-col>
            <el-col>{{basicInfoDetection.censusRegisterZone || '-'}}</el-col>
          </el-row>
          <el-row>
            <el-col>手机号</el-col>
            <el-col>{{basicInfoDetection.phoneNum || '-'}}</el-col>
            <el-col>{{basicInfoDetection.phoneNumInstructions || '-'}}</el-col>
          </el-row>
          <el-row>
            <el-col>现居住</el-col>
            <el-col>{{basicInfoDetection.currentAddress || '-'}}</el-col>
            <el-col>{{basicInfoDetection.zipCpde || '-'}}</el-col>
          </el-row>
          <el-row>
            <el-col>GPS</el-col>
            <el-col>{{basicInfoDetection.gpsLocation || '-'}}</el-col>
            <el-col>{{basicInfoDetection.lgtdAndLttd || '-'}}</el-col>
          </el-row>

          <div class="fr-info-table">
            <el-table :data="basicInfoDetection.queryItemList" style="width: 100%">
              <el-table-column prop="itemName" label="查询信息" width="246">
              </el-table-column>
              <el-table-column prop="itemResult" label="查询结果">
              </el-table-column>
              <el-table-column prop="itemNote" label="备注">
                <template slot-scope="scope">
                  <span style="color:#9AA3B0;">
                    {{scope.row.itemNote || '-'}}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>

        </div>
      </div>
    </div>
    <div class="fr-emergency-contact" id="fr-emergency-contact">
      <p class="fr-content-title">
        <span class="fr-vertical">紧急联系人</span>
      </p>
      <div class="fr-eme-con-content">
        <div class="fr-emergency-item" v-for="item in emergencyContactList">
          <div class="fr-emergency-item-t clearfloat">
            <div class="fl">{{item.relationAndName}}</div>
            <p class="fl">{{item.phoneNum}}</p>
            <span class="fl">亲密度 {{item.intimacy}}</span>
            <img :src="require('@/assets/images/contact.png')" alt="">
          </div>
          <div v-show='item.callDetailsDesc' style="font-size: 14px;color: #16A5ED;line-height: 22px;margin-bottom:23px;">
            {{item.callDetailsDesc}}
          </div>
          <!--   <div class="fr-emergency-item-phone" v-if="!!item.itemList.length">
            <span>{{item.itemList[0].itemName}}</span>
            <span class="fr-item-button" v-for="it in item.itemList[0].itemContent">{{it.itemDesc}}
              <em>{{it.itemSource}}</em>
            </span>
          </div> -->
          <div class="fr-emergency-item-phone" v-for="ite in item.itemList" v-if="!!item.itemList.length">
            <div class="fr-item-le">
              <span>{{ite.itemName}}</span>
            </div>
            <span class="fr-item-button" v-if="!it.itemContent" v-for="it in ite.itemContent">{{it.itemDesc}}
              <em>{{it.itemSource}}</em>
            </span>
            <div >
              <div class="fr-item-ri" v-for="it in ite.itemContent" v-if="!!it.itemContent">
                <span class="fr-item-button">{{it.itemDesc}}
                  <em>{{it.itemSource || ''}}</em>
                </span>
                <div class="fr-item-text">
                  {{it.itemContent}}
                </div>

              </div>
            </div>

          </div>
          <p style="font-size: 14px; color: #2DAFBC;margin-bottom:23px;" v-for="it in item.noteDetailsDescList">
            {{it}}
          </p>
        </div>
        <div style="height:80px;line-height:80px;text-align:center;color:#9AA3B0;" v-if="!emergencyContactList.length">
          暂无数据
        </div>

      </div>
    </div>
    <div class="fr-circle" id="fr-circle">
      <p class="fr-content-title">
        <span class="fr-vertical">密友圈</span>
      </p>
      <el-table :data="circleTableData" style="width: 100%" max-height="690">
        <el-table-column prop="name" label="判断项" width="160" fixed v-if="enumeration.length">
          <template slot-scope="scope">
            {{scope.row['name'] | reverseEnumEn}}
          </template>
        </el-table-column>
        <el-table-column v-for="(item,index) in enumeration " :width="enumeration.length > 3?283:''" :prop="index+1+''" :label="`联系人-${index+1}`" :key="index">
          <template slot-scope="scope">
            {{scope.row[index+1] || '-'}}
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>

</template>

<script>
import api from "@/api";
export default {
  name: "circleFriends",
  data() {
    return {
      inputStyWidth: "",
      enumeration: [], //密友圈key
      circleTableData: [], //密友圈
      anchorList: [
        { key: "fr-info-monito", name: "基础信息检测" },
        { key: "fr-emergency-contact", name: "紧急联系人" },
        { key: "fr-circle", name: "密友圈" }
      ],
      isAnchorClick: "fr-info-monito",
      anchorActive: -8,
      setOffsetTop: [],
      basicInfoDetection: {}, //基础信息
      emergencyContactList: [], //紧急联系人
      circleOfFriendsNum: "",
      generateTime: "",
      anchorLeft: "1300",
      anchorTop: "20",
      unifCustId: new this.$GetQueryString()["unifCustId"] || "JY0001" //|| "JY0001"
    };
  },
  // components:{
  //     headers,
  // },
  created: function() {
    this.init();
  },
  mounted() {
    this.resize();
    window.addEventListener("scroll", this.scrollfun);
    window.addEventListener("resize", this.resize);
  },
  filters: {
    reverseEnumEn: function(data) {
      let enList = {
        phoneNum: "电话号码",
        creditRelations: "征信关系",
        notesOnBook: "通讯录备注名",
        phoneNumRegion: "联系人手机号码归属地",
        emergeContact: "紧急联系人",
        jyCust: "捷越客户",
        gpsLocation: "GPS位置",
        callingTimes: "主叫次数",
        callingDuration: "主叫时长/分",
        calledTimes: "被叫次数",
        calledDuration: "被叫时长/分",
        totalDuration: "总时长/分",
        sendSmsNum: "短信发送条数",
        receiveSmsNum: "短信接收条数",
        callDurationRank: "通话时长排名",
        firstContactTime: "最早一次联系时间",
        lastContactTime: "最后一次联系时间",
        mainContactTime: "主要联系时间",
        relationInfer: "关系推测",
        intimacy: "亲密度"
      };
      return data && enList[data];
    }
  },
  methods: {
    init() {
      this.$http.post(api.msgList(), { unifCustId: this.unifCustId }).then(
        res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            let {
              basicInfoDetection,
              circleOfCloseFriendsList,
              emergencyContactList,
              circleOfFriendsNum,
              generateTime
            } = res.data.data;
            this.basicInfoDetection = basicInfoDetection;
            this.emergencyContactList = emergencyContactList;
            this.circleOfFriendsNum = circleOfFriendsNum;
            this.generateTime = generateTime;
            this.circleTableData = this.enumerationFilter(
              circleOfCloseFriendsList
            );
          } else {
            this.$message.error(res.data.msg);
          }
        },
        err => {
          console.log(err);

          this.$message.error(err.msg);
        }
      );
    },
    resize() {
      this.anchorLeft = document.getElementById("friendsBox").offsetLeft + 1050;
      this.anchorTop = document.getElementById("friendsBox").offsetTop + 2;
    },
    scrollfun(e) {
      this.$nextTick(() => {
        let distance, timer;
        if (!this.setOffsetTop.length) {
          for (let i = 0; i < this.anchorList.length; i++) {
            this.setOffsetTop.push({
              key: this.anchorList[i].key,
              top: document.getElementById(this.anchorList[i].key).offsetTop
            });
          }
        }
        distance =
          document.documentElement.scrollTop || document.body.scrollTop;
        let activeScroll = this.setOffsetTop.filter(r => r.top <= distance);
        if (activeScroll.length != 0) {
          this.isAnchorClick = activeScroll[activeScroll.length - 1].key;
          clearTimeout(timer);
          timer = setTimeout(() => {
            this.arrowMobile(this.isAnchorClick);
          }, 100);
        }
      });
    },
    anchorMousemove() {
      window.removeEventListener("scroll", this.scrollfun);
    },
    anchorMouseout() {
      window.addEventListener("scroll", this.scrollfun);
    },
    arrowMobile(value) {
      this.anchorActive = document.querySelector(
        `div[data-anchorKey=${value}]`
      ).offsetTop;
    },
    enumerationFilter(data) {
      // 变成横向数据
      let newKeys = Object.keys(data[0]);
      let newData = {};
      let newarr = [];
      this.enumeration = new Array(data.length);
      newKeys.map((item, index) => {
        let arr = data.map(it => {
          return it[item];
        });
        newData[item] = arr;
      });
      let tableData = newKeys.map((item, index) => {
        let obj = {};
        obj.name = item;
        for (let i = 0; i < newData[item].length; i++) {
          obj[i + 1] = newData[item][i];
        }
        return obj;
      });
      return tableData;
    },
    anchorClick(value, index) {
      let _this = this;
      let total = 0;
      if (this.isAnchorClick == value) {
        return;
      }
      // if (value == 0) {
      //     total = 0;
      // } else {
      total = document.getElementById(`${value}`).offsetTop;
      // }
      this.isAnchorClick = value;
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      let step = total / 50;
      if (total > distance) {
        (function smoothDown() {
          if (distance < total) {
            distance += step;
            _this.$nextTick(() => {
              _this.arrowMobile(value);
              document.documentElement.scrollTop = distance;
              document.body.scrollTop = distance;
              window.scrollTo(0, distance);
            });
            setTimeout(smoothDown, 5);
          } else {
            _this.$nextTick(() => {
              _this.arrowMobile(value);
              document.documentElement.scrollTop = total;
              document.body.scrollTop = total;
            });
          }
        })();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
        (function smoothUp() {
          if (distance > total) {
            distance -= step;
            _this.$nextTick(() => {
              _this.arrowMobile(value);
              document.documentElement.scrollTop = distance;
              document.body.scrollTop = distance;
            });
            setTimeout(smoothUp, 5);
          } else {
            _this.$nextTick(() => {
              _this.arrowMobile(value);
              document.documentElement.scrollTop = total;
              document.body.scrollTop = total;
            });
          }
        })();
      }
    }
  },
  watch: {
    // inputStyWidth() {
    //   console.log("watch", this);
    //   this.$nextTick(() => {
    //     console.log("asdasdasd", this.$refs.content.offsetHeight);
    //   });
    // }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollfun);
  }
};
</script>

<style scoped>
</style>
<style lang="less">
#friendsBox {
  width: 1000px;
  background: #fff;
  margin: 0 auto;
  border: 1px solid #ebebeb;
  padding-bottom: 5px;
  .fr-anchor {
    position: fixed;
    top: 22px;
    border-left: 1px solid #adadad;
    padding-left: 10px;
    min-width: 100px;
    box-sizing: border-box;
    & > #fr-anchor-jt {
      position: absolute;
      top: -4px;
      left: -18px;
      width: 13px;
      height: 13px;
      transition: top 0.4s ease;
    }
    .anchor-item {
      position: relative;
      margin-top: -8px;
      font-size: 14px;
      color: #9aa3b0;
      margin-bottom: 20px;
      cursor: pointer;
      &:last-child {
        margin-bottom: 0px;
      }
      &::before {
        position: absolute;
        left: -13px;
        top: 50%;
        transform: translateY(-50%);
        content: "";
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #868686;
      }
    }
    .anchor-active {
      color: #54657e;
      &::before {
        background: #009dec;
      }
    }
  }
  .fr-banner {
    padding: 13px 42px 0 25px;
    box-sizing: border-box;
    height: 160px;
    background-image: url("~@/assets/images/Rectangle.png");
    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
    display: flex;
    justify-content: space-between;
    .fr-banner-title {
      display: flex;
      justify-content: flex-start;
      & > img {
        margin-top: 8px;
        margin-right: 11px;
        width: 40px;
        height: 53px;
      }
      & > .fr-ban-text {
        div {
          font-size: 36px;
        }
        span {
          font-size: 12px;
        }
      }
    }
  }

  .fr-content {
    & > .fr-info-monito {
      & > .fr-info-form {
        font-size: 14px;
        color: #54657e;
        .el-row {
          height: 51px;
          line-height: 51px;
          border-bottom: 1px dashed #e0e0e0;
          &:last-child {
            border: 0;
          }
          .el-col {
            width: 443px;
            height: 100%;
            border-left: 1px dashed #e0e0e0;
            text-indent: 16px;
            &:first-child {
              border: 0;
              width: 110px;
              text-align: center;
            }
          }
        }
        .fr-info-table {
          & > .el-table {
            // display: none;
            &::before {
              height: 0;
            }

            .el-table__header-wrapper {
              th {
                font-size: 14px;
                color: #54657e;
                border-left: 1px dashed #e0e0e0;
                background: #f0f0f0;
                &:first-child {
                  border-left: 0;
                }
              }
            }
            .el-table__body-wrapper {
              td {
                font-size: 14px;
                color: #54657e;
                border: 0;
                border-top: 1px dashed #e0e0e0;
                border-left: 1px dashed #e0e0e0;
                &:first-child {
                  border-top: 1px dashed #e0e0e0;
                  border-left: 0;
                }
              }
            }
          }
        }
      }
    }
  }

  .fr-content-title {
    height: 50px;
    line-height: 50px;
    background: #2dafbc;
    color: #fff;
    text-indent: 40px;
    font-size: 16px;
    & > .fr-vertical {
      position: relative;
      &::before {
        content: "";
        height: 100%;
        width: 3px;
        background: #fff;
        position: absolute;
        top: 0;
        left: -8px;
      }
    }
  }

  .fr-emergency-contact {
    .fr-eme-con-content {
      .fr-emergency-item {
        padding: 0 37px 0 59px;
        border-bottom: 1px solid #e0e0e0;
        &:last-child {
          border: 0;
        }
        & > .fr-emergency-item-t {
          position: relative;
          height: 59px;
          border-bottom: 1px dashed #e0e0e0;
          font-size: 14px;
          color: #54657e;
          padding: 20px 0 15px 0;
          box-sizing: border-box;
          font-family: PingFangSC-Medium;
          margin-bottom: 22px;
          & > div {
            padding-right: 20px;
          }
          & > span {
            padding-left: 11px;
            border-left: 1px dashed #e0e0e0;
          }
          & > p {
            width: 200px;
            padding-left: 16px;
            box-sizing: border-box;
            border-left: 1px dashed #e0e0e0;
          }
          & > img {
            position: absolute;
            width: 20px;
            height: 20px;
            left: -26px;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        & > .fr-emergency-item-phone {
          display: flex;
          justify-content: flex-start;
          align-content: center;
          margin-bottom: 44px;
          span {
            margin-right: 6px;
            font-size: 14px;
            color: #9aa3b0;
            flex-shrink: 0;
            height: 30px;
            line-height: 30px;
            box-sizing: border-box;
          }
          .fr-item-le {
            flex-shrink: 0;
            min-width: 118px;
          }
          .fr-item-ri {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            // flex-wrap: wrap;
          }
          .fr-item-button {
            background-color: #757575;
            border-radius: 4px;
            color: #fff;
            padding: 0 12px;
            margin-right: 0;
            margin-left: 20px;
            font-size: 12px;
            position: relative;
            min-width: 72px;
            text-align: center;
            em {
              position: absolute;
              left: 0;
              top: 30px;
              color: #9aa3b0;
            }
          }
          .fr-item-text {
            font-size: 14px;
            color: #54657e;
            text-align: justify;
            line-height: 24px;
            margin-left: 18px;
          }
        }
      }
    }
  }
  .fr-circle {
    .el-table__header-wrapper,
    .el-table__fixed .el-table__fixed-header-wrapper {
      //
      th {
        font-size: 14px;
        color: #54657e;
        border-left: 1px dashed #e0e0e0;
        background: #f0f0f0;
        &:first-child {
          border-left: 0;
        }
      }
    }
    .el-table__body-wrapper,
    .el-table__fixed .el-table__fixed-body-wrapper {
      td {
        font-size: 14px;
        color: #54657e;
        border: 0;
        border-top: 1px dashed #e0e0e0;
        border-left: 1px dashed #e0e0e0;
        &:first-child {
          border-top: 1px dashed #e0e0e0;
          background: #f0f0f0;
          border-left: 0;
        }
      }
    }
  }
}
</style>

