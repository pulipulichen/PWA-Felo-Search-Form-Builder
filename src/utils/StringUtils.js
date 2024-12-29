export default {
  hashCode: function (str) {
    var hash = 0,
      i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }

    hash = Math.abs(hash)
    return hash;
  },
  nl2br: function (text) {
    if (typeof text !== "string") {
      throw new TypeError("Expected input to be a string");
    }
    return text.replace(/\n/g, '<br>\n');
  },
  removeHTMLTags: function (inputString) {
    // Use a regular expression to match and remove HTML tags
    if (!inputString || typeof(inputString) !== 'string') {
      return inputString
    }
    return inputString.replace(/<\/?[^>]+(>|$)/g, "");
  }
}