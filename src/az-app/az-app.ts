/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-app')
class AzApp extends polymer.Base {

  screen: string = 'welcome';
  _hexNumber: number;

  private _onFileChange(e, detail) {
    var reader = new FileReader();

    reader.addEventListener('load', e => {
      (<AzQuestionsModel>this.$.questionsModel).parseXLSX(e.target.result);
      this.screen = 'team';
    });

    reader.readAsBinaryString(detail.file);
  }

  private _onTeamSelect(e, detail) {
    var team = detail.selectedTeam !== 'random' ? detail.selectedTeam : undefined;
    this.$.gameModel.newGame(team);
    this.screen = 'pyramid';
  }

  private _onPyramidHexTap(event: Event, detail): void {
    this._hexNumber = detail.hexNumber
    this.screen = 'question';
  }

  private _onAnswerSelect(event: Event, detail): void {
    (<AzGameModel>this.$.gameModel).selectAnswer(detail.correct, this._hexNumber);
  }

  private _goToWelcomeScreen() {
    this.screen = 'welcome';
  }

  private _goToPyramid() {
    this.screen = 'pyramid';
  }
}

AzApp.register();
