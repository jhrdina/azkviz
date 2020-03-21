
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '../roboto.js';
import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property } from "@polymer/decorators";

@customElement("az-hex")
export class AzHex extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
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

        :host[animate] {
          transition: color 1s;
        }

        :host[animate] .hex-path {
          transition: fill 1s;
        }

        :host[hex-state="teamA"] {
          color: var(--az-hex-team-a-text-color, #ffffff);
          cursor: default;
        }

        :host[hex-state="teamA"] .hex-path {
          fill: var(--az-hex-team-a-bkg-color, #ff8427);
        }

        :host[hex-state="teamB"] {
          color: var(--az-hex-team-b-text-color, #ffffff);
          cursor: default;
        }

        :host[hex-state="teamB"] .hex-path {
          fill: var(--az-hex-team-b-bkg-color, #00d3d8);
        }

        :host[hex-state="unknown"] {
          color: var(--az-hex-unknown-text-color, #ffffff);
        }

        :host[hex-state="unknown"] .hex-path {
          fill: var(--az-hex-unknown-bkg-color, #3e3e3e);
        }

        :host[disabled] {
          cursor: default;
        }

        svg {
          display: block;
          width: 100%;
        }

        .content-wrapper {
          @apply (--layout-fit);
          @apply (--layout);
          @apply (--layout-center);
          @apply (--layout-center-justified);

          font-size: 22px;
          font-weight: 500;
        }
      </style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51 59.000001">
        <path
          d="M51 44.222L25.5 58.945 0 44.222V14.778L25.5.055 51 14.778z"
          class="hex-path"
        ></path>
      </svg>
      <div class="content-wrapper">
        <content></content>
      </div>
    `;
  }

  @property({ type: String, reflectToAttribute: true })
  public hexState: string;
}
