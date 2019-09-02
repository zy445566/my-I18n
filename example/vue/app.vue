<template>
  <div>
    <child-a></child-a>
    <div>
    {{myI18n.formatMessage({id:'entry.inputYourNamePlease'})}}:
    <input v-model="yourName"/>
    </div>
    <div>
      {{myI18n.formatMessage({id:'entry.hello'})}},
      <child-b :name="yourName"></child-b>
    </div>
  </div>
</template>

<script>
import ChildA from "./child/childA.vue";
import ChildB from "./child/childB.vue";
export default {
  components: {ChildA,ChildB},
  data () {
    return {
      lang:this.myI18n.getLang(),
      yourName:'Tom'
    }
  },
  methods: {
    forceUpdateAll(nowComponent) {
      nowComponent.$forceUpdate();
      for(let child of nowComponent.$children) {
        this.forceUpdateAll(child)
      }
    }
  },
  created() {
    document.title = this.myI18n.formatMessage({id:'entry.title'})
    // 最外层组件监听语言变化，更新父实现下面子组件变更
    this.myI18n.addChangeListen((lang)=>{
      this.lang = lang;
      document.title = this.myI18n.formatMessage({id:'entry.title'});
      this.forceUpdateAll(this);
    })
  }
}
</script>