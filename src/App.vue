<template>
  <div id="app">
    <el-container style="">
      <el-header style="line-height: 60px"
        ><i class="el-icon-location-outline"></i> {{ city }}</el-header
      >
      <el-main>
        <WeatherNow
          v-on:weatherNowLoaded="(data) => (this.weatherNow = data)"
          :date="date"
          :location="newPosition"
        ></WeatherNow>

        <div style="margin-top: 15px">
          <el-button type="info" round plain @click="drawer = true"
            >降水预报</el-button
          >&nbsp;
          <el-drawer
            title="空气质量"
            :visible.sync="drawer"
            :direction="direction"
          >
            <span>我来啦!</span>
          </el-drawer>
          <el-button type="info" round plain @click="drawer = true"
            >轻度110</el-button
          >
          <el-drawer
            size="60%"
            title="空气质量"
            :visible.sync="drawer"
            :direction="direction"
          >
            <div>
              <div class="drawtop" style="height: 100px">
                <div
                  class="drawcol"
                  style="line-height: 100px; font-size: 100px"
                  :style="'color: ' + weatherColor(airQuality.category)"
                >
                  {{ airQuality.aqi }}
                </div>
                <div
                  class="drawcol"
                  style="font-size: 30px; color: green"
                  :style="{ color: weatherColor(airQuality.category) }"
                >
                  {{ airQuality.category }}
                </div>
              </div>
              <div style="margin-top: 10px">空气很好，可正常活动</div>
              <div
                class="drawbody"
                style="height: calc(100% - 200px); margin-top: 20px"
              >
                <el-row :gutter="20">
                  <el-col :span="8"
                    ><div class="fontsmall">PM2.5</div>

                    <div class="fontbig">{{ airQuality.pm2p5 }}</div></el-col
                  >
                  <el-col :span="8"
                    ><div class="fontsmall">NO2</div>

                    <div class="fontbig">{{ airQuality.no2 }}</div></el-col
                  >
                  <el-col :span="8"
                    ><div class="fontsmall">O3</div>

                    <div class="fontbig">{{ airQuality.o3 }}</div></el-col
                  >
                </el-row>
                <br />
                <el-row :gutter="20">
                  <el-col :span="8"
                    ><div class="fontsmall">PM10</div>

                    <div class="fontbig">{{ airQuality.pm10 }}</div></el-col
                  >
                  <el-col :span="8"
                    ><div class="fontsmall">CO</div>

                    <div class="fontbig">{{ airQuality.co }}</div></el-col
                  >
                  <el-col :span="8"
                    ><div class="fontsmall">SO2</div>

                    <div class="fontbig">{{ airQuality.so2 }}</div></el-col
                  >
                </el-row>
              </div>
              <div class="drawbottom">
                <div
                  style="
                    height: 30px;
                    width: 90%;
                    border: 1px black solid;
                    border-radius: 10px;
                  "
                >
                  <a
                    href="https://www.baidu.com"
                    style="
                      margin-left: 10px;
                      line-height: 30px;
                      text-decoration: none;
                      color: black;
                    "
                  >
                    空气质量科普</a
                  >
                </div>
              </div>
            </div>
          </el-drawer>
        </div>
        <div
          class="hide-scroll"
          style="
            overflow-x: auto;
            scrollbar-width: none;
            white-space: nowrap;
            margin-top: 15px;
          "
        >
          <div
            style="
              width: 20%;
              display: inline-block;
              text-align: center;
              white-space: normal;
              font-size: 18px;
            "
            v-for="i in futureWheather"
          >
            <div class="htime">
              {{ i.fxTime.match(/(?<=T)\d{2}\:\d{2}(?=\+)/).toString() }}
            </div>
            <div class="icon">
              <i :class="'qi-' + i.icon" style="font-size: 30px"></i>
            </div>
            <div class="tem">{{ i.temp }}℃</div>
          </div>
        </div>
        <hr />
        <div style="text-align: left">
          <el-row
            :gutter="20"
            v-for="(i, a) in weekWeather"
            style="font-size: 18px; line-height: 35px"
          >
            <el-col :span="8">{{ judeweek(a, i.fxDate) }}</el-col>
            <el-col :span="8"
              ><i style="font-size: 150%" :class="'qi-' + i.iconDay"></i>
              {{ i.textDay }}</el-col
            >
            <el-col :span="8">{{ i.tempMax }}℃/{{ i.tempMin }}℃</el-col>
          </el-row>
        </div>
        <div>
          <el-row style="text-align: center; margin-top: 15px"
            ><el-button type="info" round plain style="width: 350px"
              >未来15日天气预报</el-button
            ></el-row
          >
        </div>
        <div style="margin-top: 15px">
          <div style="font-size: 25px">气象天气</div>
          <div style="margin-top: 15px; line-height: 30px; text-align: center">
            <el-row :gutter="20" class="row">
              <el-col :span="12"
                >体感温度<br /><span class="detail"
                  >{{ weatherNow.feelsLike }}℃</span
                ></el-col
              >
              <el-col :span="12"
                >湿度<br /><span class="detail"
                  >{{ weatherNow.humidity }}%</span
                ></el-col
              >
            </el-row>
            <el-row :gutter="20" class="row">
              <el-col :span="12"
                >降水<br /><span class="detail"
                  >{{ weatherNow.precip }}毫米</span
                ></el-col
              >
              <el-col :span="12"
                >风向<br /><span class="detail">{{
                  weatherNow.windDir
                }}</span></el-col
              >
            </el-row>
            <el-row :gutter="20" class="row">
              <el-col :span="12"
                >风力等级<br /><span class="detail">{{
                  weatherNow.windScale
                }}</span></el-col
              >
              <el-col :span="12"
                >能见度<br /><span class="detail"
                  >{{ weatherNow.vis }}公里</span
                ></el-col
              >
            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import WeatherNow from "./components/WeatherNow";

