export function ascend<T>(fn: (obj: T) => any): (a: T, b: T) => number {
  return function (a: T, b: T) {
    const aa = fn(a);
    const bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  };
}

export function descend<T>(fn: (obj: T) => any): (a: T, b: T) => number {
  return function (a: T, b: T) {
    const aa = fn(a);
    const bb = fn(b);
    return aa < bb ? 1 : aa > bb ? -1 : 0;
  };
}

export const prop = (key: string) => (obj: any) => obj[key];

export const ascendBy = (key: string) => ascend(prop(key));
export const descendBy = (key: string) => descend(prop(key));
