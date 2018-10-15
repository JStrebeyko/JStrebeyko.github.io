<template>
  <div class="hello" @click="isSwapped=!isSwapped">
    <div class="main-header" :style="{color: isSwapped ? 'black' :color, backgroundColor: isSwapped ? color:'black'}">
    {{hanzi.chinese}}
    </div>
    <div class="controls">

    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String
    },
    color: {
      type: String
    },
    hanzi: {
      type: Object
    }
  },
  data() {
    return {
      isSwapped: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  .main-header{
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 17rem;
    min-width:95vw;
    min-height: 100vh;
    font-family: monospace;
    transition: 5000ms;
  }
  .controls {
    min-height: 20vh;
    background: red;
  }

}
</style>
