export class ForexApiClient {
  private static singleton: ForexApiClient;

  private baseUrl: string;
  private apiToken: string;

  /**
   * @param baseUrl The base URL endpoint for the rates API.
   * @param apiToken The API token for the rates API.
   */
  constructor(baseUrl: string, apiToken: string) {
    this.baseUrl = baseUrl;
    this.apiToken = apiToken;
  }

  /**
   * Create a singleton instance of the ForexApiClient.
   */
  public static createClient(
    baseUrl: string,
    apiToken: string
  ): ForexApiClient {
    if (!ForexApiClient.singleton) {
      ForexApiClient.singleton = new ForexApiClient(baseUrl, apiToken);
    }
    return ForexApiClient.singleton;
  }

  /**
   * The private function wrapper the fetch API with defualt headers.
   * @param method Request method.
   * @param path Request path.
   * @param headers Request headers.
   * @param body Request body.
   * @returns Promise<Response>
   */
  private async request(
    method: string,
    path: string,
    headers?: { [key: string]: string },
    body?: BodyInit
  ) {
    return await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        token: this.apiToken,
        ...headers,
      },
      body,
    });
  }

  /**
   * Get the realtime rates for the given pair.
   * @param from string
   * @param to string
   * @returns ReadableStream
   */
  public async getRates(
    from: string,
    to: string
  ): Promise<ReadableStream<Uint8Array>> {
    return await this.request("GET", `/streaming/rates?pair=${from}${to}`).then(
      (response) => response.body as ReadableStream<Uint8Array>
    );
  }
}
