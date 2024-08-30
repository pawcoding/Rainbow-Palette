import { map, OperatorFunction } from 'rxjs';

/**
 * Maps an array using the provided function.
 */
export function mapArray<T, R>(mapFn: (item: T, index: number) => R): OperatorFunction<Array<T>, Array<R>> {
  return map((array: Array<T>) => array.map((item, index) => mapFn(item, index)));
}
