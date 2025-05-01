function cutString(str: string, maxLength: number = 40) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}

function generateId(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

export { cutString, generateId };
