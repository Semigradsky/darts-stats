function evalThrows(throws) {
	return throws ? +eval(throws) : ''; // eslint-disable-line no-eval
}

function formatThrows(value) {
	return value
		.replace(/^\s*\++/, '')
		.replace(/\++\s*$/, '')
		.replace(/\s/g, '')
		.replace(/\+\+*/g, ' + ');
}

class GameRound {

	static fromApi(round) {
		return new GameRound(round);
	}

	toApi() {
		return this.playerThrows.map(x => x.throws);
	}

	constructor(playerThrows) {
		this.playerThrows = playerThrows.map(throws => ({
			throws,
			value: evalThrows(throws)
		}));
	}

	*[Symbol.iterator]() {
		return yield* this.playerThrows;
	}

	updateThrows(playerPos, throws) {
		const formattedThrows = formatThrows(throws);

		this.playerThrows[playerPos] = {
			throws: formattedThrows,
			value: evalThrows(formattedThrows)
		};

		return this;
	}

	isFull() {
		return this.playerThrows.every(x => x.value !== '');
	}

	isEmpty() {
		return this.playerThrows.every(x => x.value === '');
	}

	isClear(playerPos) {
		return !this.playerThrows[playerPos].throws;
	}

	getValues() {
		return this.playerThrows.map(x => x.value || 0);
	}

}

export default GameRound;
