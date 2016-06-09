/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

interface AzFileChangeDetail {
  file: Blob;
}

@component('az-welcome-screen')
class AzWelcomeScreen extends polymer.Base {

  private _onOpenButtonTap() {
    this.$.file.click();
  }

  private _onFileChange(e) {
    if (!e.target.files[0])
      return;

    this.fire('file-change', <AzFileChangeDetail>{
      file: e.target.files[0]
    });
  }
}

AzWelcomeScreen.register();
