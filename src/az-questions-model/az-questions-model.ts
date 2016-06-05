/// <reference path="../../bower_components/polymer-ts/polymer-ts.d.ts"/>

interface AzQuestion {
  text: string;
  answers: Array<AzAnswer>;
}

interface AzAnswer {
  text: string;
  correct: boolean;
}

interface XLSX {
  read(data, params: {type: 'binary'}): Workbook;
}

interface Workbook {
  Sheets: Array<Sheet>;
  SheetNames: Array<string>;
}

interface Sheet {
  [address: string]: Cell;
}

interface Cell {
  v: string;
}

var XLSX: XLSX = XLSX || null;

@component('az-questions-model')
class AzQuestionsModel extends polymer.Base {

  @property({ type: Array, notify: true, readOnly: true })
  public questions: Array<AzQuestion>;
  private _setQuestions: (questions: Array<AzQuestion>) => void;

  public clear(): void {
    this._setQuestions([]);
  }

  public parseXLSX(data): void {
    var toAddress = function (row, col) {
      var rowStr = (row + 1).toString();
      var colStr = String.fromCharCode('A'.charCodeAt(0) + col);
      return colStr + rowStr;
    };

    var wb = XLSX.read(data, {type: 'binary'});

    var sheet: Sheet = wb.Sheets[wb.SheetNames[0]];

    var questions: Array<AzQuestion> = [];
    var col = 0,
        row = 0,
        cell: Cell;

    while (sheet[toAddress(row, col)] !== undefined) {

      while ((cell = sheet[toAddress(row, col)]) !== undefined) {

        if (col === 0) {
          questions[row] = {
            text: cell.v,
            answers: []
          };
        } else {
          questions[row].answers.push({
            text: cell.v,
            correct: col === 1
          });
        }

        col++;
      }
      col = 0;
      row++;
    }

    this._setQuestions(questions);
  }
}

AzQuestionsModel.register();
