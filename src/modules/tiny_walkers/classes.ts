type TinyWalkersType = {
  nameBackgroundColor: string;
  messageBackgroundColor: string;
  messageColor: string;
  size: number;
  messageSize: number;
  nameSize: number;
};

export class TinyWalkersSettings {
  nameBackgroundColor: string;
  messageBackgroundColor: string;
  messageColor: string;
  size: number;
  messageSize: number;
  nameSize: number;

  constructor({
    nameBackgroundColor,
    messageBackgroundColor,
    messageColor,
    size,
    messageSize,
    nameSize,
  }: TinyWalkersType) {
    this.nameBackgroundColor = nameBackgroundColor;
    this.messageBackgroundColor = messageBackgroundColor;
    this.messageColor = messageColor;
    this.size = size;
    this.messageSize = messageSize;
    this.nameSize = nameSize;
  }

  makeArray() {
    return [
      this.nameBackgroundColor,
      this.messageBackgroundColor,
      this.messageColor,
      this.size,
      this.messageSize,
      this.nameSize,
    ];
  }

  static getFromArray(arr: string[]): TinyWalkersSettings {
    if (!Array.isArray(arr) || arr.length !== 6) {
      throw new Error("Settings array must have exactly 6 elements");
    }

    const [
      nameBackgroundColor,
      messageBackgroundColor,
      messageColor,
      size,
      messageSize,
      nameSize,
    ] = arr;
    return new TinyWalkersSettings({
      nameBackgroundColor,
      messageBackgroundColor,
      messageColor,
      size: Number(size),
      messageSize: Number(messageSize),
      nameSize: Number(nameSize),
    });
  }
}
