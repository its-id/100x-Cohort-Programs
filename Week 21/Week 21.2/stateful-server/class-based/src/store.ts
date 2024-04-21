interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[];
}

export const games: Game[] = [];

export class GameManager {
  games: Game[] = [];

  constructor() {
    this.games = [];
  }

  addMove(gameId: string, move: string) {
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
    console.log(`Game Created: ${game.id}`);
  }
}

//creating an instance in the store itself, so that it can be reused by all files and keep each file in sync with a single instance
export const gameManager = new GameManager();
