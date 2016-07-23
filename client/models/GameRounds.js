import GameRound from 'models/GameRound';

function addRound(rounds, countPlayers) {
	const playerThrows = Array(countPlayers).fill('');
	return rounds.concat(new GameRound(playerThrows));
}

class GameRounds {

	static fromApi(rounds) {
		const countPlayers = rounds[0].length;
		const res = new GameRounds(countPlayers, rounds);
		return res;
	}

	toApi() {
		return this.rounds.map(round => round.toApi());
	}

	constructor(countPlayers, rounds = []) {
		this.countPlayers = countPlayers;
		this.rounds = rounds.length ? rounds.map(GameRound.fromApi) : addRound([], this.countPlayers);
	}

	*[Symbol.iterator]() {
		return yield* this.rounds;
	}

	add() {
		this.rounds = addRound(this.rounds, this.countPlayers);
		return this;
	}

	remove(pos) {
		this.rounds.splice(pos, 1);
		return this;
	}

	update(roundPos, playerPos, throws) {
		this.rounds[roundPos].updateThrows(playerPos, throws);

		const currentRound = this.rounds[roundPos];
		const lastRound = this.rounds[this.rounds.length - 1];
		const penultRound = this.rounds[this.rounds.length - 2];

		if (currentRound.isClear(playerPos) && currentRound.isEmpty()) {
			if (currentRound === lastRound && penultRound && penultRound.isFull()) {
				return this;
			}

			this.remove(roundPos); // remove current
			return this;
		}

		if (currentRound === penultRound && !penultRound.isFull() && lastRound.isEmpty()) {
			this.remove(this.rounds.length - 1);
			return this;
		}

		if (currentRound === lastRound && lastRound.isFull()) {
			this.add();
		}

		return this;
	}

	getPoints() {
		return this.rounds.reduce((acc, round) =>
			round.getValues().map((x, pos) => (acc[pos] || 0) + x)
		, []);
	}

}

export default GameRounds;
