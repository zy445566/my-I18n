
import React from "react";
import ReactDOM from "react-dom";
const domContainer = document.querySelector('#root');
import ChildA from "./child/childA.jsx";
import ChildB from "./child/childB.jsx";
import myI18n from "../main";

class App extends React.Component {
  constructor(props) {
    super(props);
    myI18n.init()
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

ReactDOM.render(<App />, domContainer);