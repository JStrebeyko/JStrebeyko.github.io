<template>
  <div class="hello-wrapper">
    <span class="hanzi">
      {{msg}}
      </span>
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
.hello-wrapper {
  min-width: 100vw;
  min-height: 100vh;
  background: black;
  color: white;
  .hanzi {
    font-size: 7rem;
  }
}
</style>
