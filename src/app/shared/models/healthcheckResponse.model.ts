export class HealthCheckResponse {

  private readonly _services: Map<String, String>;
  private readonly _effectiveDateTime: Date;

  constructor(services: Map<String, String>,
              effectiveDateTime: Date) {
    this._services = services;
    this._effectiveDateTime = effectiveDateTime;
  }

  get services(): Map<String, String> {
    return this._services;
  }

  get effectiveDateTime(): Date {
    return this._effectiveDateTime;
  }

}
