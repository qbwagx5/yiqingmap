<template>
    <div class="home">
      <header>
        <h3>新型冠状病毒肺炎</h3>
        <h1>疫情实时大数据报告</h1>
      </header>
      <nav v-bind:class="[topshow == 1?'navtop':'']">
        <div class="navigation">
          <span
            v-bind:class="[navigationTitle == 1 ? 'navigationVitied':'' ]"
            @click="addclass('dynamic')"
          >疫情动态</span>
          <span
            v-bind:class="[navigationTitle == 2 ? 'navigationVitied':'' ]"
            @click="addclass('new')"
          >疫情新闻</span>
        </div>
      </nav>
      <main>
        <div class="map">
          <div class="statistics" id="statistics">
            <div class="statistics-title">
              <p class="areaname" @click="go">{{areaname}}</p>
              <p class="date">&nbsp;{{date}}数据统计</p>
            </div>
            <div class="statistics-main">
              <div class="statistics-diagnosed">
                <p style="font-size:22px;font-weight:bold; color:#e83132">{{diagnosed}}</p>
                <p>确诊病例</p>
                <p class="statistics-yesterday">
                  昨日
                  <span style="color:#e83132">+{{diagnosedIncr}}</span>
                </p>
              </div>
              <div class="statistics-suspect">
                <p style="font-size:22px;font-weight:bold; color:#ec9217">{{suspect}}</p>
                <p>疑似病例</p>
                <p class="statistics-yesterday">
                  昨日
                  <span style="color:#ec9217">+{{suspectIncr}}</span>
                </p>
              </div>
              <div class="statistics-cure d">
                <p style="font-size:22px;font-weight:bold; color:#10aeb5">{{cured}}</p>
                <p>治愈病例</p>
                <p class="statistics-yesterday">
                  昨日
                  <span style="color:#10aeb5">+{{curedIncr}}</span>
                </p>
              </div>
              <div class="statistics-death">
                <p style="font-size:22px;font-weight:bold; color:#4d5054; ">{{death}}</p>
                <p>死亡病例</p>
                <p class="statistics-yesterday">
                  昨日
                  <span style="color:#4d5054">+{{deathIncr}}</span>
                </p>
              </div>
            </div>
          </div>
          <chinamap></chinamap>
          <province></province>
          <news ></news>
        </div>
      </main>
  </div>
</template>
<script>
// @ is an alias to /src
import chinamap from "../components/china.vue";
import province from "../components/province.vue";
import news from "../components/news.vue";
import $ from "jquery";

export default {
  name: "Home",
  components: { chinamap, province, news },
  data() {
    return {
      navigationTitle: 1,
      statisticsdata: [],
      diagnosed: 0, //确诊人数
      suspect: 0, //疑似病例
      cured: 0, // 治愈病例
      death: 0, //死亡病例
      areaname: "国内疫情", //地区名称
      date: "", //更新日期
      diagnosedIncr: 0, //新增确诊人数
      suspectIncr: 0, //新增疑似人数
      curedIncr: 0, //新增治愈人数
      deathIncr: 0, //新增死亡人数
      oneheight: 0,
      topshow: 0,
      newheight:0,
      newsX:0
    };
  },

  created() {
    this.getdatas();
  },

  mounted() {
    setInterval(() => {
      this.getdatas();
    }, 60000);
    window.addEventListener("scroll", this.returntopshow);
    // console.log($(window).height);
    this.oneheight = $('#statistics').height();
    this.newheight = $('#news').height();

    // console.log(this.newheight);
  },
  methods: {
    returntop() {
      window.scrollTo(0, 0);
    },
    returntopshow() {
      if ($(window).scrollTop() > this.oneheight) {
        this.topshow = 1;
      } else {
        this.topshow = 0;
      }
    },

    go() {
      this.$router.push({ name: "About" });
    },
    getdatas() {
      let url = "https://interface.sina.cn/news/wap/fymap2020_data.d.json";
      let that = this;
      $.ajax({
        type: "get",
        url: url,
        dataType: "jsonp",
        success: function(data) {
          let epidemicdata = data.data;
          that.$store.dispatch("updatedfun", epidemicdata);
          that.getdata(epidemicdata);
        }
      });
    },
    getdata(data) {
      this.statisticsdata = data;
      this.diagnosed = data.gntotal;
      this.suspect = data.sustotal;
      this.cured = data.curetotal;
      this.death = data.deathtotal;
      this.date = data.times;
      this.diagnosedIncr = data.add_daily.addcon;
      this.suspectIncr = data.add_daily.addsus;
      this.curedIncr = data.add_daily.addcure;
      this.deathIncr = data.add_daily.adddeath;
    },
    addclass(name) {
      if (name == "dynamic") {
        this.navigationTitle = 1;
        window.scrollTo(0, 0);

      } else {
        this. newsX = $("#news").offset().top;
        window.scrollTo(0, this.newsX - 100);
        this.navigationTitle = 2;
      }
    }
  }
};
</script>

<style lang="scss">
.home {
  width: 764px;
  margin: 0 auto;
  position: relative;
  header {
    height: 187px;
    margin: 0 auto;
    background: url(../assets/222.png) no-repeat;
    background-size: 695px 189px;
    width: 100%;

    h3 {
      color: #c4faff;
      position: absolute;
      top: 50%;
      transform: translate(0%, -150%);
      float: left;
      position: relative;
      font-size: 15px;
    }
    h1 {
      float: left;
      position: relative;
      clear: both;
      color: #ffffff;
      position: relative;
      top: 50%;
      transform: translate(0%, -100%);
      margin-top: 15px;
    }
  }
  nav {
    background-color: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    .navigation {
      width: 764px;
      height: 50px;
      border-bottom: 1px solid #f5f6f7;
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      span {
        color: #000;
      }
    }
  }
  .navtop{
    position: fixed;
    top: 0px;
    z-index: 100
  }
  main {
    width: 764px;
    background-color: #fff;
  }
  .statistics {
    width: 100%;
    height: auto;
    margin-left: 20px;
    padding-top: 20px;
    .statistics-title {
      .areaname {
        font-size: 18px;
        font-weight: bold;
        color: #000000;
        height: 19px;
        margin-bottom: 10px;
      }
      .date {
        color: #999;
        font-size: 13px;
      }
    }
    .statistics-main {
      width: 720px;
      border-radius: 5px;
      background-color: #f5f6f7;
      display: flex;
      justify-content: space-around;
      padding: 15px 0px 15px 0px;
      margin: 16px 0px 16px 0px;
      text-align: center;
      .statistics-yesterday {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .navigationVitied {
    color: #10aeb5;
    line-height: 55px;
    height: 100%;
    border-bottom: 3px solid #10aeb5;
  }
}

//
</style>
