export const stringFilter = (value = '', number = 10) => {
    let length = value.length;
    return length > number ? value.substring(0, number) + '...' : value;
}

export const removeHtml = (myText) => {
	let font = ""
	if(myText==""||myText==null||myText=="null"){
		font = "";
	}else{
		font = myText.replace(/<[^>]+>/g, "");
	}
    return font;
}

export const strSub = (myText) => {
	if(myText==""||myText==null||myText=="null"){
		return "";
	}else{
		let str = "";
	    let font = myText.replace(/<[^>]+>/g, "");
	    if (font.length > 120) {
	        str = "...";
	    }
	    return (font = font.substring(0, 120) + str);	
	}
}