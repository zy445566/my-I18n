# my-I18n
只需引用就可以实现前端国际化的框架(I18n for front)

# 安装
```sh
npm install my-i18n --save
```

# 例子
### React
React例子源码地址：[https://github.com/zy445566/zy445566.github.io/tree/master/my-I18n/react](https://github.com/zy445566/zy445566.github.io/tree/master/my-I18n/react)

React例子展示地址：[https://zy445566.github.io/my-I18n/react](https://zy445566.github.io/my-I18n/react)

### Vue
Vue例子源码地址：[https://github.com/zy445566/zy445566.github.io/tree/master/my-I18n/vue](https://github.com/zy445566/zy445566.github.io/tree/master/my-I18n/vue)

Vue例子展示地址：[https://zy445566.github.io/my-I18n/vue](https://zy445566.github.io/my-I18n/vue)



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
|setLang            |设置当前选择的语言                 |(nowLang: String\|Object(id数据))                              |              Boolean              |
|changeLang         |设置当前选择的语言并执行Listen函数  |(nowLang: String\|Object(id数据))                             |              void              |
|addChangeListen    |添加Listen的函数                  |(func:Function(Listen语言变化的函数))                         |              void              |
|removeChangeListen |移除Listen的函数                   |(func:Function(Listen语言变化的函数))                        |              void              |
|clearChangeListen  |清空全部Listen的函数               |无                                                          |              void              |
