/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

interface AzGame {
  currentTeam: string;
  currentHex?: number;
  currentQuestion?: AzQuestion;
  pyramid: AzPyramidStates;
  timeout: number;
  finished: boolean;
}

interface AzPyramidStates {
  [hexNumber:number]: 'teamA'|'teamB'|'unknown';
}

@component('az-game-model')
class AzGameModel extends polymer.Base {

  @property({ type: Object, value: [] })
  public questions: AzQuestion[];

  @property({ type: Object, notify: true })
  public game: AzGame | undefined;

  private _remainingQuestions: AzQuestion[];

  public newGame(timeout: number, startingTeam?: 'teamA' | 'teamB'): void {
    this.game = {
      currentTeam: startingTeam || AzGameModel._getRandomTeam(),
      pyramid: {},
      timeout: timeout,
      finished: false
    };
    this._remainingQuestions = [];
  }

  public newQuestion(): void {
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
    if (!this.game) {
      throw 'Cannot select answer because no game has been created yet.'
    }

    if (!this.hexIsAvailable(hexNumber)) {
      throw 'Selecting answer for hex ' + hexNumber + ', that is already successfully answered.';
    }

    if (this.game.finished) {
      throw 'Game has already finished.';
    }

    this.set(
      'game.pyramid.' + hexNumber,
      correct ? this.game.currentTeam : 'unknown'
    );

    this.set(
      'game.finished',
      this._checkEnd(this.game.pyramid)
    );

    this._toggleTeam();
  }

  private _checkEnd(pyramid: AzPyramidStates): boolean {
    let hexes = Object.keys(pyramid);//.map((hexStr) => parseInt(hexStr));

    let hex: string|undefined = undefined;
    let block: any = null;
    while (hex = hexes.pop()) {
      if (pyramid[hex] === 'unknown') continue;

      block = {
        queue: [hex],
        hexes: [hex],
        team: pyramid[hex],
        left: false,
        right: false,
        bottom: false
      };

      let h: string|undefined = undefined;
      let neighbours;
      while (h = block.queue.shift()) {
        if ([1, 2, 4, 7, 11, 16, 22].indexOf(parseInt(h)) !== -1) {
          block.left = true;
        }
        if ([1, 3, 6, 10, 15, 21, 28].indexOf(parseInt(h)) !== -1) {
          block.right = true;
        }
        if ([22, 23, 24, 25, 26, 27, 28].indexOf(parseInt(h)) !== -1) {
          block.bottom = true;
        }
        if (block.left && block.right && block.bottom) {
          console.log('Found end!', block.team, ', Hexes:', block.hexes);
          return true;
        }

        neighbours = this._getHexNeighbours(parseInt(h))
          .filter((neigh) => {
            if (pyramid[neigh] === block.team) {
              let i = hexes.indexOf(neigh.toString());
              if (i !== -1) {
                hexes.splice(i, 1);
                return true;
              }
            }
            return false;
          });

        block.queue = block.queue.concat(neighbours);
        block.hexes = block.hexes.concat(neighbours)
      }
    }
    return false;
  }

  public test() {
    let p = {};
    let n = 0;
    do {
      p = {};
      for (let i = 1; i <= 28; ++i) {
        n = Math.floor(Math.random() * 5);
        if (n < 3) {
          p[i.toString()] = ['teamA', 'teamB', 'unknown'][n];
        }
      }
    } while (!this._checkEnd(p));

    this.set('game.pyramid', p);
  }

  private _getHexNeighbours(hex: number): number[] {
    const rowCount = 7;
    const row = (1 + Math.sqrt(8 * hex - 7))/2;
    const rowi = Math.floor(row);
    const posInRow = Math.floor((row - rowi) * rowi);

    let neigh: number[] = [];
    if (posInRow < rowi - 1) {
      neigh.push(hex-rowi+1);
      neigh.push(hex+1);
    }
    if (rowi < rowCount) {
      neigh.push(hex+rowi+1);
      neigh.push(hex+rowi);
    }
    if (posInRow > 0) {
      neigh.push(hex-1);
      neigh.push(hex-rowi)
    }

    return neigh;
  }

  private _toggleTeam(): void {
    if (!this.game) {
      throw 'Cannot toggle team because no game has been created yet.';
    }

    this.set(
      'game.currentTeam',
      this.game.currentTeam === 'teamA' ? 'teamB' : 'teamA'
    );
  }

  public hexIsAvailable(hexNumber: number): boolean {
    return Boolean(this.game
        && this.game.pyramid[hexNumber] !== 'teamA'
        && this.game.pyramid[hexNumber] !== 'teamB');
  }

  //=================================================================
  // Static utility methods
  //=================================================================

  private static _getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private static _shuffleArray(o: any[]): any[] {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

  private static _getRandomTeam(): 'teamA' | 'teamB' {
    var zeroOrOne = AzGameModel._getRandomInt(2);
    return zeroOrOne === 0 ? 'teamA' : 'teamB';
  }
}

AzGameModel.register();
