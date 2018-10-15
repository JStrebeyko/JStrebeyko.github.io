<template>
  <div class="hello">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  min-width: 100vw;
  min-height: 100vh;
  background-color: black;
  color: white;
  font-size: 7rem;
}
</style>
