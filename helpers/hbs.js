const moment = require('moment');

module.exports = {
    formatDate: function (date, format) {
        return moment(date).utc().format(format)
    },
    select: function (selected, options) {
        return options
            .fn(this)
            .replace(
                new RegExp(' value="' + selected + '"'),
                '$& selected="selected"'
            )
            .replace(
                new RegExp('>' + selected + '</option>'),
                ' selected="selected"$&'
            )
    },
}