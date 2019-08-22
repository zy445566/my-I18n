var lang = null;
var funcList = [];
var config = {
    base:{}
};
var isInit = false;

function runMessage(msg,params) {
    if(msg instanceof Function) {
       return msg(params);
    }
    return msg;
}

class MyLocale {
    constructor(moduleData={}) {
        this.moduleData = moduleData;
    }
    formatMessage(data, params = {}) {
        // params 后续代码支持，暂不支持
        if( moduleData &&
            moduleData[lang] && 
            moduleData[lang][data.id]
        ) {
            return runMessage(moduleData[lang][data.id],params)
        }
        if(config.base[lang] && config.base[lang][data.id]) {
            return runMessage(config.base[lang][data.id],params);
        }
        return '';
    }
    getLang() {
        return lang;
    }
    setLang(nowLang) {
        return lang = nowLang;
    }
    changeLang(lang) {
        for(let i=0;i<funcList.length;i++) {
            funcList[i](lang);
        }
    }
    addChangeListen(func) {
        if(!(func instanceof Function)){throw new Error('this argument must be function');}
        funcList.push(func);
    }
    removeChangeListen(func) {
        for(let i=0;i<funcList.length;i++) {
            if(func == funcList[i]) {
                funcList.splice(i,1);
            }
        }
    }
    clearChangeListen() {
        funcList = [];
    }
}

var instanceFunc = null; // 主要是为了实现切面编程,比如前端设置setItem
function init(nowInstanceFunc, nowBase = {}) {
    if(isInit) {throw new Error('this is already initialized!');}
    instanceFunc = nowInstanceFunc;
    if(nowBase) {config.base = nowBase;}
    isInit = true;
}

function getInstance(moduleData={}) {
    return nowInstanceFunc(new MyLocale(moduleData));
}

const exportVal = {}

exportVal.getInstance = getInstance;
exportVal.init = init;
exports.default = exportVal;
module.exports = exportVal;