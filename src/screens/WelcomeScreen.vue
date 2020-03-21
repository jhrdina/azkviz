<template>
  <div>
    <div class="headerBox">
      <h1>
        <span style="font-weight: 300;">AZ</span>
        <span style="font-weight: 900;">Kvíz</span>
      </h1>
      <Hex class="openHex" title="Otevřít soubor" on-tap="_onOpenButtonTap">
        <iron-icon icon="az:folder"></iron-icon>
      </Hex>
      <input class="file" type="file" on-change="_onFileChange" />
      <paper-icon-button class="helpButton" icon="az:help-outline" on-tap="_onHelpButtonTap"></paper-icon-button>
    </div>

    <div class="footer">Copyright © 2020 Jan Hrdina</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Team } from "@/store/types";
import Root from "@/store/Root";
import { getModule } from "vuex-module-decorators";
import Hex from "@/components/Hex";

@Component({
  components: {
    Hex
  }
})
export default class WelcomeScreen extends Vue {
  store = getModule(Root);

  doStuff() {
    this.store.newGame({ timeout: 15, startingTeam: Team.A });
  }

  get currentQuestionText() {
    console.log(this.store);
    return this.store.game?.currentQuestion?.text || "-";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 35px;
}
.headerBox {
  display: flex;
  align-items: center;
}
.headerBox h1 {
  margin: 0 0.3em;
  font-family: "Roboto", sans-serif;
}

.openHex {
  --az-hex-width: 60px;
  color: #fff;
  --az-hex-bkg-color: #ff8427;
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

.helpButton {
  color: var(--secondary-text-color);
}
</style>
