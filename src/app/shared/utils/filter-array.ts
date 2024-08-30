import { map, OperatorFunction } from 'rxjs';

/**
 * Filters an array based on a filter function.
 */
export function filterArray<T>(filterFn: (item: T, index: number) => boolean): OperatorFunction<Array<T>, Array<T>> {
  return map((array: Array<T>) => array.filter((item, index) => filterFn(item, index)));
}
