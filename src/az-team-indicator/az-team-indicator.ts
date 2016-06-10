/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-team-indicator')
@behavior(Polymer['NeonAnimationRunnerBehavior'])
class AzTeamIndicator extends polymer.Base {

  // From NeonAnimationRunnerBehavior:
  playAnimation: () => void;

  //=================================================================

  @property({ type: String, value: 'teamA', reflectToAttribute: true })
  public team: string;

  @property({ type: Boolean, value: false })
  public noWave: boolean;

  @property({ type: Object, value: function() {
    return {
      name: 'wave-animation',
      node: this.$.wave,
      timing: {
        "duration": 1500,
        "easing": 'cubic-bezier(0.4, 0, 0.2, 1)',
        "fill": 'both',
        delay: 200
      }
    };
  }})
  public animationConfig: any;

  @observe('team')
  private _teamChanged(team): void {
    if (!this.noWave) {
      this.playAnimation();
    }
  }
}

AzTeamIndicator.register();
