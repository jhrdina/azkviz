import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property } from "@polymer/decorators";

@customElement("az-timer-setup")
class AzTimerSetup extends PolymerElement {
  @property({ type: Boolean, notify: true })
  public active = false;

  @property({ type: Number, notify: true })
  public time = 30;

  @property({ type: String, computed: "active" })
  public _timerIcon(active): string {
    return active ? "az:timer" : "az:timer-off";
  }
}
