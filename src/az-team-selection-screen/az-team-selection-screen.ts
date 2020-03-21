import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property } from "@polymer/decorators";

interface AzTeamSelectEventDetail {
  selectedTeam: "teamA" | "teamB" | "random";
}

@customElement("az-team-selection-screen")
class AzTeamSelectionScreen extends PolymerElement {
  @property({ type: Boolean, notify: true })
  public timeoutActive: boolean = false;

  @property({ type: Number, notify: true })
  public timeoutSeconds: number;

  private _onBackTap() {
    this.dispatchEvent(new CustomEvent("back-tap"));
  }

  private _onTeamATap() {
    this.dispatchEvent(
      new CustomEvent("team-select", {
        detail: <AzTeamSelectEventDetail>{
          selectedTeam: "teamA"
        }
      })
    );
  }

  private _onTeamBTap() {
    this.dispatchEvent(
      new CustomEvent("team-select", {
        detail: <AzTeamSelectEventDetail>{
          selectedTeam: "teamB"
        }
      })
    );
  }

  private _onRandomTap() {
    this.dispatchEvent(
      new CustomEvent("team-select", {
        detail: <AzTeamSelectEventDetail>{
          selectedTeam: "random"
        }
      })
    );
  }
}
