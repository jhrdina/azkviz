export interface Answer {
  text: string;
  correct: boolean;
}

export interface Question {
  text: string;
  answers: Answer[];
}

export type Team = "teamA" | "teamB";

export type HexState = Team | "unknown";

export type TeamOrRandom = Team | "random";

export interface PyramidStates {
  [hexNumber: number]: HexState;
}

export interface Game {
  currentTeam: Team;
  currentHex?: number;
  currentQuestion?: Question;
  pyramid: PyramidStates;
  timeout: number;
  finished: boolean;
}

export enum Screen {
  Welcome = "welcome",
  TeamSelection = "teamSelection",
  Pyramid = "pyramid",
  Question = "question",
  Help = "help"
}
