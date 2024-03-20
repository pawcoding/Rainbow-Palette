// disable-file @typescript-eslint/no-unused-vars
export class MatomoTrackerMock {
  public enableHeartBeatTimer(_delay: number): void {}
  public setCustomDimension(_index: number, _value: string): void {}
  public trackEvent(
    _category: string,
    _action: string,
    _name?: string,
    _value?: number
  ): void {}
  public setUserId(_userId: string): void {}
  public setCookieConsentGiven(): void {}
}