export default {
  data() {
    return {
      drawer: false,
      direction: "btt",
      weatherNow: {},
      futureWheather: {},
      weekWeather: {},
      date: new Date(),
      week: ["日", "一", "二", "三", "四", "五", "六"],
      airQuality: {},
      newPosition: [123],
      city: "",
    };
  },
  components: {
    WeatherNow,
  },
  methods: {
    getCity() {
      var taht = this;
      this.axios({
        method: "get",
        url: "https://api.hbchan.top/iparea?coords=114.3167999657685,30.368201712216076",
      }).then(function (response) {
        console.log(response);
        taht.city = response.data.city;
      });
    },
    judeweek(a, fxDate) {
      if (a == 0) {
        return "今天";
      } else if (a == 1) {
        return "明天";
      } else {
        var weekIndex = new Date(fxDate).getDay();
        return "星期" + this.week[weekIndex];
      }
    },
    weatherColor(cate) {
      if (cate == "优") {
        return "green";
      } else if (cate == "良") {
        return "yellow";
      } else if (cate == "轻度污染") {
        return "orange";
      } else if (cate == "中度污染") {
        return "red";
      } else if (cate == "重度污染") {
        return "purple";
      } else if (cate == "严重污染") {
        return "black";
      }
    },
    getfutureWeather() {
      let that = this;
      this.axios({
        method: "get",
        url:
          "https://devapi.qweather.com/v7/weather/24h?location=" +
          this.newPosition[0] +
          "," +
          this.newPosition[1] +
          "&key=b9fe60ea60634e8188c22672826aa45c",
      })
        .then(function (response) {
          //console.log(response);
          that.futureWheather = response.data.hourly;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getweekWeather() {
      var that = this;
      var newPo = that.newPosition;
      console.log(newPo);
      this.axios({
        method: "get",
        url:
          "https://devapi.qweather.com/v7/weather/7d?location=" +
          this.newPosition[0] +
          "," +
          this.newPosition[1] +
          "&key=b9fe60ea60634e8188c22672826aa45c",
      })
        .then(function (response) {
          console.log(response);
          that.weekWeather = response.data.daily;
        })
        .catch(function (error) {
          //console.log(error);
        });
    },
    getairQuality() {
      var that = this;
      this.axios({
        method: "get",
        url:
          "https://devapi.qweather.com/v7/air/now?location=" +
          this.newPosition[0] +
          "," +
          this.newPosition[1] +
          "&key=b9fe60ea60634e8188c22672826aa45c",
      }).then(function (response) {
        console.log(response);
        that.airQuality = response.data.now;
      });
    },
    getlocation() {
      var that = this;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = pos.coords || {};
          const { latitude, longitude } = coords;
          const position = [longitude, latitude];

          that.newPosition = position;
          that.getweekWeather();
          this.getfutureWeather();
          this.getairQuality();
        },
        (e) => {},
        {
          timeout: 10000,
          maximumAge: 10000,
        }
      );
    },
  },
  mounted() {
    //this.getweekWeather();
    this.getCity();
    this.getlocation();
  },
};
</script>
<style>
.el-header {
  background: rgba(199, 205, 240, 0.732);
}
#app {
  background: linear-gradient(
    rgba(132, 186, 236, 0.833) 0%,
    rgba(159, 138, 240, 0.584) 40%
  );
}
html,
body {
  padding: 0;
  margin: auto;
}
.el-main {
  height: calc(100vh - 60px);
  padding: 0;
}
.col {
  display: inline-block;
}
.row {
  margin-top: 15px;
}
.detail {
  font-size: 150%;
}
.drawcol {
  display: inline-block;
}
.fontsmall {
  font-size: 10px;
  color: rgb(76, 75, 75);
}
.fontbig {
  font-size: 20px;
  color: rgb(8, 8, 8);
}
.hide-scroll::-webkit-scrollbar {
  display: none;
}
</style>
