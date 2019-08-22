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
        let nowLang = this.getLang();
        console.log(this.moduleData,nowLang)
        // params 后续代码支持，暂不支持
        if( this.moduleData &&
            this.moduleData[nowLang] && 
            this.moduleData[nowLang][data.id]
        ) {
            return runMessage(this.moduleData[nowLang][data.id],params)
        }
        if(config.base[nowLang] && config.base[nowLang][data.id]) {
            return runMessage(config.base[nowLang][data.id],params);
        }
        return '';
    }
    getLang() {
        return lang;
    }
    setLang(nowLang) {
        return lang = nowLang;
    }
    changeLang(nowLang) {
        for(let i=0;i<funcList.length;i++) {
            funcList[i](nowLang);
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
    if(!isInit) {throw new Error('must be initialized after!');}
    return instanceFunc(new MyLocale(moduleData));
}

const exportVal = {}

exportVal.getInstance = getInstance;
exportVal.init = init;
exports.default = exportVal;
module.exports = exportVal;