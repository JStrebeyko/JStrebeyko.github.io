<template>
  <div class="overlay"
      :style="style"
      @click="handleClick">
    <div class="box">
      <div class="main">
        {{juzi.chinese}}
      </div>
      <div class="left">{{juzi.pronunciation}}</div>
      <div class="right">{{juzi.english}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    juzi: {
      type: Object
    }
  },
  data() {
    return {
      styleNum: null,
      styles:{
        red: {
          backgroundColor: 'red',
          color: 'white'
        },
        white: {
          backgroundColor: 'white',
          color: 'red'
        },
        bigYellow: {
          backgroundColor: 'black',
          fontSize: '13rem',
          color: 'yellow'
        }
      },
    }
  },
  methods: {
    changeStyle() {
      const amount = Object.keys(this.styles).length
      const num = Math.floor(Math.random*amount)
      console.log(`style Changed to:: ${num}`
      )
    },
    handleClick() {
      // this.$emit('clicked')
      this.changeStyle()
      this.styleNum++
      console.log(`number of styles: ${Object.keys(this.styles).length}`)
    }
  },
  computed: {
    style() {
      if (this.styleNum == 0) {
        return this.styles.bigYellow
      } else if (this.styleNum == 1) {
        return this.styles.white
      } else if (this.styleNum == 2) {
        return this.styles.red
      } else {
        this.styleNum =0
      }
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
.overlay {
  background-color: rgba(0,0,0,0.1);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

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
