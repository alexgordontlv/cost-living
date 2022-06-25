function firstDayOfMonth(year, month) {
	return new Date(year, month - 1, 2);
}

function lastDayOfMonth(year, month) {
	return new Date(year, month, 1);
}
function addYear( date = new Date()){
	const dateCopy = new Date(date.getTime());
	dateCopy.setFullYear(dateCopy.getFullYear() + 1);
	return dateCopy;
}

module.exports = {
	firstDayOfMonth,
	lastDayOfMonth,
	addYear,
};
