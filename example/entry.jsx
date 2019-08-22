
import React from "react";
import ReactDOM from "react-dom";
import localeInit from "./localeInit.jsx";// 必须放在入口文件组件上方
import ChildA from "./child/childA.jsx";
import ChildB from "./child/childB.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
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