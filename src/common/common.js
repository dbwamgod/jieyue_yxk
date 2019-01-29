export default {
	//校验非空
	isempty(val,name,type,vm){
		if(val==null||val==""||val==undefined){
       		vm.$message({
				message:name,
				duration:'1500',
				type: type
			});
			return false;
       	}else{
       		return true;
       	}
	},
	toThousands(num) {
		num = num +'';
		return  num.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	},
	setUrL(page){
		var newUrl = window.location.href;
      	if(newUrl.indexOf("?") != -1){
		    newUrl = newUrl.split("?")[0];
		}
      	newUrl = newUrl+'?'+page;
      	var stateObject = {};
	    //修改地址栏中的地址
	    history.pushState(stateObject,'修改地址',newUrl);
	}
	
}