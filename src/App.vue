<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
// .box>.main {
//     font-size:15rem;
//     text-align:center;
//     line-height:300px;
//     text-shadow:0 1px 0 #ccc,
//                 -5px 5px 0 #c9c9c9,
//                 -6px 7px 0 #bbb,
//                 -7px 9px 0 #b9b9b9,
//                 -8px 11px 0 #aaa,
//                 -8px 13px 1px rgba(0,0,0,0.1),
//                 -8px 2px 5px rgba(0,0,0,0.1),
//                 -8px 2px 6px rgba(0,0,0,0.1),
//                 -8px 6px 10px rgba(0,0,0,0.1),
//                 -8px 10px 20px rgba(0,0,0,0.25),
//                 -8px 20px 20px rgba(0,0,0,0.2),
//                 -8px 30px 40px rgba(0,0,0,0.15)
// }
</style>
