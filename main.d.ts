export function init(nowInstanceFunc: Function, nowBase: Object): void;
export function getInstance(moduleData: Object): MyLocale;

declare class FormatData {
    id: Number;
}

declare class MyLocale {
    formatMessage(data: FormatData, params: Object): number;
    getLang(): Object;
    setLang(nowLang: Object): Boolean;
    changeLang(nowLang: Object): void;
    addChangeListen(func: Function): Number;
    removeChangeListen(func: Function): Boolean;
    clearChangeListen(): void;
}