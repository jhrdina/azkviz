<template>
  <div class="wrapper">
    <div class="headerBox">
      <h1>
        <span style="font-weight: 300;">AZ</span>
        <span style="font-weight: 900;">Kvíz</span>
      </h1>
      <Hex class="openHex" title="Otevřít soubor" @click="onOpenClick">
        <v-icon color="#fff">mdi-folder</v-icon>
      </Hex>
      <input class="file" ref="file" type="file" @change="onFileChange" />
      <v-btn icon class="helpButton" @click="onHelpClick"
        ><v-icon>mdi-help-circle-outline</v-icon></v-btn
      >
    </div>

    <div class="footer">Copyright © 2020 Jan Hrdina</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Screen } from "@/store/types";
import Root from "@/store/Root";
import { getModule } from "vuex-module-decorators";
import Hex from "@/components/Hex.vue";

@Component({
  components: { Hex }
})
export default class WelcomeScreen extends Vue {
  root = getModule(Root);

  doStuff() {
    this.root.newGame({ timeout: 15, startingTeam: "teamA" });
  }

  get currentQuestionText() {
    console.log(this.root);
    return this.root.game?.currentQuestion?.text || "-";
  }

  onFileChange(event: { target: HTMLInputElement }) {
    if (!event.target.files?.[0]) return;

    this.root.loadFile(event.target.files[0]);

    this.resetFileInput();
  }

  private resetFileInput() {
    // Inspired by https://github.com/rnicholus/file-input

    // create a form with a hidden reset button
    const tempForm = document.createElement("form"),
      fileInput = this.$refs.file as Element;

    // temporarily move the `<input type="file">` into the form & add form to DOM
    fileInput.parentNode?.insertBefore(tempForm, fileInput);
    tempForm.appendChild(fileInput);

    // reset the form
    tempForm.reset();

    // move the `<input type="file">` back to its original spot & remove form
    tempForm.parentNode?.appendChild(fileInput);
    tempForm.parentNode?.removeChild(tempForm);
  }

  onOpenClick() {
    (this.$refs.file as HTMLInputElement).click();
  }

  onHelpClick() {
    this.root.setScreen(Screen.Help);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 35px;
}
.headerBox {
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;
}
.headerBox h1 {
  margin: 0 0.3em;
  font-family: "Roboto", sans-serif;
}

.openHex.openHex {
  --az-hex-width: 60px;
  color: #fff;
  --az-hex-bkg-color: #ff8427;
  cursor: pointer;
}

.footer {
  margin: 0.5em 1.7em 1.7em 1.7em;
  text-align: center;
  color: #777;
  font-size: 14px;
}

.footer a {
  color: inherit;
  font-size: 85%;
}

.file {
  display: none;
}
</style>
