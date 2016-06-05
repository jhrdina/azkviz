/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

interface AzGame {
  currentTeam: string;
  currentHex?: number;
  currentQuestion?: AzQuestion;
  pyramid: AzPyramidStates;
}

interface AzPyramidStates {
  [hexNumber:number]: 'teamA'|'teamB'|'unknown';
}

@component('az-game-model')
class AzGameModel extends polymer.Base {

  @property({ type: Object, value: [] })
  public questions: Array<AzQuestion>;

  @property({ type: Object, notify: true })
  public game: AzGame;

  private _remainingQuestions: Array<AzQuestion>;

  public newGame(startingTeam?: 'teamA' | 'teamB') {
    this.game = {
      currentTeam: startingTeam || AzGameModel._getRandomTeam(),
      pyramid: {}
    };
    this._newQuestion();
  }

  private _newQuestion(): void {
    // TODO: handle not initialized game
    if (!this._remainingQuestions || this._remainingQuestions.length === 0) {
      this._remainingQuestions = this.questions.slice();
    }

    var i = AzGameModel._getRandomInt(this._remainingQuestions.length);
    // Deep copy selected question
    var question: AzQuestion = JSON.parse(JSON.stringify(this._remainingQuestions[i]));
    // Remove from remaining questions so it cannot be generated again
    this._remainingQuestions.splice(i, 1);
    // Shuffle answers
    AzGameModel._shuffleArray(question.answers);

    this.set('game.currentQuestion', question);
  }

  public selectAnswer(correct: boolean, hexNumber: number): void {
    if (this.game.pyramid[hexNumber] === 'teamA' ||
        this.game.pyramid[hexNumber] === 'teamB') {
      console.warn('Selecting answer for hex ' + hexNumber + ', that is already successfully answered.');
      return;
    }

    this.set(
      'game.pyramid.' + hexNumber,
      correct ? this.game.currentTeam : 'unknown'
    );
    this._toggleTeam();
    this._newQuestion();
  }

  private _toggleTeam(): void {
    this.set(
      'game.currentTeam',
      this.game.currentTeam === 'teamA' ? 'teamB' : 'teamA'
    );
  }

  //=================================================================
  // Static utility methods
  //=================================================================

  private static _getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private static _shuffleArray(o: Array<any>): Array<any> {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

  private static _getRandomTeam(): 'teamA' | 'teamB' {
    var zeroOrOne = AzGameModel._getRandomInt(2);
    return zeroOrOne === 0 ? 'teamA' : 'teamB';
  }
}

AzGameModel.register();
