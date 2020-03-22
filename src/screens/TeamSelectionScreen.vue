<template>
  <div class="team-selection-screen">
    <v-btn icon class="back-button" @click="root.setScreen(Screen.Welcome)">
      <v-icon color="#000">mdi-arrow-left</v-icon>
    </v-btn>
    <div class="who-box">
      <div class="who-text">Kdo začne?</div>
      <div class="who-buttons">
        <az-hex
          class="team-a-button"
          @click="root.teamSelected('teamA')"
        ></az-hex>
        <az-hex class="random-button" @click="root.teamSelected('random')"
          >?</az-hex
        >
        <az-hex
          class="team-b-button"
          @click="root.teamSelected('teamB')"
        ></az-hex>
      </div>
    </div>
    <div class="timer-setup">
      <v-btn
        class="timer-icon"
        :class="{ active: root.timeoutActive }"
        icon
        @click="root.toggleTimer()"
        :active="root.timeoutActive"
        ><v-icon>{{
          root.timeoutActive ? "mdi-timer-outline" : "mdi-timer-off-outline"
        }}</v-icon></v-btn
      >
      <div class="right-box">
        <div v-show="root.timeoutActive">
          <span class="label">Časový limit </span>
          <v-text-field
            dense
            class="timeout-input"
            size="2"
            min="1"
            max="999"
            maxlength="3"
            type="number"
            :value="root.timeoutSeconds"
            @input="onTimeoutChange"
            @blur="onTimeoutBlur"
          ></v-text-field
          >s
        </div>
        <div v-show="!root.timeoutActive">
          <span class="label">Bez časového limitu</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Root from "@/store/Root";
import { getModule } from "vuex-module-decorators";
import AzHex from "@/components/AzHex.vue";
import { Screen } from "@/store/types";

@Component({
  components: { AzHex }
})
export default class TeamSelectionScreen extends Vue {
  root = getModule(Root);
  Screen = Screen;

  onTimeoutChange(value: string) {
    this.root.setTimeout(parseInt(value));
  }

  onTimeoutBlur() {
    this.root.limitTimeout();
  }
}
</script>

<style scoped lang="scss">
@import "~vuetify/src/styles/styles.sass";

.team-selection-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.back-button {
  position: absolute;
  top: 4px;
  left: 4px;
}

.who-text {
  font-family: "Roboto Condensed", sans-serif;
  font-size: 33px;
  margin-bottom: 10px;
  text-align: center;
}

.who-buttons > * + * {
  margin-left: 4px;
}

.team-a-button {
  color: #fff;
  --az-hex-bkg-color: #ff8427;
}

.team-b-button {
  color: #fff;
  --az-hex-bkg-color: #00d3d8;
}

.random-button {
  color: #fff;
  --az-hex-bkg-color: #3e3e3e;
}

.timer-setup {
  margin: 8px 0 20px -8px;
  display: flex;
  font-family: "Roboto", "Noto", sans-serif;
  font-size: 14px;
  color: map-deep-get($material-light, "text", "secondary");
}

.timer-icon.active.active {
  color: var(--v-primary-base);
}

.right-box {
  height: 40px;
}

.right-box .label {
  line-height: 40px;
}

.timeout-input {
  margin-top: -20px;
  width: 2.4em;

  /* Chrome, Safari, Edge, Opera */
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  ::v-deep input[type="number"] {
    -moz-appearance: textfield;
  }
}

.right-box,
.timeout-input {
  display: inline-block;
}
</style>
