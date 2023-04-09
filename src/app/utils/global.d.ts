export {}

declare global {
  interface Array<T> {
    findLast(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      thisArg?: any
    ): T | undefined
  }
}
