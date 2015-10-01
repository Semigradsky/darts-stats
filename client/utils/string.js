function capitalizeFirstLetter(string) {
	return string.charAt(0).toLocaleUpperCase() + string.slice(1).toLocaleLowerCase();
}

function toCamelCase(string) {
	const [firstWord, ...anothers] = string.split('_');
	return firstWord.toLocaleLowerCase() + anothers.map(capitalizeFirstLetter).join('');
}

export default {
	capitalizeFirstLetter,
	toCamelCase
};
