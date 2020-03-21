<template>
  <div id="app">
    <WelcomeScreen v-if="root.screen === Screen.Welcome" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WelcomeScreen from "./screens/WelcomeScreen.vue";
import { getModule } from "vuex-module-decorators";
import Root from "./store/Root";
import { Screen } from "./store/types";

@Component({
  components: {
    WelcomeScreen
  }
})
export default class App extends Vue {
  root = getModule(Root);
  Screen = Screen;
}
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
