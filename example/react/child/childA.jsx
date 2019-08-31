import React from "react";
import myI18n from "my-i18n";
import enUS from "./locale/en-US";
import zhCN from "./locale/zh-CN";
const myI18nInstance = myI18n.getInstance({
  'zh-CN':zhCN,
  'en-US':enUS
})
export default class ChildA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langList: [{id:'zh-CN',name:'简体中文'},{id:'en-US',name:'English'}],
      lang: myI18nInstance.getLang()
    };
  }
  changeLang () {
    return (e)=>{
      this.setState({
        lang: e.target.value
      });
      myI18nInstance.changeLang(e.target.value);
    }
  }
    render() {
      return (
        <span>
          {myI18nInstance.formatMessage({id:'child.childA.selectLanguage'})}:
          <select
            value={this.state.lang}
            onChange={this.changeLang()}>
            {this.state.langList.map((item,index)=>{
              return (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </span>
      );
    }
  }