import myI18n from "my-i18n";
import enUS from "./locale/en-US";
import zhCN from "./locale/zh-CN";
/**
 * 本国际化方案支持可切入式编程
 * 可改写或在方法的前后进行操作
 * 比如本例子修改为localStorage存储
 */
const langKey = "langStorageKey";
myI18n.init((myLocale)=>{
    // 对方法进行重写或AOP编程
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
                    localStorage.setItem(langKey, nowLang);
                    return target[property](nowLang);
                }
            }
            return target[property];
        }
    })
},
// 引用基本的国际化文案
{
    "en-US":enUS,
    "zh-CN":zhCN,
})