/**
 * Map to cache all current timeouts
 */
const sleepers = new Map<string, number>()

/**
 * Create a new timeout to await. Debounces timeouts with the same id.
 *
 * @param delay sleep time in ms
 * @param id timeout id for debouncing
 */
export function sleep(delay: number, id: string): Promise<void> {
  wake(id)

  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => {
      wake(id)
      resolve(undefined)
    }, delay)

    sleepers.set(id, timeout)
  })
}

/**
 * Clears the timeout function with the given id
 * @param id timeout id to clear
 */
export function wake(id: string) {
  clearTimeout(sleepers.get(id))
  sleepers.delete(id)
}
