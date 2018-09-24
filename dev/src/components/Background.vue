<template>
  <div class="background">
    <slot name="box"></slot>
  </div>
</template>

<script>
export default {
  props: {
    styleNum: Number
  },
  created() {
    this.changeStyle()
  },
  methods: {
    changeStyle() {
      console.log("change Style")

    }
  }
}
</script>

<style>

</style>
