<template>
  <div class="question-screen">
    <div class="container">
      <div class="buttons-box">
        <az-hex-timer
          v-if="root.timeoutActive"
          class="timer"
          :class="hexTimerClasses"
          :seconds="root.game ? root.game.timeout : 0"
        ></az-hex-timer>
        <az-hex class="back-button" on-tap="_onBackTap" hidden="[[!_isAnswered]]">
          <v-icon>mdi-arrow-left</v-icon>
        </az-hex>
        <az-hex
          class="current-hex"
          :hex-state="root.game ? root.game.currentTeam : 'teamA'"
          disabled
        >
          {{
          root.game && root.game.currentHex ? root.game.currentHex : "X"
          }}
        </az-hex>
      </div>
      <div class="question-box">
        <!-- Multiple choices -->
        <az-question-multiple-answers
          v-if="mode === 'multiple'"
          question="[[game.currentQuestion]]"
          answered="_isAnswered"
          correct="_correct"
        ></az-question-multiple-answers>

        <!-- One Answer Mode -->
        <az-question-single-answer
          v-if="mode === 'single'"
          question="[[game.currentQuestion]]"
          answered="_isAnswered"
          correct="_correct"
        ></az-question-single-answer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Root from "@/store/Root";
import { getModule } from "vuex-module-decorators";
import AzHex from "@/components/AzHex.vue";
import AzHexTimer from "@/components/AzHexTimer/index.vue";
import AzPyramid from "@/components/AzPyramid.vue";
import AzTeamIndicator from "@/components/AzTeamIndicator.vue";
import { Screen } from "@/store/types";

type Mode = "multiple" | "single";

@Component({
  components: { AzHex, AzHexTimer, AzPyramid, AzTeamIndicator }
})
export default class QuestionScreen extends Vue {
  root = getModule(Root);
  Screen = Screen;
  isExitDialogOpened = false;

  get mode(): Mode {
    return this.root.game?.currentQuestion &&
      this.root.game.currentQuestion.answers.length > 1
      ? "multiple"
      : "single";
  }

  get hexTimerClasses() {
    return {
      hidden: this.root.game ? this.root.game.isAnswered : false,
      [this.root.game ? this.root.game.currentTeam : "teamA"]: true
    };
  }
}
</script>

<style scoped lang="scss">
@import "~vuetify/src/styles/styles.sass";

.question-screen {
  display: block;
  line-height: 1.42857;
}

.container {
  display: flex;
  max-width: 730px;
  margin: 54px auto 0 auto;
}

.buttons-box {
  position: relative;
  width: 90px;
  height: 120px;
  margin-right: 15px;
}

.back-button,
.timer {
  position: absolute;
  top: 52px;
  right: 28px;
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(1, 1);
}

.back-button[hidden],
.timer[hidden] {
  display: initial !important;
  transform: scale(0);
}

/* Delay hex-timer animation especially when leaving the page
         so az-hex-timer's ghost doesn't reappear */
:host.neon-animating az-hex-timer {
  transition-delay: 0.28s;
}

.currentHex {
  position: absolute;
  top: 5px;
  right: 0;
}

.question-box {
  flex: 1;
  margin-right: 90px;
}

/* Not working in the shim,
         changed programatically. */
.timer.teamA {
  --az-hex-timer-color: #ff8427;
}

.timer.teamB {
  --az-hex-timer-color: #00d3d8;
}
</style>
