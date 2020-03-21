import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property } from "@polymer/decorators";
import { AzPyramidStates } from "../az-game-model/az-game-model";
import { AzHex } from "../az-hex/az-hex";

export interface AzHexTapEventDetail {
  hexElement: AzHex;
  hexNumber: number;
}

@customElement("az-pyramid")
export class AzPyramid extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          @apply (--layout-vertical);
          @apply (--layout-center-justified);
        }

        .pyramid-line {
          margin: -5px auto;
          text-align: center;
          font-size: 0;
        }

        .pyramid-line:first-child {
          margin-top: 0;
        }

        .pyramid-line:last-child {
          margin-bottom: 0;
        }

        az-hex {
          margin: 0 2.5px;
        }
      </style>
      <div class="pyramid-line">
        <az-hex hex-state="[[states.1]]" on-tap="_onHexTap">1</az-hex>
      </div>
      <div class="pyramid-line">
        <az-hex hex-state="[[states.2]]" on-tap="_onHexTap">2</az-hex>
        <az-hex hex-state="[[states.3]]" on-tap="_onHexTap">3</az-hex>
      </div>
      <div class="pyramid-line">
        <az-hex hex-state="[[states.4]]" on-tap="_onHexTap">4</az-hex>
        <az-hex hex-state="[[states.5]]" on-tap="_onHexTap">5</az-hex>
        <az-hex hex-state="[[states.6]]" on-tap="_onHexTap">6</az-hex>
      </div>
      <div class="pyramid-line">
        <az-hex hex-state="[[states.7]]" on-tap="_onHexTap">7</az-hex>
        <az-hex hex-state="[[states.8]]" on-tap="_onHexTap">8</az-hex>
        <az-hex hex-state="[[states.9]]" on-tap="_onHexTap">9</az-hex>
        <az-hex hex-state="[[states.10]]" on-tap="_onHexTap">10</az-hex>
      </div>
      <div class="pyramid-line">
        <az-hex hex-state="[[states.11]]" on-tap="_onHexTap">11</az-hex>
        <az-hex hex-state="[[states.12]]" on-tap="_onHexTap">12</az-hex>
        <az-hex hex-state="[[states.13]]" on-tap="_onHexTap">13</az-hex>
        <az-hex hex-state="[[states.14]]" on-tap="_onHexTap">14</az-hex>
        <az-hex hex-state="[[states.15]]" on-tap="_onHexTap">15</az-hex>
      </div>
      <div class="pyramid-line">
        <az-hex hex-state="[[states.16]]" on-tap="_onHexTap">16</az-hex>
        <az-hex hex-state="[[states.17]]" on-tap="_onHexTap">17</az-hex>
        <az-hex hex-state="[[states.18]]" on-tap="_onHexTap">18</az-hex>
        <az-hex hex-state="[[states.19]]" on-tap="_onHexTap">19</az-hex>
        <az-hex hex-state="[[states.20]]" on-tap="_onHexTap">20</az-hex>
        <az-hex hex-state="[[states.21]]" on-tap="_onHexTap">21</az-hex>
      </div>
      <div class="pyramid-line">
        <az-hex hex-state="[[states.22]]" on-tap="_onHexTap">22</az-hex>
        <az-hex hex-state="[[states.23]]" on-tap="_onHexTap">23</az-hex>
        <az-hex hex-state="[[states.24]]" on-tap="_onHexTap">24</az-hex>
        <az-hex hex-state="[[states.25]]" on-tap="_onHexTap">25</az-hex>
        <az-hex hex-state="[[states.26]]" on-tap="_onHexTap">26</az-hex>
        <az-hex hex-state="[[states.27]]" on-tap="_onHexTap">27</az-hex>
        <az-hex hex-state="[[states.28]]" on-tap="_onHexTap">28</az-hex>
      </div>
    `;
  }

  @property({ type: Object })
  public states: AzPyramidStates;

  private _onHexTap(event: MouseEvent) {
    var hexNum = parseInt((<AzHex>event.currentTarget).innerText);
    if (hexNum === NaN) {
      console.warn("Invalid hex number in hex", event.currentTarget);
      return;
    }

    this.dispatchEvent(
      new CustomEvent("hex-tap", {
        detail: <AzHexTapEventDetail>{
          hexNumber: hexNum,
          hexElement: event.currentTarget
        }
      })
    );
  }
}
