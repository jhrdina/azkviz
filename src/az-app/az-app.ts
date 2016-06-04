/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-app')
class AzApp extends polymer.Base {

  private _onFileChange(e, detail) {
    var reader = new FileReader();

    reader.addEventListener('load', e => {
      console.log(JSON.parse((<any>e.target).result));
    });

    reader.readAsText(detail.file);
  }
}

AzApp.register();
