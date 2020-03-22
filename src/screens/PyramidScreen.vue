<template>
  <div class="pyramid-screen">
    <v-btn
      icon
      class="back-button"
      :class="{ white: root.game && root.game.finished }"
      @click="isExitDialogOpened = true"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <az-team-indicator
      :finished="root.game ? root.game.finished : false"
      :team="root.game ? root.game.currentTeam : 'teamA'"
    ></az-team-indicator>
    <az-pyramid
      class="pyramid"
      :states="root.game ? root.game.pyramid : {}"
      @hex-click="onHexClick"
    >
    </az-pyramid>

    <v-dialog
      class="exitDialog"
      v-model="isExitDialogOpened"
      max-width="540"
      modal
    >
      <v-card>
        <v-card-title>Ukončit hru?</v-card-title>
        <v-card-text>
          Opravdu se chcete vrátit na úvodní obrazovku? Rozehraná hra bude
          ztracena.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="isExitDialogOpened = false"
            >Zrušit</v-btn
          >
          <v-btn text color="primary" @click="endGame">Ukončit hru</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Root from "@/store/Root";
import { getModule } from "vuex-module-decorators";
import AzHex from "@/components/AzHex.vue";
import AzPyramid from "@/components/AzPyramid.vue";
import AzTeamIndicator from "@/components/AzTeamIndicator.vue";
import { Screen } from "@/store/types";

@Component({
  components: { AzHex, AzPyramid, AzTeamIndicator }
})
export default class PyramidScreen extends Vue {
  root = getModule(Root);
  Screen = Screen;
  isExitDialogOpened = false;

  onHexClick(hexNum: number) {
    this.root.pyramidHexClicked(hexNum);
  }

  endGame() {
    this.isExitDialogOpened = false;
    this.root.setScreen(Screen.Welcome);
  }
}
</script>

<style scoped lang="scss">
@import "~vuetify/src/styles/styles.sass";

.pyramid-screen {
  display: flex;
  flex-direction: column;
}

.back-button {
  position: absolute;
  top: 4px;
  left: 4px;
  z-index: 10;
  transition: color 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.white {
  color: white;
}

.pyramid {
  flex: 1;
}
</style>
