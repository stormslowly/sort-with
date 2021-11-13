/**
 * Sorts a list according to a list of comparators.
 *
 * @func
 * @sig [(a, a) -> Number] -> [a] -> [a]
 * @param {Array} functions A list of comparator functions.
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted according to the comarator functions.
 * @example
 *
 *      const alice = {
 *        name: 'alice',
 *        age: 40
 *      };
 *      const bob = {
 *        name: 'bob',
 *        age: 30
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 40
 *      };
 *      const people = [clara, bob, alice];
 *      const ageNameSort = sortWith([
 *        descendBy('age'),
 *        R.ascendBy('name')
 *      ]);
 *      ageNameSort(people); //=> [alice, clara, bob]
 */

export function sortWith<T>(
  fns: Array<(a: T, b: T) => number>,
  list: readonly T[]
): T[];
export function sortWith<T>(
  fns: Array<(a: T, b: T) => number>
): (list: readonly T[]) => T[];
export function sortWith<T>(
  fns: Array<(a: T, b: T) => number>,
  list?: readonly T[]
) {
  if (list) {
    return _sortWith(fns, list);
  } else {
    return function (list: readonly T[]) {
      return _sortWith(fns, list);
    };
  }
}

function _sortWith<T>(fns: Array<(a: T, b: T) => number>, list: readonly T[]) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    let result = 0;
    let i = 0;
    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }
    return result;
  });
}
