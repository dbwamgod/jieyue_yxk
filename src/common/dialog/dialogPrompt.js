import dbwDialogComponent from './dialogPrompt.vue';

export   const Dialog = {
    install:(Vue,option) => {
        const DialogConstructor = Vue.extend(dbwDialogComponent);
        const instance = new DialogConstructor();
        instance.$mount(document.createElement('div'));
        document.body.appendChild(instance.$el);
        Vue.prototype.$dbwDialog = (content, title, prop = {},duration = 1500) => {
            instance.info=content;
            instance.typeVisible = prop.typeVisible;
            instance.okClick=prop.okClick;
            instance.ok=function() {
                instance.typeVisible = false;
                prop.okClick && prop.okClick();
            }
            instance.cancel=()=> {
                instance.typeVisible = false;
                prop.cancelClick && prop.cancelClick()
            }
            if (prop.footer === undefined || prop.footer){
                instance.footer=true;
            }else{
                instance.footer=false;
            }
            if (prop.footerCancel === undefined || prop.footerCancel){
                instance.footerCancel=true;
            }else{
                instance.footerCancel=false;
            }
            if (prop.style){
                instance.style = prop.style;
            }else{
                instance.style = '';
            }
            if (prop.align){
                instance.align = prop.align;
            }
            if (prop.okText){
                instance.okText = prop.okText;
            }
            if (prop.cancelText){
                instance.cancelText = prop.cancelText;
            }
            instance.boxcancel=(e) => {
                let ev = e || event;
                let target = ev.target || ev.srcElement
                if (target.nodeName === 'DIV' && target.className === 'dbw-dialog-box') {
                    instance.cancel()
                }

            }
            if (prop.autoHidden && prop.autoHidden==='auto'){
                setTimeout(()=>{
                    instance.typeVisible = false;
                },duration)    
            }
        }
        
   }
}
