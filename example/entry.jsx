
import React from "react";
import ReactDOM from "react-dom";
import ChildA from "./child/childA.jsx";
import ChildB from "./child/childB.jsx";
import myI18n from "../main";
import enUS from "./locale/en-US";
import zhCN from "./locale/zh-CN";
class App extends React.Component {
  constructor(props) {
    super(props);
    let langKey = "langStorageKey";
    myI18n.init((myLocale)=>{
      return new Proxy(myLocale,{
        get: function(target, property) {
          switch(property) {
            case 'getLang':
              return function() {
                return localStorage.getItem(langKey);
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
  }
  render() {
    return (
      <div>
          <ChildA></ChildA>
          <ChildB></ChildB>
      </div>
    );
  }
}
const domContainer = document.querySelector('#root');
ReactDOM.render(<App />, domContainer);