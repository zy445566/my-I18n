# my-I18n
I18n for front

# 安装
```sh
npm install my-i18n --save
```

# 例子
例子源码地址：[https://github.com/zy445566/my-I18n/tree/master/example](https://github.com/zy445566/my-I18n/tree/master/example)

例子展示地址：[https://zy445566.github.io/my-I18n/](https://zy445566.github.io/my-I18n/)

本例子使用react框架作为例子的演示，理论上上是可支持全部前端框架

/localeInit.jsx：
```jsx
// /localeInit.jsx 进行国际化组件初始化设置
import myI18n from "my-i18n";
import enUS from "./locale/en-US";
import zhCN from "./locale/zh-CN";
/**
 * 本国际化方案支持可切入式编程
 * 可改写实例的方法的前后进行操作
 * 比如本例子修改为localStorage存储
 */
const langKey = "langStorageKey";
myI18n.init((myLocale)=>{
    // 对方法进行重写或AOP编程
    return new Proxy(myLocale,{
        get: function(target, property) {
            switch(property) {
            case 'getLang':
                return function() {
                    let langVal = localStorage.getItem(langKey);
                    return langVal?langVal:'zh-CN';
                }
            case 'setLang':
            case 'changeLang':
                return function(nowLang) {
                    localStorage.setItem(langKey, nowLang);
                    return target[property](nowLang);
                }
            }
            return target[property];
        }
    })
},
// 引用基本的国际化文案
{
    "en-US":enUS,
    "zh-CN":zhCN,
})
```

/entry.jsx：
```jsx
// /entry.jsx 在webpack入口文件中使用
// ...省略一些代码
import localeInit from "./localeInit.jsx";// 引用初始化国际化必须在引用需国际化组件上方
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
    // 最外层组件监听语言变化，更新state实现下面子组件变更语言
    myI18nInstance.addChangeListen((lang)=>{
      this.setState({
        lang: lang
      });
      document.title = myI18nInstance.formatMessage({id:'entry.title'})
    })
  }
// ...省略一些代码
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
// ...省略一些代码
```

/child/childA.jsx：
```jsx
// /child/childA.jsx childA作为一个修改语言的组件
// ...省略一些代码
import enUS from "./locale/en-US";
import zhCN from "./locale/zh-CN";
// 载入组件childA特有的国际化文案
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
      // 这里可以通知入口文件entry.jsx进行语言切换，从而重新渲染页面
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
```

/child/childB.jsx：
```jsx
// /child/childB.jsx childB一个带参数国际化的例子
// ...省略一些代码
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
```

# API
## my-i18n 暴露的方法
|方法名     | 用途                                        | 参数                                                                    |           返回值类型            |
| -         | -                                           | -                                                                     | -                               |
|init       |初始化国际化实例切面化编程和基本国际化文案载入  |(nowInstanceFunc: Function(切面化实例函数), nowBase:Object(国际化数据,可选))    |              void              |
|getInstance| 获取国际化实例                              |(moduleData:Object(国际化数据,可选))                                          |   MyLocale(经过切面化的实例)     |

## MyLocale 方法
|方法名             | 用途                             | 参数                                                       |           返回值类型            |
| -                 | -                               | -                                                           | -                               |
|formatMessage      |通过id转换成功国际化文案           |(data: Object(id数据), params:(需要参数的文案需传,可选))       |              void              |
|getLang            |获取当前选择的语言                 | 无                                                          |              void              |
|setLang            |设置当前选择的语言                 |(nowLang: String|Object(id数据)                              |              Boolean              |
|changeLang         |设置当前选择的语言并执行Listen函数  |(nowLang: String|Object(id数据)                             |              void              |
|addChangeListen    |添加Listen的函数                  |(func:Function(Listen语言变化的函数))                         |              void              |
|removeChangeListen |移除Listen的函数                   |(func:Function(Listen语言变化的函数))                        |              void              |
|clearChangeListen  |清空全部Listen的函数               |无                                                          |              void              |
