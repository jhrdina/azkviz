<template>
  <v-app id="app">
    <PyramidScreen v-if="root.screen === Screen.Pyramid" />
    <QuestionScreen v-if="root.screen === Screen.Question" />
    <TeamSelectionScreen v-if="root.screen === Screen.TeamSelection" />
    <WelcomeScreen v-if="root.screen === Screen.Welcome" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TeamSelectionScreen from "./screens/TeamSelectionScreen.vue";
import WelcomeScreen from "./screens/WelcomeScreen.vue";
import PyramidScreen from "./screens/PyramidScreen.vue";
import QuestionScreen from "./screens/QuestionScreen.vue";
import { getModule } from "vuex-module-decorators";
import Root from "./store/Root";
import { Screen } from "./store/types";

@Component({
  components: {
    PyramidScreen,
    QuestionScreen,
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
