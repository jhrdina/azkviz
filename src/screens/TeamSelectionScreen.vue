<template>
  <div class="wrapper">
    {{ root.questions }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Root from "@/store/Root";
import { getModule } from "vuex-module-decorators";
import Hex from "@/components/Hex.vue";

@Component({
  components: { Hex }
})
export default class TeamSelectionScreen extends Vue {
  root = getModule(Root);
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
