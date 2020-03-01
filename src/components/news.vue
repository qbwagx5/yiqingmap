

<template>
  <div class="news" id="news">
    <div class="epidemicnewstitle">
      <p class="title">疫情新闻</p>
    </div>
    <div class="epidemicnewsmain">
      <div v-for="item in newlists" v-bind:key="item.newsId">
        <div class="point">
          <span class="fatherpoint">
            <span class="Coverpoint"></span>
            <span class="sonpoint"></span>
          </span>
        </div>
        <div class="news-body">
          <div class="title">
            <span>{{item.date}}</span>
          </div>
          <div class="news-main">
            <a :href="item.url" target="_blank"><p>{{item.title}}</p></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      newlists: []
    };
  },
  methods: {
    getnewsdata() {
      var timestamp = Date.parse(new Date());
      let data = {
        component_id:
          "_conf_13|wap_zt_std_theme_timeline|http://news.sina.cn/zt_d/yiqing0121",
        page: 1,
        _: timestamp
      };
      let that = this;
      $.ajax({
        type: "get",
        dataType: "jsonp",
        url:
          "https://interface.sina.cn/wap_api/wap_std_subject_feed_list.d.json",
        data: data,
        success: function(data) {
          that.newlists = data.result.data.data;
        }
      });
    }
  },
  created() {
    this.getnewsdata();
  },
  mounted() {
    setInterval(() => {
      this.getnewsdata()
    }, 60000);
  },
};
</script>

<style lang="scss">
.news {
  margin-top: 20px;
  margin-left: 20px;
  display: grid;

  .epidemicnewstitle {
    .title {
      font-size: 18px;
      font-weight: bold;
      color: #000000;
      height: 19px;
      margin-bottom: 10px;
    }
  }
  .epidemicnewsmain {
    position: relative;
    top: 10px;
    .news-body {
      position: relative;
      // display: inline-block;
      float: left;
      width: 98%;
      height: 85px;
      .title {
        position: absolute;
        left: 15px;
        top: -4px;
        font-size: 14px;
        color: #999999;
      }
      .news-main {
        position: absolute;
        width: 95%;
        height: 50px;
        top: 20px;
        left: 15px;
        background-color: #f5f6f7;
        border-radius: 5px;
        a{
          text-decoration:none;
        }
        p {
          padding-left: 20px;
          line-height: 50px;
          color: #4d5054;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
    .point {
      position: relative;
      width: 10px;
      height: 85px;
      float: left;
      .Coverpoint {
        background-color: #fff;
        display: block;
        position: absolute;
        width: 11px;
        height: 11px;
        border: 1px solid #ffffff;
        border-radius: 50%;
        left: -6px;
        top: 0px;
      }
      .fatherpoint {
        width: 1px;
        display: block;
        height: 80px;
        background: #eee;
        position: absolute;
        left: 10px;
        .sonpoint {
          width: 6px;
          height: 6px;
          border: 3px solid #cfeff0;
          border-radius: 50%;
          display: block;
          background-color: #0faeb5;
          position: absolute;
          left: -5px;
        }
      }
    }
  }
}
</style>