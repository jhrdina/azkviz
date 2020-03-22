<template>
  <div class="az-pyramid">
    <div class="pyramid-line">
      <az-hex :hex-state="states[1]" @click="onHexClick">1</az-hex>
    </div>
    <div class="pyramid-line">
      <az-hex :hex-state="states[2]" @click="onHexClick">2</az-hex>
      <az-hex :hex-state="states[3]" @click="onHexClick">3</az-hex>
    </div>
    <div class="pyramid-line">
      <az-hex :hex-state="states[4]" @click="onHexClick">4</az-hex>
      <az-hex :hex-state="states[5]" @click="onHexClick">5</az-hex>
      <az-hex :hex-state="states[6]" @click="onHexClick">6</az-hex>
    </div>
    <div class="pyramid-line">
      <az-hex :hex-state="states[7]" @click="onHexClick">7</az-hex>
      <az-hex :hex-state="states[8]" @click="onHexClick">8</az-hex>
      <az-hex :hex-state="states[9]" @click="onHexClick">9</az-hex>
      <az-hex :hex-state="states[10]" @click="onHexClick">10</az-hex>
    </div>
    <div class="pyramid-line">
      <az-hex :hex-state="states[11]" @click="onHexClick">11</az-hex>
      <az-hex :hex-state="states[12]" @click="onHexClick">12</az-hex>
      <az-hex :hex-state="states[13]" @click="onHexClick">13</az-hex>
      <az-hex :hex-state="states[14]" @click="onHexClick">14</az-hex>
      <az-hex :hex-state="states[15]" @click="onHexClick">15</az-hex>
    </div>
    <div class="pyramid-line">
      <az-hex :hex-state="states[16]" @click="onHexClick">16</az-hex>
      <az-hex :hex-state="states[17]" @click="onHexClick">17</az-hex>
      <az-hex :hex-state="states[18]" @click="onHexClick">18</az-hex>
      <az-hex :hex-state="states[19]" @click="onHexClick">19</az-hex>
      <az-hex :hex-state="states[20]" @click="onHexClick">20</az-hex>
      <az-hex :hex-state="states[21]" @click="onHexClick">21</az-hex>
    </div>
    <div class="pyramid-line">
      <az-hex :hex-state="states[22]" @click="onHexClick">22</az-hex>
      <az-hex :hex-state="states[23]" @click="onHexClick">23</az-hex>
      <az-hex :hex-state="states[24]" @click="onHexClick">24</az-hex>
      <az-hex :hex-state="states[25]" @click="onHexClick">25</az-hex>
      <az-hex :hex-state="states[26]" @click="onHexClick">26</az-hex>
      <az-hex :hex-state="states[27]" @click="onHexClick">27</az-hex>
      <az-hex :hex-state="states[28]" @click="onHexClick">28</az-hex>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { PyramidStates } from "../store/types";
import AzHex from "./AzHex.vue";

@Component({
  components: { AzHex }
})
export default class AzPyramid extends Vue {
  @Prop({ type: Object }) readonly states!: PyramidStates;

  onHexClick(hexNum: number) {
    if (isNaN(hexNum)) return;
    this.$emit("hex-click", hexNum);
  }
}
</script>

<style scoped lang="scss">
.az-pyramid {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.pyramid-line {
  margin: -5px auto;
  text-align: center;
  font-size: 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.hex {
  margin: 0 2.5px;
}
</style>
