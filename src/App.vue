<template>
  <div id="app">

    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  created:function(){
    Array.prototype.remove = function(val) {

      for( let i=0;i<this.length;i++) {
        if (this[i]['id'] === val['id'] || this[i] === val) {
          this.splice(i, 1);
        }

      }
    };
    Array.prototype.removeRepet = function() {
      let arr=this;
      let unique={};
      arr.forEach((item)=>{
       unique[JSON.stringify(item)]=item
     });
      arr = Object.keys(unique).map(data => {
       return JSON.parse(data)
     })
      return arr;
    }
  }
}
</script>

<style>
/*公共样式*/
    *{
        margin:0;
        padding: 0;
    }
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; } body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; } h1, h2, h3, h4, h5, h6{ font-size:100%; } address, cite, dfn, em, var { font-style:normal; } code, kbd, pre, samp { font-family:couriernew, courier, monospace; } small{ font-size:12px; } ul, ol { list-style:none; } a { text-decoration:none; } a:hover { text-decoration:underline; } sup { vertical-align:text-top; } sub{ vertical-align:text-bottom; } legend { color:#000; } fieldset, img { border:0; } button, input, select, textarea { font-size:100%; } table { border-collapse:collapse; border-spacing:0; }
    html,body{
      width: 100%;
        height: 100%;
        overflow: auto;
    }
    #app{
        width: 100%;
        height: 100%;
        font-size: 14px;
        font-family: "微软雅黑";
        background: #F4f7fa;
        max-width: 1920px;
        min-width: 1280px;
    }
    .fl{
    	float:left;
    }
    .fr{
    	float:right;
    }
    .abs{
    	position:absolute;
    }
    .clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
   .clearfloat{zoom:1}
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin:0 auto;
        position: relative;
        /*margin-top: 60px;*/
    }
    .el-table .el-table__body .cell{
          word-break: normal ;
    }
   
</style>
