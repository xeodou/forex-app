export class StreamReader<T> {
  private readableStream: ReadableStream<Uint8Array>;
  private reader: ReadableStreamDefaultReader<Uint8Array>;
  private isClosed: boolean = false;

  constructor(readableStream: ReadableStream<Uint8Array>) {
    this.readableStream = readableStream;
    this.reader = this.readableStream.getReader();
  }

  get closed(): boolean {
    return this.isClosed;
  }

  /**
   * Read the data from the stream.
   * @param listener A function will recieve the unmarshal data from the stream.
   */
  public async read(listener: (value: T) => void) {
    while (!this.isClosed) {
      const { value, done } = await this.reader.read();

      if (done) {
        this.isClosed = true;
        break;
      }
      const decoder = new TextDecoder();
      const rate = JSON.parse(decoder.decode(value));
      listener(rate);
    }
  }

  /**
   * Cancel the stream and stop read the chunk.
   */
  public async cancel() {
    this.isClosed = true;

    try {
      await this.reader.cancel();
    } catch (err) {
      // ignore the canceling error
    }
    if (this.readableStream.locked) {
      this.reader.releaseLock();
    }
    await this.readableStream.cancel();
  }
}
