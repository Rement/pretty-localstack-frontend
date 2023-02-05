export class HealthCheckResponse {

  private readonly _services: Map<String, String>;

  constructor(services: Map<String, String>) {
    this._services = services;
  }

  get services(): Map<String, String> {
    return this._services;
  }
}
