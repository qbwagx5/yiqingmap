<template>
  <div class="prolist">
    <table>
      <thead>
        <tr>
          <th class="area">地区</th>
          <th class="defined">确诊</th>
          <th class="cure">治愈</th>
          <th class="death">死亡</th>
        </tr>
      </thead>
      <tbody>
        <template v-for=" item in citylist" class="arealist">
          <tr>
            <td class="areanames">
              <div @click="click(item)">
                <!-- <img src="../assets/image/down.png" alt=""> -->
                <span :class="[item.flag == false ? 'downarrow':'uparrow']"></span>
                <span>{{item.provinceName}}</span>

                <!-- <button style="float:right" >点击</button> -->
              </div>
            </td>
            <td>
              <div class="areadefined">
                <span>{{item.confirmedCount}}</span>
              </div>
            </td>
            <td>
              <div class="areadefined">
                <span>{{item.curedCount}}</span>
              </div>
            </td>
            <td>
              <div class="areadefined">
                <span>{{item.deadCount}}</span>
              </div>
            </td>
          </tr>
          <tr v-if="item.flag === true">
            <td colspan="4">
              <table class="city">
                <tbody>
                  <tr v-for="i in item.cities" class="citylist">
                    <td class="cityname">
                      <div class="citydefined">
                        <span>{{i.cityName}}</span>
                      </div>
                    </td>
                    <td class="cityother">
                      <div>
                        <span>{{i.confirmedCount}}</span>
                      </div>
                    </td>
                    <td class="cityother">
                      <div>
                        <span>{{i.curedCount}}</span>
                      </div>
                    </td>
                    <td class="cityother">
                      <div>
                        <span>{{i.deadCount}}</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      citylist: []
    };
  },
  mounted() {
    this.getdatas();
    setInterval(() => {
      this.update();
    }, 60000);
  },
  methods: {
    click(item) {
      item.flag = !item.flag;
      this.$forceUpdate();
    },
    getdatas() {
      let url = "https://tianqiapi.com/api";
      this.$axios
        .get(url, {
          params: {
            version: "epidemic",
            appid: 91527574,
            appsecret: "wViEa3zM",
            vue: 1
          }
        })
        .then(data => {
          this.citylist = data.data.data.area;
          this.citylist.forEach(i => {
            i.flag = false;
          });
        });
    },
    update() {
      let url = "https://tianqiapi.com/api";
      this.$axios
        .get(url, {
          params: {
            version: "epidemic",
            appid: 91527574,
            appsecret: "wViEa3zM",
            vue: 1
          }
        })
        .then(data => {
          let citylists = [];
          citylists = data.data.data.area;
          for (let i = 0; i < citylists.length; i++) {
            citylists[i].flag = this.citylist[i].flag;
          }
          this.citylist = citylists;
        });
    }
  }
};
</script>
<style lang="scss" scope>
.prolist {
  width: 100%;
  table {
    width: 100%;
    font-size: 15px;
    margin-left: 15px;
    padding-right: 30px;
    text-align: center;
    td {
      padding: 0px;
    }
    .areanames {
      width: 100%;
      background-color: #00bec9;
      color: #ffffff;
      height: 30px;
      display: block;
      text-align: left;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      margin-bottom: 10px;
      line-height: 30px;
      .downarrow{
        display: inline-block;
        width: 14px;
        height: 14px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url(../assets/image/down.png);
        margin-left: 10px;
        margin-right: 5px;
        vertical-align: middle;
      }
      .uparrow{
        display: inline-block;
        width: 14px;
        height: 14px;
        background-repeat: no-repeat;
        background-size: contain;
        background-image: url(../assets/image/up.png);
        margin-left: 10px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
    tr {
      width: 100%;
      height: 30px;
    }
    .defined {
      width: 23.3%;
      font-size: 15px;
      color: #555555;
    }
    .cure {
      width: 23.3%;
      font-size: 15px;
      color: #555555;
    }
    .areadefined {
      background-color: #f5f6f7;
      color: #4d5054;
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
      font-weight: 700;
    }
    .death {
      width: 23.3%;
      font-size: 15px;
      color: #555555;
    }
    .area {
      width: 30%;
      font-size: 15px;
      color: #555555;
    }
  }
  .city {
    margin: 0px;
    padding: 0px;
    border-collapse: collapse;
    .citylist {
      width: 100%;
      border-bottom: 1px solid #f5f5f5;
      height: 45px;

      .cityname {
        width: 30%;
      }
      .citydefined {
        width: 100%;
        text-align: left;
        font-size: 15px;
        color: #00bec7;
      }
      .cityother {
        color: #555555;
        width: 23.3%;
      }
    }
    .citylist:last-child {
      border-bottom: none;
    }
  }
}
</style>