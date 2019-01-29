export default {
	getDateYMD(val) {
	            var now = new Date();
	            var y = now.getFullYear();
	            var m = ("0" + (now.getMonth() + 1)).slice(-2);
	                if(now.getDate()+val<10){
	                 var d = '0' + now.getDate()+val;
	                }else{
	                 var d =now.getDate()+val;
	                }
	                //d = ("0" + now.getDate()).slice(-2)+val;
	            return y + "-" + m + "-" + d ;
	},
}