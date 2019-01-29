/*
 * @Author: changge
 * @Date: 2018-06-05 17:24:17
 * @Last Modified by: changge
 * @Last Modified time: 2018-06-06 10:47:24
 */
 <style lang="less">
  @import "assets/fonts/font";
</style>
<template>
  <div id="app">
    <!-- <img src="./assets/images/common/logo.png"> -->
    <!-- 加载字体 -->
    <span style="font-family:BebasNeue-Bold;"></span>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="less" >
 @import 'assets/fonts/font'; 
</style>
<style>
* {
  margin: 0;
  padding: 0;
}
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
legend,
button,
input,
textarea,
th,
td {
  margin: 0;
  padding: 0;
}
body,
button,
input,
select,
textarea {
  font: 12px/1.5tahoma, arial, \5b8b\4f53;
}
h1,
h2,
h3,
h4,
h5,
h6 {

}
address,
cite,
dfn,
em,
var {
  font-style: normal;
}
code,
kbd,
pre,
samp {
  font-family: couriernew, courier, monospace;
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
sup {
  vertical-align: text-top;
}
sub {
  vertical-align: text-bottom;
}
legend {
  color: #000;
}
fieldset,
img {
  border: 0;
}
button,
input,
select,
textarea {

}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  font-family: helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #F6F6FB;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfloat {
  zoom: 1;
}
.fallback {
  width: 12px;
  height: 12px;
  border-right: 2px solid #fff;
  border-top: 2px solid #fff;
  -webkit-transform: rotate(-135deg);
  transform:  rotate(-135deg);
}
</style>
