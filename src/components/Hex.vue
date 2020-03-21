<template>
  <div class="wrapper" :class="[hexState]" @click="$emit('click')">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 59.000001">
      <path
        d="M51 44.222L25.5 58.945 0 44.222V14.778L25.5.055 51 14.778z"
        class="hex-path"
      />
    </svg>
    <div class="content-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Hex extends Vue {
  @Prop({ type: String, default: "teamA" }) readonly hexState!:
    | "teamA"
    | "teamB"
    | "unknown";
}
</script>

<style scoped>
.wrapper {
  display: inline-block;
  cursor: pointer;

  font-family: "Roboto", "Noto", sans-serif;

  position: relative;
  line-height: 1;
  width: var(--az-hex-width, 51px);
  height: calc(var(--az-hex-width, 51px) * 1.15463);
}

.hex-path {
  fill: var(--az-hex-bkg-color, #e9e9e9);
}

.wrapper[animate] {
  transition: color 1s;
}

.wrapper[animate] .hex-path {
  transition: fill 1s;
}

.wrapper.teamA {
  color: var(--az-hex-team-a-text-color, #ffffff);
  cursor: default;
}

.wrapper.teamA .hex-path {
  fill: var(--az-hex-team-a-bkg-color, #ff8427);
}

.wrapper.teamB {
  color: var(--az-hex-team-b-text-color, #ffffff);
  cursor: default;
}

.wrapper.teamB .hex-path {
  fill: var(--az-hex-team-b-bkg-color, #00d3d8);
}

.wrapper.unknown {
  color: var(--az-hex-unknown-text-color, #ffffff);
}

.wrapper.unknown .hex-path {
  fill: var(--az-hex-unknown-bkg-color, #3e3e3e);
}

.wrapper[disabled] {
  cursor: default;
}

svg {
  display: block;
  width: 100%;
}

.content-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;

  align-items: center;
  justify-content: center;

  font-size: 22px;
  font-weight: 500;
}
</style>
