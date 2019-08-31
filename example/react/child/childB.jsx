import React from "react";
import myI18n from "my-i18n";
const myI18nInstance = myI18n.getInstance()
export default class ChildB extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <span>
            {myI18nInstance.formatMessage({id:'child.childB.dearDaLaoDaiDaiMePlease'},{name:this.props.name})}
        </span>
      );
    }
  }