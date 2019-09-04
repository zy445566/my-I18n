const assert = require('assert');
const myI18n = require('../main.js');
const enUS = require('./locale/en-US');
const zhCN = require('./locale/zh-CN');
myI18n.init((myLocale)=>{
    return new Proxy(myLocale,{
        get: function(target, property) {
            switch(property) {
            case 'getLang':
                return function() {
                    let langVal = target[property]();
                    return langVal?langVal:'zh-CN';
                }
            case 'setLang':
            case 'changeLang':
                return function(nowLang) {
                    return target[property](nowLang);
                }
            }
            return target[property];
        }
    })
},
{
    "en-US":enUS,
    "zh-CN":zhCN,
});
const myI18nInstance = myI18n.getInstance();
let testUnit = {
    [Symbol('test.getLang')] : async function() {

        assert.strictEqual(myI18nInstance.getLang(),'zh-CN','getLang error!')
    },
    [Symbol('test.setLang')] : async function() {
        let lang = 'en-US';
        myI18nInstance.setLang(lang)
        assert.strictEqual(myI18nInstance.getLang(),
            lang,
            'setLang error!'
        );
        lang = 'zh-CN';
        myI18nInstance.setLang(lang)
        assert.strictEqual(myI18nInstance.getLang(),
            lang,
            'setLang error!'
        );
    },[Symbol('test.changeLang')] : async function() {
        let lang = 'en-US';
        myI18nInstance.changeLang(lang)
        assert.strictEqual(myI18nInstance.getLang(),
            lang,
            'changeLang error!'
        );
        lang = 'zh-CN';
        myI18nInstance.changeLang(lang)
        assert.strictEqual(myI18nInstance.getLang(),
            lang,
            'changeLang error!'
        );
        
        
    },[Symbol('test.addChangeListen')] : async function() {
        const testFunc = (nowLang)=>{
            assert.strictEqual(myI18nInstance.getLang(),
                nowLang,
                'addChangeListen error!'
            );
        }
        myI18nInstance.addChangeListen(testFunc);
        let lang = 'en-US';
        myI18nInstance.changeLang(lang)
        lang = 'zh-CN';
        myI18nInstance.changeLang(lang)
    },[Symbol('test.removeChangeListen')] : async function() {
        const testRemoveChangeListenFunc = ()=>{}
        myI18nInstance.addChangeListen(testRemoveChangeListenFunc);
        assert.strictEqual(myI18nInstance.getListenNum(),2,'removeChangeListen error!');
        assert.strictEqual(myI18nInstance.removeChangeListen(testRemoveChangeListenFunc),true,'removeChangeListen error!');
        
    },[Symbol('test.getListenNum')] : async function() {
        assert.strictEqual(myI18nInstance.getListenNum(),1,'getListenNum error!');
    },[Symbol('test.clearChangeListen')] : async function() {
        myI18nInstance.clearChangeListen();
        assert.strictEqual(myI18nInstance.getListenNum(),0,'clearChangeListen error!');
    },[Symbol('test.formatMessage')] : async function() {
        let lang = 'en-US';
        myI18nInstance.setLang(lang)
        assert.strictEqual(myI18nInstance.formatMessage({id:'entry.hello'}),'Hello','formatMessage entry.hello error!');
        assert.strictEqual(myI18nInstance.formatMessage({id:'child.childB.dearDaLaoDaiDaiMePlease'},{name:'Tom'}),'May you take me fly,dear Tom?','formatMessage entry.hello error!');
        lang = 'zh-CN';
        myI18nInstance.setLang(lang)
        assert.strictEqual(myI18nInstance.formatMessage({id:'entry.hello'}),'你好','formatMessage entry.hello error!');
        assert.strictEqual(myI18nInstance.formatMessage({id:'child.childB.dearDaLaoDaiDaiMePlease'},{name:'Tom'}),'Tom能带带我吗？','formatMessage entry.hello error!');
    },
    
}

async function run(testUnitList) {
    for(let testUnitValue of testUnitList) {
        for(let testFunc of Object.getOwnPropertySymbols(testUnitValue)) {
            await testUnitValue[testFunc]();
        }
    }
}
run([testUnit]);