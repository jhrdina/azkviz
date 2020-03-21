import { Game, Question, Screen, Team } from "./types";
import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import store from "@/store";
import Vue from "vue";

const getRandomInt = (maxExcl: number) => Math.floor(Math.random() * maxExcl);

const shuffleArray = <T>(o: T[]): T[] => {
  for (
    let j, x, i = o.length;
    i;
    j = getRandomInt(i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
};

const getRandomTeam = () => (getRandomInt(2) === 0 ? Team.A : Team.B);

@Module({ dynamic: true, name: "root", store })
export default class Root extends VuexModule {
  screen: Screen = Screen.Welcome;
  game: Game | null = null;
  questions: Question[] = [
    {
      text: "asdf",
      answers: []
    }
  ];

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
}
