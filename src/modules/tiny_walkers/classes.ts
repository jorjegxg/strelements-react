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

  getFromArray(array: string[]) {
    this.nameBackgroundColor = array[0];
    this.messageBackgroundColor = array[1];
    this.messageColor = array[2];
    this.size = Number(array[3]);
    this.messageSize = Number(array[4]);
    this.nameSize = Number(array[5]);
  }
}
