<template>
  <div id="">
    <quote-generator />
  </div>
</template>

<script>
import QuoteGenerator from "./components/QuoteGenerator.vue";

export default {
  name: "App",
  components: {
    QuoteGenerator,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
