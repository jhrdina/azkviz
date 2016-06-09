/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

interface AzTeamSelectEventDetail {
  selectedTeam: 'teamA' | 'teamB' | 'random';
}

@component('az-team-selection-screen')
class AzTeamSelectionScreen extends polymer.Base {

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
