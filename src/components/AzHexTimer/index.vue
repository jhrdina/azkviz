<template>
  <div class="az-hex-timer">
    <svg xmlns="http://www.w3.org/2000/svg" height="59" width="51">
      <path
        fill="#e6e6e6"
        d="M50.998 44.605l-25.504 14.75L-.01 44.63V15.183L25.494.432l25.504 14.723z"
      />
      <path ref="pie" class="pie" transform="translate(25.5,29.44)" :d="pieShape" />
      <path
        fill="#fff"
        d="M0 .118v14.72L25.5.117H0zm25.5 0L51 14.838V.117H25.5zM0 44.238v14.72h25.5L0 44.257zm25.5 14.72H51v-14.72l-25.5 14.72zM45.995 42.042l-20.508 11.86L4.98 42.063v-23.68l20.507-11.86 20.508 11.84z"
      />
    </svg>
    <div class="timer-label">{{ secondsLeft }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class AzHexTimer extends Vue {
  @Prop({ type: Number, default: 30 }) seconds!: number;
  @Prop({ type: Date, default: () => new Date(0) }) startTime!: Date;

  timerRunning = false;
  angle = 0;
  secondsLeft = 0;
  isPlayingSound = false;
  sound: HTMLAudioElement = new Audio(require("./sound.ogg"));

  created() {
    this.maybeStartAnimation();
  }

  @Watch("startTime")
  startTimeUpdated() {
    this.maybeStartAnimation();
  }

  maybeStartAnimation() {
    if (this.isActive() && !this.timerRunning) {
      this.timerRunning = true;
      window.requestAnimationFrame(this.animationFrame);
    }
  }

  beforeDestroy() {
    this.timerRunning = false;
  }

  animationFrame() {
    if (this.isActive() && this.timerRunning) {
      this.angle =
        ((new Date().getTime() - this.startTime.getTime()) /
          (this.endTime.getTime() - this.startTime.getTime())) *
        360;
      this.secondsLeft = Math.floor(
        (this.endTime.getTime() - new Date().getTime()) / 1000 + 1
      );
      if (this.secondsLeft === 3 && !this.isPlayingSound) {
        this.isPlayingSound = true;
        this.sound.play();
      }
      window.requestAnimationFrame(this.animationFrame);
    } else {
      this.timerRunning = false;
      this.angle = 360;
      this.secondsLeft = 0;
      this.isPlayingSound = false;
      this.$emit("finish");
    }
  }

  get endTime() {
    const endTime = new Date(this.startTime);
    endTime.setSeconds(endTime.getSeconds() + this.seconds);
    return endTime;
  }

  isActive() {
    return new Date() <= this.endTime;
  }

  get pieShape() {
    if (this.angle < 360) {
      const r = (this.angle * Math.PI) / 180,
        x = Math.sin(r) * 29.44,
        y = Math.cos(r) * -29.44,
        mid = this.angle > 180 ? 1 : 0;
      return "M 0 0 v -29.44 A 29.44 29.44 1 " + mid + " 1 " + x + " " + y + "";
    } else {
      return "M 0 -29.44 a 29.44 29.44 0 1 1 0 58.88 a 29.44 29.44 0 1 1 0 -58.88";
    }
  }
}
</script>

<style scoped>
.az-hex-timer {
  position: relative;
  width: 51px;
  height: 59px;
}

.timer-label {
  position: absolute;
  left: 0;
  top: 0;
  width: 51px;
  line-height: 59px;

  font-family: "Roboto", "Noto", sans-serif;
  text-align: center;

  font-size: 22px;
  font-weight: 500;
}

.pie {
  fill: var(--az-hex-timer-color, #ff8427);
}
</style>
