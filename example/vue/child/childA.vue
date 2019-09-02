<template>
   <span>
          {{myI18nInstance.formatMessage({id:'child.childA.selectLanguage'})}}:
          <select
            v-model="lang"
            @change="changeLang">
            <option v-for="(item, index) in langList" :key="index" :value="item.id">
              {{item.name}}
            </option>
          </select>
        </span>
</template>

<script>
import myI18n from "my-i18n";
import enUS from "./locale/en-US";
import zhCN from "./locale/zh-CN";
const myI18nInstance = myI18n.getInstance({
  'zh-CN':zhCN,
  'en-US':enUS
})
export default {
  components: {},
  data () {
    return {
      myI18nInstance:myI18nInstance,
      langList: [{id:'zh-CN',name:'简体中文'},{id:'en-US',name:'English'}],
      lang: myI18nInstance.getLang()
    }
  },
  methods: {
    changeLang() {
      myI18nInstance.changeLang(this.lang);
    }
  },
}
</script>