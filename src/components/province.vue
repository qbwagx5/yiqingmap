<template>
  <div>
    <table>
      <tr>
        <th>地区</th>
        <th>确诊</th>
        <th>治愈</th>
        <th>死亡</th>
      </tr>

      <div v-for=" item in a" v-bind:key="item.name">
        <tr>
          <td class="td">
            <div class="name">
              {{item.name}}
              <button style="float:right" @click="click(item)">点击</button>
            </div>
          </td>
          <td class="names">{{item.value}}</td>
        </tr>

        <tr v-if="item.flag == true">
          <td class="td">
            <div class="name">{{item.name}}</div>
          </td>
          <td class="names">{{item.value}}</td>
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
        }
    },
};
</script>

<style lang="scss">
</style>