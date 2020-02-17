

<template>
  <div class="news">
    <p>asdasds</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newlist: []
    };
  },
  methods: {
    getnewsdata() {
      let url = "http://api.tianapi.com/txapi/ncov/index";
      let key = "32f470c12df2c779659ab942ac4ee75c";
      this.$axios.get(url, {
        params: { key: key }
      }).then(data=>{
          console.log(data);
          
      });
    }
  },
  created(){
      this.getnewsdata()
  }
};
</script>

<style lang="scss">
.news {
  margin-top: 20px;
}
</style>