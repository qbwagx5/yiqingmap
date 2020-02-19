<template>
  <div>
    <div id="main" style="width: 764px;height:600px;margin-bottom:20px;"></div>
    <div id="Nationdefied"></div>
  </div>
</template>

<script>
import "../../node_modules/echarts/map/js/china.js";

export default {
  name: "chinamap",
  data() {
    return {
      provincedata: [],
      newprovincedata: [],
      myChart: null,
      NationdefiedChart: null
    };
  },
  methods: {
    getdata() {
      this.provincedata = this.$store.state.epidemicdata.list;
      let that = this;
      setTimeout(() => {
        that.provincedata = that.$store.state.epidemicdata.list;
        let historylist = that.$store.state.epidemicdata.historylist;
        let newdate = [],
          historydefinedarr = [],
          historysuspectedarr = [];

        for (let i = 0; i < historylist.length - 1; i++) {
          historydefinedarr.unshift(
            historylist[i].cn_conNum - historylist[i + 1].cn_conNum
          );
          historysuspectedarr.unshift(historylist[i].wjw_susNum);
          newdate.unshift(historylist[i].date);
        }
        let historydefinedarrs = historydefinedarr.slice(-25);
        let historysuspectedarrs = historysuspectedarr.slice(-25);
        let newdates = newdate.slice(-25);

        that.NationdefiedChart.setOption({
          xAxis: [
            {
              data: newdates
            }
          ],
          series: [
            {
              type: "line",
              smooth: true,
              data: historydefinedarrs,
              itemStyle: {
                normal: {
                  color: "#ed6864", //折线点的颜色
                  lineStyle: {
                    color: "#ed6864" //折线的颜色
                  }
                }
              }
            },
            {
              type: "line",
              smooth: true,
              itemStyle: {
                // ed6864
                normal: {
                  color: "#f2a340", //折线点的颜色
                  lineStyle: {
                    color: "#f2a340" //折线的颜色
                  }
                }
              },
              data: historysuspectedarrs
            }
          ]
        });

        that.provincedata.forEach(i => {
          let obj = {};
          obj.name = i.name;
          obj.value = i.value;
          that.newprovincedata.push(obj);
        });
        that.myChart.setOption({
          series: [
            {
              data: this.newprovincedata
            }
          ]
        });
        that.newprovincedata = [];
      }, 500);
    }
  },

  mounted() {
    this.getdata();
    setInterval(() => {
      this.getdata();
    }, 60000);
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

    this.NationdefiedChart = this.$echarts.init(
      document.getElementById("Nationdefied")
    );
    let NationdefiedChartoption = {
      grid: {
        top: 70,
        bottom: 50
      },
      tooltip: {
        show: true,
        trigger: "axis",
        formatter: function(params) {
          let definedres = params[0].value,
            suspected = params[1].value;
          // console.log(params);

          let res =
            params[0].name +
            "<br>" +
            params[0].marker +
            "新增确诊:" +
            definedres +
            "<br>" +
            params[1].marker +
            "新增疑似:" +
            suspected;
          return res;
        }
      },
      title: {
        text: "全国 新增确诊/疑似 趋势",
        left: 30,
        textStyle: {
          color: "#555555",
          fontSize: "15"
        }
      },
      xAxis: {
        type: "category",
        axisLabel: {
          interval: 1,
          rotate: -40,
          textStyle: {
            color: "color: rgba(204, 204, 204, 0.077)" //坐标的字体颜色
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: []
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        type: "value"
      },
      legend: {
        data: ["新增确诊"]
      }
    };
    this.NationdefiedChart.setOption(NationdefiedChartoption);
  }
};
</script>


<style scoped lang="scss">
#Nationdefied {
  width: 729px;
  height: 570px;
  margin-left: 15px;
  border: 1px solid #eee;
  padding-top: 20px;
  border-radius: 5px;
}
</style>
