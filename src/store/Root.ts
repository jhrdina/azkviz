import { Game, Question, Screen, Team, TeamOrRandom } from "./types";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "@/store";
import parseXLSX from "./parseXLSX";

const DEFAULT_TIMEOUT = 30;

const getRandomInt = (maxExcl: number) => Math.floor(Math.random() * maxExcl);

const shuffleArray = <T>(o: T[]): T[] => {
  for (
    let j, x, i = o.length;
    i;
    j = getRandomInt(i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
};

const getRandomTeam = () => (getRandomInt(2) === 0 ? "teamA" : "teamB");

@Module({ dynamic: true, name: "root", store })
export default class Root extends VuexModule {
  screen = Screen.TeamSelection;
  game: Game | null = null;
  questions: Question[] = [];
  timeoutActive = false;
  timeoutSeconds = DEFAULT_TIMEOUT;

  private remainingQuestions: Question[] = [];

  @Mutation
  newGame(p: { timeout: number; startingTeam?: Team }) {
    this.game = {
      currentTeam: p.startingTeam || getRandomTeam(),
      currentQuestion: undefined,
      pyramid: {},
      timeout: p.timeout,
      finished: false
    };
    this.remainingQuestions = [];
  }

  @Mutation
  newQuestion() {
    if (!this.game || this.questions.length === 0) {
      return;
    }

    if (this.remainingQuestions.length === 0) {
      this.remainingQuestions = this.questions.slice();
    }

    const i = getRandomInt(this.remainingQuestions.length);
    // Deep copy selected question
    const question: Question = JSON.parse(
      JSON.stringify(this.remainingQuestions[i])
    );
    // Remove from remaining questions so it cannot be generated again
    this.remainingQuestions.splice(i, 1);
    // Shuffle answers
    shuffleArray(question.answers);

    this.game.currentQuestion = question;
  }

  @Mutation
  setScreen(screen: Screen) {
    this.screen = screen;
  }

  @Mutation
  newFileLoaded(questions: Question[]) {
    this.questions = questions;
    this.screen = Screen.TeamSelection;
  }

  @Mutation
  toggleTimer() {
    this.timeoutActive = !this.timeoutActive;
  }

  @Action
  teamSelected(team: TeamOrRandom) {
    const maybeTeam = team !== "random" ? team : undefined;
    this.newGame({
      timeout: this.timeoutActive ? this.timeoutSeconds : 0,
      startingTeam: maybeTeam
    });
    this.setScreen(Screen.Pyramid);
  }

  @Action
  loadFile(file: File) {
    const reader = new FileReader();

    reader.addEventListener("load", e => {
      if (!e.target) return;
      this.newFileLoaded(parseXLSX(e.target.result));
    });

    reader.readAsBinaryString(file);
  }

  @Mutation
  limitTimeout() {
    if (this.timeoutSeconds > 999) {
      this.timeoutSeconds = 999;
    }
  }

  @Mutation
  setTimeout(timeoutSeconds: number) {
    this.timeoutSeconds = isNaN(timeoutSeconds)
      ? DEFAULT_TIMEOUT
      : timeoutSeconds;
  }
}
