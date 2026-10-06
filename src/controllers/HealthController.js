export class HealthController {
  constructor(healthService) {
    this.healthService = healthService;
  }

  async check(ctx) {
    await this.healthService.check();
    ctx.body = { status: "ok" };
  }
}
