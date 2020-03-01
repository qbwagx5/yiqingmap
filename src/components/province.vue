<template>
  <div class="prolist">
    <table>
      <thead>
        <tr>
          <th class="area">地区</th>
          <th class="adddefined">新增确诊</th>
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
                <span :class="[item.flag == false ? 'downarrow':'uparrow']" v-if="item.city.length>0"></span>
                <span class="nonearrow" v-show="item.city.length==0"></span>
                <span class="proname">{{item.name}}</span>
              </div>
            </td>
            <td>
              <div class="areadefined">
                <span>{{item.adddaily.conadd}}</span>
              </div>
            </td>
            <td>
              <div class="areadefined">
                <span>{{item.value}}</span>
              </div>
            </td>
            <td>
              <div class="areadefined">
                <span>{{item.cureNum}}</span>
              </div>
            </td>
            <td>
              <div class="areadefined">
                <span>{{item.deathNum}}</span>
              </div>
            </td>
          </tr>
          <tr v-if="item.flag === true && item.city.length>0">
            <td colspan="5">
              <table class="city">
                <tbody>
                  <tr v-for="i in item.city" class="citylist">
                    <td class="cityname">
                      <div class="citydefined">
                        <span>{{i.name}}</span>
                      </div>
                    </td>
                    <td class="cityother">
                      <div>
                        <span>{{i.conadd}}</span>
                      </div>
                    </td>
                    <td class="cityother">
                      <div>
                        <span>{{i.conNum}}</span>
                      </div>
                    </td>
                    <td class="cityother">
                      <div>
                        <span>{{i.cureNum}}</span>
                      </div>
                    </td>
                    <td class="cityother">
                      <div>
                        <span>{{i.deathNum}}</span>
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
      citylist: [],
      // epidemicdata:{}
      waitlist:null
    };
  },
  mounted() {
      this.citylist = this.$store.state.epidemicdata.list;
      setTimeout(() => {
        this.getdatas()
      }, 100);
    setInterval(() => {
      this.updates();
    }, 6000);
  },
  methods: {
    click(item) {
      if(item.city.length == 0){
        return false;
      }
      else{
        item.flag = !item.flag;
        this.$forceUpdate();
      }
    },
    getdatas() {
        this.citylist = this.$store.state.epidemicdata.list;
        this.citylist.forEach(i => {
          i.flag = false;
        });
        this.citylist.sort(function(a, b) {
          return Number(b.value) - Number(a.value);
        });
        for (let i = 0; i < this.citylist.length; i++) {
          this.citylist[i].city.sort(function(a, b) {
            return Number(b.conNum) - Number(a.conNum);
          });
        }
        this.$store.dispatch('updatedcityfun',this.citylist);
      },
    updates() {
      this.citylist = this.$store.state.citylist;
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
      .nonearrow{
        // position: relative;
        width: 27px;
        display: inline-block;
        // padding-left:27px; 
      }
      .downarrow {
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
      .uparrow {
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
    .adddefined{
      width: 17.5%;
      font-size: 15px;
      color: #555555;
    }
    .defined {
      width: 17.5%;
      font-size: 15px;
      color: #555555;
    }
    .cure {
      width: 17.5%;
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
        width: 17.5%;
      }
    }
    .citylist:last-child {
      border-bottom: none;
    }
  }
}
</style>