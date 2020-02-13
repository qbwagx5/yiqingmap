<template>
  <div id="main" style="width: 764px;height:600px;"></div>
</template>

<script>
// require("echarts/map/js/china");
// import china from 'echarts/map/js/china'
 import '../../node_modules/echarts/map/js/china.js' 
//   import '../../node_modules/echarts/map/js/.js'

export default {
  name: "chinamap",
  data() {
    return {
      provincedata: [],
      newprovincedata: [],
      myChart: null
    };
  },
  methods: {
    getdata() {
      let url = "https://tianqiapi.com/api";
      this.$axios
        .get(url, {
          params: {
            version: "epidemic",
            appid: 11848684,
            appsecret: "9LqwcVlJ",
            vue: 1
          }
        })
        .then(data => {
          // console.log(data.data.data);
          this.provincedata = data.data.data.area;
          // console.log(this.provincedata);
          
          let that = this;
          this.provincedata.forEach(i => {
            let obj = {};
            obj.name = i.provinceName;
            obj.value = i.confirmedCount;
            that.newprovincedata.push(obj);
          });
          this.$emit('getsondata', data.data.data);

          that.myChart.setOption({
            series: [
              {
                data: this.newprovincedata
              }
            ]
          });
          that.newprovincedata=[];
        });
    }
  },
  created() {
    this.getdata();
  },
  mounted() {

    setInterval(() => {
      this.getdata()
    }, 300000);
    this.myChart = this.$echarts.init(document.getElementById("main"));
    // 指定图表的配置项和数据
    let option = {
      tooltip: {
        formatter(params) {
          // params.data 就是series配置项中的data数据遍历
          let localValue;
          if (params.data) {
            localValue = params.data.value;
          } else {
            localValue = 0;
          }
          let htmlStr = `
          <p style='text-align:left;margin-top:10px;'>
	          地区：${params.name}<br/>
	          确诊：${localValue}<br/>
          </p>
        `;
          return htmlStr;
        }
      },
      visualMap: {
        // 左下角的颜色区域
        type: "piecewise", // 定义为分段型 visualMap
        min: 0,
        max: 1000,
        itemWidth: 40,
        bottom: 60,
        top: 460,
        left: 20,
        pieces: [
          // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
          // {gt: 900, lte: 1000, label: '', color: '#6ad86e'}, // (900, 1000]
          { gt: 9999, lte: 10000000, label: ">10000", color: "#5d0f0e" }, // (500, 900]
          { gt: 999, lte: 9999, label: "1000-9999", color: "#801d17" }, // (310, 500]
          { gt: 99, lte: 999, label: "100-999", color: "#bc3932" }, // (200, 300]
          { gt: 10, lte: 99, label: "10-99", color: "#ef826d" }, // (10, 200]
          { gt: 0, lte: 10, label: "1-9", color: "#f3ad8b" } // [0]
        ]
      },
      // geo配置详解： https://echarts.baidu.com/option.html#geo
      geo: {
        // 地理坐标系组件用于地图的绘制
        map: "china", // 表示中国地图
        // roam: true, // 是否开启鼠标缩放和平移漫游
        zoom: 1.2, // 当前视角的缩放比例（地图的放大比例）
        label: {
          show: true
        },
        itemStyle: {
          // 地图区域的多边形 图形样式。
          borderColor: "rgba(0, 0, 0, 0.2)",
          emphasis: {
            // 高亮状态下的多边形和标签样式
            shadowBlur: 20,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      },
      series: [
        {
          name: "", // 浮动框的标题（上面的formatter自定义了提示框数据，所以这里可不写）
          type: "map",
          geoIndex: 0,
          label: {
            show: true
          },
          // 这是需要配置地图上的某个地区的数据，根据后台的返回的数据进行拼接（下面是我定义的假数据）
          data: []
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option);
  }
};
</script>


<style scoped lang="scss">
</style>
