<template>
  <div id="app">
    <WelcomeScreen v-if="root.screen === Screen.Welcome" />
    <TeamSelectionScreen v-if="root.screen === Screen.TeamSelection" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TeamSelectionScreen from "./screens/TeamSelectionScreen.vue";
import WelcomeScreen from "./screens/WelcomeScreen.vue";
import { getModule } from "vuex-module-decorators";
import Root from "./store/Root";
import { Screen } from "./store/types";

@Component({
  components: {
    TeamSelectionScreen,
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
  display: flex;
  height: 100vh;
  flex-direction: column;
}

#app > * {
  flex: 1;
  width: 100%;
}
</style>
