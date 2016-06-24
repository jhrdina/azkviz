/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

@component('az-timer-setup')
class AzTimerSetup extends polymer.Base {

  @property({ type: Boolean, notify: true, value: false })
  public active: string;

  @property({ type: Number, notify: true, value: 30 })
  public time: number;


  @property({computed: 'active'})
  public _timerIcon(active): string {
    return active ? 'az:timer' : 'az:timer-off';
  }
}

AzTimerSetup.register();
