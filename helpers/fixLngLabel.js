function fixLngLabel(input) {
  if (input === "lng\r") {
    return "lng";
  }
  return input;
}

module.exports = fixLngLabel;
