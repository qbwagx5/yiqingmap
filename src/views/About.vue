<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->

    <table>
      <tr>
        <th>Month</th>
        <th>Month</th>
      </tr>
      <div v-for=" item in a" v-bind:key="item.name">

      <tr >
          <td class="td" >
            <div class="name">
              {{item.name}}
              <button style="float:right" @click="click(item)">点击</button>
            </div>
          </td>
          <td class="names" >{{item.value}}</td>
      </tr>

      <tr v-if="item.flag == true">
          <td class="td" >
            <div class="name">
              {{item.name}}
            </div>
          </td>
          <td class="names" >{{item.value}}</td>
      </tr>
      
      </div>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a:[{
          name: "sss",
          value: "111",
          flag: false
        },
        {
          name:'上海',
           value: "111",
          flag: false
        },

        {
          name:'南京',
           value: "111",
          flag: false
        }],
      pre:[
        {
          name: "顺义",
          value: "111",
          flag: false
        },        
      ]
    };
  },
  methods: {
    click(item) {
      console.log(item.flag,'flag');
      
      item.flag=!item.flag;
      console.log(item.flag);
      
    }
  },
  created() {

  },
};
</script>

<style lang="scss">
.about {
  background-color: #fff;
  text-align: center;
  table {
    position: relative;
    left: 50px;
    top: 50px;
    border-collapse: collapse;
    tr{
      display: block;
      margin-bottom:10px;
    }
      .name {
        display: table-cell;
        vertical-align: middle;
        width: 218px;
        height: 30px;
        text-align: left;
        background-color: #00bec9;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        font-size: 15px;
        color: #ffffff;
      }
      .names{
        display: table-cell;
        vertical-align: middle;
        width: 169px;
        height: 30px;
        text-align: center;
        background-color: #F5F6F7;

      }
    }
}
</style>
