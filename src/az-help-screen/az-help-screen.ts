/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

interface AzOpenDemoEventDetail {
  binaryStream: any;
}

@component('az-help-screen')
class AzHelpScreen extends polymer.Base {

  private _onBackTap() {
    this.fire('back-tap');
  }

  private _onOpenButtonTap() {
    this.$.demoFileAjax.generateRequest();
  }

  private _onDemoFileResponse(e, detail) {
    var arraybuffer = detail.response;
    /* convert data to binary string */
    var data = new Uint8Array(arraybuffer);
    var arr = new Array();
    for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");

    this.fire('open-demo', <AzOpenDemoEventDetail> {
      binaryStream: bstr
    });
  }
}

AzHelpScreen.register();
