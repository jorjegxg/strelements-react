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

const getRandomColor = (name: string) => {
  const colors = [
    "text-red-500",
    "text-blue-500",
    "text-green-500",
    "text-yellow-500",
    "text-purple-500",
    "text-pink-500",
    "text-indigo-500",
    "text-teal-500",
  ];

  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return colors[hash % colors.length];
};

export { cutString, generateId, getRandomColor };
