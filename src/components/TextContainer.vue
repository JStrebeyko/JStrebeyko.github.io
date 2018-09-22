<template>
  <div class="box" @click="$emit('clicked')">
    <div class="main">
      {{juzi.chinese}}
    </div>
    <div class="left">{{juzi.pronunciation}}</div>
    <div class="right">{{juzi.english}}</div>
  </div>
</template>

<script>
export default {
  props: {
    juzi: {
      type: Object
    },
  },
  data() {
    return {

    }
  },
  methods: {
    changeStyle() {
      const num = Math.floor(Math.random*100)
      console.log(`style Changed to:: ${num}`)
    }
  },
  watch: {
    juzi() {
      console.log('watched juzi')
      this.changeStyle()
    }
  }
}
</script>

<style>

.box>.main {
    font-size:15rem;
    text-align:center;
    line-height:300px;
    text-shadow:0 1px 0 #ccc,
                -5px 5px 0 #c9c9c9,
                -6px 7px 0 #bbb,
                -7px 9px 0 #b9b9b9,
                -8px 11px 0 #aaa,
                -8px 13px 1px rgba(0,0,0,0.1),
                -8px 2px 5px rgba(0,0,0,0.1),
                -8px 2px 6px rgba(0,0,0,0.1),
                -8px 6px 10px rgba(0,0,0,0.1),
                -8px 10px 20px rgba(0,0,0,0.25),
                -8px 20px 20px rgba(0,0,0,0.2),
                -8px 30px 40px rgba(0,0,0,0.15)
}
</style>
