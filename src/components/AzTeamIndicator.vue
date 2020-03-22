<template>
  <div class="az-team-indicator" :class="[team, finishedClass]">
    <svg class="triangle" viewBox="0 0 80.000001 20" preserveAspectRatio="none">
      <path d="M0-.03h80L40 19.95z" />
    </svg>
    <div class="wave"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Team } from "../store/types";

@Component
export default class AzTeamIndicator extends Vue {
  @Prop({ type: String }) readonly team!: Team;
  @Prop({ type: Boolean }) readonly finished!: boolean;

  get finishedClass() {
    return this.finished ? "finished" : "";
  }
}
</script>

<style scoped lang="scss">
.az-team-indicator {
  display: block;
  margin: auto;
  position: relative;

  &.finished {
    width: 100%;
    height: auto;
  }

  &.teamA {
    .triangle {
      fill: var(--az-team-indicator-team-a-color, #ff8427);
    }
    .wave {
      background-color: var(--az-team-indicator-team-a-color, #ff8427);
    }
  }

  &.teamB {
    .triangle {
      fill: var(--az-team-indicator-team-b-color, #00d3d8);
    }
    .wave {
      background-color: var(--az-team-indicator-team-b-color, #00d3d8);
    }
  }
}

.triangle {
  width: 80px;
  height: 20px;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  transition: width 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    height 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.wave {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;

  border-radius: 50%;
  width: 200px;
  height: 200px;
  background-color: var(--az-team-indicator-team-a-color, #ff8427);
}
</style>
