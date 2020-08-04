const moment = require('moment');

// Public API
let helpers = {};

/**
 * Format dates
 *
 * Usage:
 *  {{dateFormat date 'dddd MMMM D[, ] YYYY'}}
 *
 * @param {String} date
 * @param {String} format. default 'MMMM D, YYYY H[:]mm z'
 * @return {String}
 */

helpers.dateFormat = (date, format) => {
  let fmt = 'LLLL';

  if (format && typeof format === 'string') {
    fmt = format;
  }

  return moment(date).subtract(4,'hours').format(fmt).replace(":","<span class='u_blink'>:</span>");
};

helpers.smallDate = (date, format) => {
  let fmt = 'MMMM D, YYYY';

  if (format && typeof format === 'string') {
    fmt = format;
  }

  return moment(date).add(3,'hours').format(fmt);
};

helpers.dateWithWeekday = (date, format) => {
  let fmt = 'dddd, MMMM D, YYYY';

  if (format && typeof format === 'string') {
    fmt = format;
  }

  return moment(date).add(3,'hours').format(fmt);
};

helpers.ifMatch = (a, b) => {
  if (a  == b) {
    return true;
  }
  return false;
}

helpers.ifExpired = (date) => {
  return moment(date).add(1,'days').isBefore()
}

helpers.ratioPercent = (a, b) => {
  return ((b/a) * 100)
}

helpers.inList = (needle, haystack) => {

  if (haystack.includes(needle)) {
    return true;
  } else {
    return false;
  }

}

helpers.urlEncode = (url) => {
	let encodedUrl = "";

	if (url && typeof url === 'string') {
		encodedUrl = encodeURIComponent(url)
	}

	return encodedUrl;
}

helpers['tag-generator'] = (source) => {
  let tag =  "<" + source.tagName;
  if (source.content) {
    tag += ">" + source.content + "</" + source.tagName + ">";
    return tag;
  }
  if (source.attributes) {
    let i = 0;
    for (attribute in source.attributes) {
      
        tag += " " + Object.keys(source.attributes)[i] + '="' + Object.values(source.attributes)[i] + '"'
        i++;

    }
  }
  tag += ">"
  return tag;
};



module.exports = helpers;
