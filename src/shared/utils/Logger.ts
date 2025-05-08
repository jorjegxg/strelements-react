export default class Logger {
  static log(message: string) {
    if (process.env.NODE_ENV === "production") return;
    //emoji message
    console.log("ℹ️" + message);
  }
}
