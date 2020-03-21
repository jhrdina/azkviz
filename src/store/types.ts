export interface Answer {
  text: string;
  correct: boolean;
}

export interface Question {
  text: string;
  answers: Answer[];
}

export interface PyramidStates {
  [hexNumber: number]: "teamA" | "teamB" | "unknown";
}

export enum Team {
  A,
  B
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
  Welcome,
  TeamSelection,
  Pyramid,
  Question,
  Help
}
