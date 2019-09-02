<template>
  <span>
      {{myI18n.formatMessage({id:'child.childB.dearDaLaoDaiDaiMePlease'},{name:this.name})}}
  </span>
</template>

<script>
export default {
  props:['name'],
  components: {},
  data () {
    return {}
  },
}
</script>