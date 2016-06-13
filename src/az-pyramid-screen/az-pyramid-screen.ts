/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-pyramid-screen')
@behavior(Polymer['NeonSharedElementAnimatableBehavior'])
class AzPyramidScreen extends polymer.Base {

  @property({ type: Object })
  public game: AzGame;

  @property({ type: Object, value: function() {
    return {
      'entry': [{
        name: 'hero-animation',
        id: 'hero',
        toPage: this
      }, {
        name: 'fade-in-animation',
        node: this
      }],
      'exit': [{
        name: 'hero-animation',
        id: 'hero',
        fromPage: this
      }, {
        name: 'fade-out-animation',
        node: this
      }]
    };
  }})
  public animationConfig: any;

  public sharedElements: any;

  private _onBackTap() {
    this.$.exitDialog.open();
  }

  private _onHexTap(event: Event, detail: AzHexTapEventDetail) {
    // Configure the page animation
    this.sharedElements = {
      'hero': detail.hexElement
    };
  }

  private _onExitDialogClosed(event: Event, detail) {
    if (detail.confirmed) {
      this.fire('back-tap');
    }
  }
}

AzPyramidScreen.register();
