<template>
  <div id="app">
    <img src="./assets/logo.png">
    data: {{ msg }}
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: "0000000"
    }
  },
  created() {
   this.ajax();
  },
  methods: {
    ajax: function(callback) {
      let that = this;
      // var xml = new XMLHttpRequest();
      // xml.open("POST", "http://127.0.0.1:3000/test");
      // xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      // xml.send();
      // xml.onreadystatechange = function() {
      //   if (xml.readyState == 4 && xml.status == 200) {
      //     let result = JSON.parse(xml.responseText);
      //     if (callback) {
      //       callback(result);
      //     }
      //   }
      // };
      this.$axios.post('http://127.0.0.1:3000/test').then(function (res) {
        that.msg = res.data.cod;
        console.log(res.data);
      })
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
