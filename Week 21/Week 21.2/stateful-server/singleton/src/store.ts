interface Game {
  id: number;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[];
}

export const games: Game[] = [];

export class GameManager {
  private games: Game[] = [];
  private static instance: GameManager;

  private constructor() {
    this.games = [];
  }

  // Singleton pattern
  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  logState() {
    console.log('Current Games State: ', this.games);
  }

  addMove(gameId: number, move: string) {
    const game = this.games.find((g) => g.id === gameId);
    if (game) {
      console.log(`Adding move: ${move} to game: ${gameId}`);
      game.moves.push(move);
    } else {
      console.log(`Game not found with id: ${gameId}`);
    }
  }

  addGame(newGame: Game) {
    if (this.games.find((g) => g.id === newGame.id)) {
      console.log(`Game with id: ${newGame.id} already exists`);
      return;
    }

    const game = {
      id: newGame.id,
      whitePlayer: newGame.whitePlayer,
      blackPlayer: newGame.blackPlayer,
      moves: [],
    };

    this.games.push(game);
    console.log(`Game Created with id: ${game.id}`);
  }
}
