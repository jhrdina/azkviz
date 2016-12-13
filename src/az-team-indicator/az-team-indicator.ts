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

  @property({ type: Boolean, value: false, reflectToAttribute: true })
  public finished: boolean;

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

  @observe('finished')
  private _finishedChanged(finished): void {
    if (finished) {
      window.addEventListener("resize", this._onWindowResize.bind(this));
    } else {
      window.removeEventListener('resize', this._onWindowResize.bind(this));
    }
    this._updateWidth(100);
  }

  private _onWindowResize() {
    this._updateWidth(100);
  }

  private _updateWidth(height: number): void {
    const panelHeight = 48;
    height = Math.max(height, panelHeight + 1)
    if (this.finished) {
      this.$.triangle.style.width = (this.clientWidth * height) / (height - panelHeight) + 'px';
      this.$.triangle.style.height = height + 'px';
    } else {
      this.$.triangle.style.width = '';
      this.$.triangle.style.height = '';
    }
  }
}

AzTeamIndicator.register();
