/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

interface AzTeamSelectEventDetail {
  selectedTeam: 'teamA' | 'teamB' | 'random';
}

@component('az-team-selection-screen')
class AzTeamSelectionScreen extends polymer.Base {

  @property({ type: Boolean, notify: true, value: false })
  public timeoutActive: boolean;

  @property({ type: Number, notify: true })
  public timeoutSeconds: number;

  private _onBackTap() {
    this.fire('back-tap');
  }

  private _onTeamATap() {
    this.fire('team-select', <AzTeamSelectEventDetail> {
      selectedTeam: 'teamA'
    });
  }

  private _onTeamBTap() {
    this.fire('team-select', <AzTeamSelectEventDetail> {
      selectedTeam: 'teamB'
    });
  }

  private _onRandomTap() {
    this.fire('team-select', <AzTeamSelectEventDetail> {
      selectedTeam: 'random'
    });
  }
}

AzTeamSelectionScreen.register();
