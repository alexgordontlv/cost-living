function firstDayOfMonth(year, month) {
	return new Date(year, month - 1, 2);
}

function lastDayOfMonth(year, month) {
	return new Date(year, month, 1);
}

module.exports = {
	firstDayOfMonth,
	lastDayOfMonth,
};
