/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-app')
class AzApp extends polymer.Base {

  $: {
    gameModel: AzGameModel;
    questionsModel: AzQuestionsModel;
  }

  screen: string = 'welcome';
  _hexNumber: number;

  private _onFileChange(e, detail: AzFileChangeDetail) {
    var reader = new FileReader();

    reader.addEventListener('load', e => {
      this.$.questionsModel.parseXLSX((<FileReader>e.target).result);
      this.screen = 'team';
    });

    reader.readAsBinaryString(detail.file);
  }

  private _onTeamSelect(e, detail: AzTeamSelectEventDetail) {
    var team = detail.selectedTeam !== 'random' ? detail.selectedTeam : undefined;
    this.$.gameModel.newGame(<any>team);
    this.screen = 'pyramid';
  }

  private _onPyramidHexTap(event: Event, detail: AzHexTapEventDetail): void {
    this._hexNumber = detail.hexNumber
    this.screen = 'question';
  }

  private _onAnswerSelect(event: Event, detail: AzSelectAnswerEventDetail): void {
    this.$.gameModel.selectAnswer(detail.correct, this._hexNumber);
  }

  private _goToWelcomeScreen() {
    this.screen = 'welcome';
  }

  private _goToPyramid() {
    this.screen = 'pyramid';
  }
}

AzApp.register();
