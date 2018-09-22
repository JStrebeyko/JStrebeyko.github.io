<template>
    <div class="home" @click="handleClick">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <text-container slot="box"
        :juzi="juziObj"
      />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import TextContainer from '@/components/TextContainer.vue'
import Background from '@/components/Background.vue'

import axios from 'axios'


export default {
  name: 'home',
  data() {
    return {
      juziList: null,
      juziObj: {},
      index: null,
      // styleObj={}
    }
  },
  components: {
    TextContainer,
    Background
  },
  created() {
    this.setIndex()
    this.getJuziList()
    // this.setJuziObj()
  },
  methods: {
    getJuziList() {
      const self=this
      let list = axios('http://fortunecookieapi.herokuapp.com/v1/lessons/')
        .then( (response) => {
          self.juziList = response.data
          // self.setJuziObj()
          console.log(`oto juzilist: ${this.juziList}`)
          this.setJuziObj()
        })
    },
    setIndex() {
      const int = Math.floor(Math.random()*100)
      this.index = int
    },
    setJuziObj() {
      this.setIndex()
      let newObj  = this.juziList[this.index]
      this.juziObj=newObj
    },
    handleClick() {
      this.setJuziObj()
      console.log(`this.init ${this.index}`)
 }
    // },

    // getRandomInt() {
    // },
    // watch: {
    //   index: {
    //     handler: function() {
    //       this.setJuziObj(this.index)
    //     }

    //   }
    // }
  }
}
</script>
