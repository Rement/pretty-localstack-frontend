export interface HealthCheckResponse {
  services: LocalstackServices;
  effectiveDateTime: Date;
}

export interface LocalstackServices {
  sqs: string
}
