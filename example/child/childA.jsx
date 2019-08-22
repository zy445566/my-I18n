import React from "react";
import myI18n from "../../main";
export default class ChildA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      langList: [{id:'zh-CN',name:'简体中文'},{id:'en-US',name:'English'}],
      lang: "zh-CN"
    };
  }
  changeLang () {
    return (e)=>{
      this.setState({
        lang: e.target.value
      });
    }
  }
    render() {
      return (
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
      );
    }
  }