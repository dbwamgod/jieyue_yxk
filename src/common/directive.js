export const moveHoverAmplification={
    inserted:(el, binding, vnode)=>{
        let oldHeight=el.clientHeight;
        el.onmousemove=(e)=>{
            el.style.position= 'relative';
            el.style.top= '-5px';
            el.style.height=oldHeight+10+'px';
            console.log(el.style.height,e)
        };
        el.onmouseout=(e)=>{
            el.style.position= 'static';
            el.style.top= 0;
            el.style.height=oldHeight+'px';
        
        }
        
    }
}
export const anchorFunc =  {
    inserted: function (el, binding) {
        console.log(this,el)
        el.onclick =  () => {
            console.log('asdasdasd')
            let total;
            if (binding.value == 0) {
                total = 0;
            } else {

                total = document.getElementById(`${binding.value}`).offsetTop;
            }
            let distance = document.documentElement.scrollTop || document.body.scrollTop;
            let step = total / 50;
            if (total > distance) {
                (function smoothDown() {
                    if (distance < total) {
                        distance += step;
                        document.documentElement.scrollTop = distance;
                        window.scrollTo(0, distance)
                        console.log('asdasdasd', window.scrollTo)
                        setTimeout(smoothDown, 5);
                    } else {
                        document.documentElement.scrollTop = total;
                    }
                })();
            } else {
                let newTotal = distance - total;
                step = newTotal / 50;
                (function smoothUp() {
                    if (distance > total) {
                        distance -= step;
                        document.documentElement.scrollTop = distance;
                        setTimeout(smoothUp, 5);
                    } else {
                        document.documentElement.scrollTop = total;
                    }
                })();
            }

        }
    }
}
