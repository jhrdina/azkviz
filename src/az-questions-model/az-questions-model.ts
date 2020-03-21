import 'js-xlsx/dist/xlsx.core.min.js';
import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property } from "@polymer/decorators";

export interface AzQuestion {
  text: string;
  answers: AzAnswer[];
}

export interface AzAnswer {
  text: string;
  correct: boolean;
}

declare module XLSX {
  function read(data, params: {type: 'binary'}): Workbook;

  interface Workbook {
    Sheets: Sheet[];
    SheetNames: string[];
  }

  interface Sheet {
    [address: string]: Cell;
  }

  interface Cell {
    v: string;
  }
}

@customElement('az-questions-model')
class AzQuestionsModel extends PolymerElement {

  @property({ type: Array, notify: true, readOnly: true })
  public questions: AzQuestion[];
  private _setQuestions: (questions: AzQuestion[]) => void;

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

    var sheet: XLSX.Sheet = wb.Sheets[wb.SheetNames[0]];

    var questions: AzQuestion[] = [];
    var col = 0,
        row = 0,
        cell: XLSX.Cell;

    while (sheet[toAddress(row, col)]) {

      while (cell = sheet[toAddress(row, col)]) {

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

