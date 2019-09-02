
import React from "react";
import ReactDOM from "react-dom";
import localeInit from "./localeInit.js";// 引用初始化国际化必须在引用需国际化组件上方
import ChildA from "./child/childA.jsx";
import ChildB from "./child/childB.jsx";
import myI18n from "my-i18n";
const myI18nInstance = myI18n.getInstance()
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang:myI18nInstance.getLang(),
      yourName:'Tom'
    }
    document.title = myI18nInstance.formatMessage({id:'entry.title'})
    // 最外层组件监听语言变化，更新state实现下面子组件变更
    myI18nInstance.addChangeListen((lang)=>{
      this.setState({
        lang: lang
      });
      document.title = myI18nInstance.formatMessage({id:'entry.title'})
    })
  }

  changeName() {
    return (e)=>{
      this.setState({
        yourName: e.target.value
      });
    }
  }

  render() {
    return (
      <div>
          <ChildA></ChildA>
          <div>
          {myI18nInstance.formatMessage({id:'entry.inputYourNamePlease'})}:
          <input value={this.state.yourName} onChange={this.changeName()}></input>
          </div>
          <div>
            {myI18nInstance.formatMessage({id:'entry.hello'})},
            <ChildB name={this.state.yourName}></ChildB>
          </div>
          
      </div>
    );
  }
}
const domContainer = document.querySelector('#root');
ReactDOM.render(<App />, domContainer);