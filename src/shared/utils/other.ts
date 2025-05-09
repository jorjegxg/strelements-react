function cutString(
  str: string,
  chunkSize: number = 15,
  maxChunks: number = 3
): string[] {
  const chunks = [];
  for (let i = 0; i < str.length && chunks.length < maxChunks; i += chunkSize) {
    const chunk = str.slice(i, i + chunkSize);
    if (chunks.length === maxChunks - 1 && i + chunkSize < str.length) {
      chunks.push(chunk.slice(0, -3) + "...");
      break;
    } else {
      chunks.push(chunk);
    }
  }
  return chunks;
}

function removeKickEmotes(message: string): string {
  // Înlocuiește emote-ul cu spațiu dacă e între 2 cuvinte
  message = message.replace(/(?<=\S)\[emote:\d+:[^\]]+\](?=\S)/g, " ");
  // Elimină toate celelalte emote-uri (început sau sfârșit de propoziție)
  message = message.replace(/\[emote:\d+:[^\]]+\]/g, "");
  // Normalizează spațiile
  return message.replace(/\s+/g, " ").trim();
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

export { cutString, generateId, getRandomColor, removeKickEmotes };
