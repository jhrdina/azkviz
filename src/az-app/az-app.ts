/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-app')
class AzApp extends polymer.Base {

  screen: string = 'welcome';

  private _onFileChange(e, detail) {
    var reader = new FileReader();

    reader.addEventListener('load', e => {
      (<AzQuestionsModel>this.$.questionsModel).parseXLSX(e.target.result);
      this.screen = 'pyramid';
    });

    reader.readAsBinaryString(detail.file);
  }

  private _goToWelcomeScreen() {
    this.screen = 'welcome';
  }
}

AzApp.register();
