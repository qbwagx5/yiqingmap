

<template>
  <div class="news">
    <div class="epidemicnewstitle">
      <p class="title">疫情动态</p>
    </div>
    <div class="epidemicnewsmian">
      <div class="point">
        <span class="fatherpoint">
          <span class="Coverpoint"></span>

          <span class="sonpoint"></span>
        </span>
      </div>
      <div class="point">
        <span class="fatherpoint">
          <span class="Coverpoint"></span>
          <span class="sonpoint"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      newlist: []
    };
  },
  methods: {
    getnewsdata() {
      var timestamp = Date.parse(new Date());
      console.log(timestamp);
      let data = {
        component_id:
          "_conf_13|wap_zt_std_theme_timeline|http://news.sina.cn/zt_d/yiqing0121",
        page: 1,
        _: timestamp
      };
      $.ajax({
        type: "get",
        dataType: "jsonp",
        url:
          "https://interface.sina.cn/wap_api/wap_std_subject_feed_list.d.json",
        data: data,
        success: function(data) {
          console.log(data);
        }
      });
    }
  },
  created() {
    this.getnewsdata();
  }
};
</script>

<style lang="scss">
.news {
  margin-top: 20px;
  margin-left: 20px;
  height: 400px;
  .epidemicnewstitle {
    .title {
      font-size: 18px;
      font-weight: bold;
      color: #000000;
      height: 19px;
      margin-bottom: 10px;
    }
  }
  .epidemicnewsmian {
    .point {
      position: relative;
      width: 100%;
      height: 100px;
      .Coverpoint{
        background-color: #fff;
        display: block;
        position: absolute;
        width: 11px;
        height: 11px;
        border: 1px solid #ffffff;
        border-radius: 50%;
        left:-6px;
        top: 0px;
        

      }
      .fatherpoint {
        width: 1px;
        display: block;
        height: 100px;
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