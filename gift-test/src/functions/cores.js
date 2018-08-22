exports.unixTime = function () {
  let date = new Date();
  return Math.floor(date.getTime() / 1000);
};

// Format date function
exports.dateFormat = function (date) {
  date = new Date(parseInt(date) * 1000);
  return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (parseInt(date.getMonth()) + 1)).slice(-2) + "/" + date.getFullYear();
};

// Format datetime function
exports.timeFormat = function (date) {
  date = new Date(parseInt(date) * 1000);
  return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
};

// Format datetime function
exports.datetimeFormat = function (date) {
  return exports.timeFormat(date) + " " + exports.dateFormat(date);
};

exports.capitalizeLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.commaFormat = function (x) {
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

exports.timeSince = function (date) {
  if (date == 0) return "Never";

  let seconds = Math.floor(((new Date().getTime() / 1000) - date));
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + " year" + (interval === 1 ? " ago" : "s ago");
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " month" + (interval === 1 ? " ago" : "s ago");
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " day" + (interval === 1 ? " ago" : "s ago");
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " hour" + (interval === 1 ? " ago" : "s ago");
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " minute" + (interval === 1 ? " ago" : "s ago");
  }
  interval = Math.floor(seconds);
  if (interval >= 1) {
    return interval + " second" + (interval === 1 ? " ago" : "s ago");
  }

  return "just now";
};
