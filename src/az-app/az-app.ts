/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-app')
class AzApp extends polymer.Base {

  $: {
    gameModel: AzGameModel;
    questionsModel: AzQuestionsModel;
  };

  game: AzGame | undefined;
  screen: string = 'welcome';
  _hexNumber: number;

  pageEntryAnimation: string | undefined;
  pageExitAnimation: string | undefined;

  @observe('screen')
  private _screenChanged(screen): void {
    switch (screen) {
      case 'pyramid':
      case 'question':
        window.onbeforeunload = () => {
          return 'Opravdu si přejete opustit AZKvíz? Rozehraná hra bude ztracena!';
        };
        break;
      default:
        window.onbeforeunload = () => { return null };
        break;
    }
  }

  private _onFileChange(event: Event, detail: AzFileChangeDetail) {
    var reader = new FileReader();

    reader.addEventListener('load', e => {
      this.$.questionsModel.parseXLSX((<FileReader>e.target).result);

      this._setAnimation('right');
      this.screen = 'team';
    });

    reader.readAsBinaryString(detail.file);
  }

  private _onTeamSelect(event: Event, detail: AzTeamSelectEventDetail) {
    var team = detail.selectedTeam !== 'random' ? detail.selectedTeam : undefined;
    this.$.gameModel.newGame(<any>team);
    this._goToPyramid();
  }

  private _onPyramidHexTap(event: Event, detail: AzHexTapEventDetail): void {
    if (!this.$.gameModel.hexIsAvailable(detail.hexNumber)) {
      return;
    }

    this.$.gameModel.newQuestion();

    this._hexNumber = detail.hexNumber;
    this._setAnimation(undefined);
    this.screen = 'question';
  }

  private _onOpenHelp() {
    this._setAnimation('right');
    this.screen = 'help';
  }

  private _onAnswerSelect(event: Event, detail: AzSelectAnswerEventDetail): void {
    this.$.gameModel.selectAnswer(detail.correct, this._hexNumber);
  }

  private _onQuestionBackTap(event: Event) {
    this._setAnimation(undefined);
    this.screen = 'pyramid';
  }

  private _onHelpBackTap(event: Event) {
    this._setAnimation('left');
    this.screen = 'welcome';
  }

  private _onHelpOpenDemo(event: Event, detail: AzOpenDemoEventDetail) {
    this.$.questionsModel.parseXLSX(detail.binaryStream);

    this._setAnimation('right');
    this.screen = 'team';
  }

  private _setAnimation(direction: string | undefined) {
    switch (direction) {
      case 'left':
        this.pageEntryAnimation = 'slide-from-left-animation';
        this.pageExitAnimation = 'slide-right-animation';
        break;
      case 'right':
        this.pageEntryAnimation = 'slide-from-right-animation';
        this.pageExitAnimation = 'slide-left-animation';
        break;
      default:
        this.pageEntryAnimation = undefined;
        this.pageExitAnimation = undefined;
        break;
    }
  }

  private _goToWelcomeScreen() {
    this._setAnimation('left');
    this.screen = 'welcome';
  }

  private _goToPyramid() {
    this._setAnimation('right');
    this.screen = 'pyramid';
  }
}

AzApp.register();
