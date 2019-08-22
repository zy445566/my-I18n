import myI18n from "../main";
import enUS from "./locale/en-US";
import zhCN from "./locale/zh-CN";
const langKey = "langStorageKey";
myI18n.init((myLocale)=>{
    return new Proxy(myLocale,{
    get: function(target, property) {
        switch(property) {
        case 'getLang':
            return function() {
                let langVal = localStorage.getItem(langKey);
                return langVal?langVal:'zh-CN';
            }
        case 'setLang':
        case 'changeLang':
            return function(nowLang) {
            if(localStorage.setItem(langKey, nowLang)) {
                return target[property](nowLang);
            }
            return false;
            }
        }
        return target[property];
    }
    })
},{
    "en-US":enUS,
    "zh-CN":zhCN,
})