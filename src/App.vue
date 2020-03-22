<template>
  <v-app id="app">
    <WelcomeScreen v-if="root.screen === Screen.Welcome" />
    <TeamSelectionScreen v-if="root.screen === Screen.TeamSelection" />
  </v-app>
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
.v-application--wrap > * {
  flex: 1;
  width: 100%;
}
</style>
