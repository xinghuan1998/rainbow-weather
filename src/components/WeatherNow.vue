<template>
  <div id="weatherNow">
    <div style="height: 100px">
      <div>
        <div class="col" style="line-height: 100px; font-size: 110px">
          {{ weatherNow.temp }}
        </div>
        <div class="col" style="line-height: 50px; font-size: 35px">
          <div>℃</div>
          <div>{{ weatherNow.text }}</div>
        </div>
      </div>
    </div>

    <div style="margin-top: 15px">
      {{ date.getFullYear() }}年{{ date.getMonth() }}月{{ date.getDate() }}日
      星期{{ week[date.getDay()] }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      weatherNow: {},
      week: ["日", "一", "二", "三", "四", "五", "六"],
    };
  },
  props: ["date", "location"],
  watch: {
    location(newVal) {
      this.getweatherNow();
    },
  },
  methods: {
    getweatherNow() {
      let that = this;
      this.axios({
        method: "get",
        url: `https://devapi.qweather.com/v7/weather/now?location=${this.location[0]},${this.location[1]}&key=b9fe60ea60634e8188c22672826aa45c`,
      })
        .then(function (response) {
          //console.log(response);
          that.weatherNow = response.data.now;
          that.$emit("weatherNowLoaded", that.weatherNow);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {},
};
</script>
