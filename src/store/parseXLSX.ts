import XLSX from "xlsx";
import { Question } from "./types";

const toAddress = (row: number, col: number) => {
  const rowStr = (row + 1).toString();
  const colStr = String.fromCharCode("A".charCodeAt(0) + col);
  return colStr + rowStr;
};

const parseXLSX = (data: string | ArrayBuffer | null) => {
  const wb = XLSX.read(data, { type: "binary" });

  const sheet = wb.Sheets[wb.SheetNames[0]];

  const questions: Question[] = [];
  let col = 0,
    row = 0,
    cell: XLSX.CellObject;

  while (sheet[toAddress(row, col)]) {
    while ((cell = sheet[toAddress(row, col)])) {
      if (col === 0) {
        questions[row] = {
          text: cell.v?.toString() || "",
          answers: []
        };
      } else {
        questions[row].answers.push({
          text: cell.v?.toString() || "",
          correct: col === 1
        });
      }

      col++;
    }
    col = 0;
    row++;
  }

  return questions;
};

export default parseXLSX;
