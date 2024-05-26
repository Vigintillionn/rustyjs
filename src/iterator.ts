export class Iterator<T> {
  private index = 0;

  constructor(private items: T[]) {}

  /**
   * Creates an iterator from the given items.
   * 
   * @param items the items to iterate over.
   * @returns the iterator.
   */
  public static from<T>(items: T[]): Iterator<T> {
    return new Iterator(items);
  }

  /**
   * Creates an iterator for the given range.
   * 
   * @param start the start of the range.
   * @param end the end of the range (exclusive). If not provided, the start is 0.
   * @returns the iterator.
   */
  public static range(start: number, end?: number): Iterator<number> {
    if (end === undefined) {
      end = start;
      start = 0;
    }

    let items: number[] = [];
    for (let i = start; i < end; i++) {
      items.push(i);
    }
    return new Iterator(items);
  }

  /**
   * @returns true if there are more items to iterate over, false otherwise.
   */
  public hasNext(): boolean {
    return this.index < this.items.length;
  }

  /**
   * @returns the next item in the iterator and consumes it.
   */
  public next(): T {
    return this.items[this.index++];
  }

  /**
   * @returns the next item in the iterator without consuming it.
   */
  public peek(): T {
    return this.items[this.index];
  }

  /**
   * @param index the index to peek at.
   * @throws an error if the index is out of bounds.
   * @returns the item at the given index.
   */
  public peekAt(index: number): T {
    if (index < 0 || index >= this.items.length) {
      throw new Error(`Index out of bounds: ${index}`);
    }
    return this.items[index];
  }

  /**
   * Resets the iterator to the beginning.
   */
  public reset(): void {
    this.index = 0;
  }
  
  /**
   * Maps the items in the iterator to another type.
   * 
   * @param fn the function to apply to the items.
   * @returns the new iterator.
   */
  public map<U>(fn: (value: T) => U): Iterator<U> {
    return new Iterator(this.items.map(fn));
  }

  /**
   * Filters the items in the iterator.
   * 
   * @param predicate the predicate to filter the items.
   * @returns the new iterator.
   */
  public filter(predicate: (value: T) => boolean): Iterator<T> {
    return new Iterator(this.items.filter(predicate));
  }

  /**
   * Finds the first item that satisfies the predicate.
   * 
   * @param predicate the predicate to find an item.
   * @returns the item if found, null otherwise.
   */
  public find(predicate: (value: T) => boolean): T | null {
    return this.items.find(predicate) ?? null;
  }

  /**
   * Iterates over the items in the iterator.
   * 
   * @param fn the function to apply to the items.
   */
  public forEach(fn: (value: T) => void): void {
    this.items.forEach(fn);
  }

  /**
   * Collects the items in the iterator into an array.
   * 
   * @param fn the function to apply to the items.
   * @returns the array of items.
   */
  public collect<U>(fn?: (value: T) => U): U[] | T[] {
    return fn ? this.items.map(fn) : this.items;
  }

  /**
   * Reduces the items in the iterator to a single value.
   * 
   * @param fn the function to reduce the items.
   * @param initialValue the initial value.
   * @returns the reduced value.
   */
  public reduce<U>(fn: (accumulator: U, value: T) => U, initialValue: U): U {
    return this.items.reduce(fn, initialValue);
  }

  /**
   * Sums the items in the iterator.
   * 
   * @param predicate the predicate to sum the items.
   * @returns the sum of the items.
   */
  public count(predicate?: (value: T) => boolean): number {
    return predicate ? this.items.filter(predicate).length : this.items.length;
  }

  /**
   * Sums the items in the iterator.
   * 
   * @param predicate the predicate to sum the items.
   * @returns the sum of the items.
   */
  public any(predicate: (value: T) => boolean): boolean {
    return this.items.some(predicate);
  }

  /**
   * Sums the items in the iterator.
   * 
   * @param predicate the predicate to sum the items.
   * @returns the sum of the items.
   */
  public all(predicate: (value: T) => boolean): boolean {
    return this.items.every(predicate);
  }

  /**
   * Chains the items in the iterator.
   * 
   * @param fn the function to chain the items.
   * @returns the new iterator.
   */
  public chain<U>(fn: (value: T) => Iterator<U>): Iterator<U> {
    let result: U[] = [];
    this.items.forEach((value) => {
      result = result.concat(fn(value).collect((value) => value));
    });
    return new Iterator(result);
  }

  /**
   * Skips the first n items in the iterator.
   * 
   * @returns the new iterator.
   */
  public skip(n: number): Iterator<T> {
    return new Iterator(this.items.slice(n));
  }

  /**
   * Takes the first n items in the iterator.
   * 
   * @returns the new iterator.
   */
  public take(n: number): Iterator<T> {
    return new Iterator(this.items.slice(0, n));
  }

  /**
   * Skips items while the predicate is true.
   * 
   * @param predicate the predicate to skip items.
   * @returns the new iterator.
   */
  public skipWhile(predicate: (value: T) => boolean): Iterator<T> {
    let index = 0;
    while (predicate(this.items[index])) {
      index++;
    }
    return new Iterator(this.items.slice(index));
  }

  /**
   * Takes items while the predicate is true.
   * 
   * @param predicate the predicate to take items.
   * @returns the new iterator.
   */
  public takeWhile(predicate: (value: T) => boolean): Iterator<T> {
    let index = 0;
    while (predicate(this.items[index])) {
      index++;
    }
    return new Iterator(this.items.slice(0, index));
  }

  /**
   * Zips the items in the iterator with their index
   * 
   * @returns the new iterator.
   */
  public enumerate(): Iterator<[number, T]> {
    return new Iterator(this.items.map((value, index) => [index, value]));
  }

  /**
   * Zips the items in the iterator with another iterator.
   * 
   * @param other the other iterator to zip with.
   * @returns the new iterator.
   */
  public zip<U>(other: Iterator<U>): Iterator<[T, U]> {
    return new Iterator(this.items.map((value, index) => [value, other.items[index]]));
  }

  /**
   * Chains the items in the iterator with another iterator.
   * 
   * @param other the other iterator to chain with.
   * @returns the array of items.
   */
  public chainWith<U>(other: Iterator<U>): Iterator<[T, U]> {
    let result: [T, U][] = [];
    this.items.forEach((value, index) => {
      result.push([value, other.items[index]]);
    });
    return new Iterator(result);
  }

  /**
   * Collects the items in the iterator into an array with their index.
   * 
   * @param other the other iterator to collect with.
   * @param fn the function to apply to the items.
   * @returns the array of items.
   */
  public collectInto<U, V>(other: Iterator<U>, fn: (value: T, other: U) => V): V[] {
    let result: V[] = [];
    this.items.forEach((value, index) => {
      result.push(fn(value, other.items[index]));
    });
    return result;
  }

  /**
   * Collects the items in the iterator with another iterator.
   * 
   * @param other the other iterator to collect with.
   * @returns the array of items.
   */
  public collectWith<U>(other: Iterator<U>): [T, U][] {
    let result: [T, U][] = [];
    this.items.forEach((value, index) => {
      result.push([value, other.items[index]]);
    });
    return result;
  }

  /**
   * Collects the items in the iterator into an array as long as the predicate is true.
   * 
   * @param predicate the predicate to collect items.
   * @returns the array of items.
   */
  public collectWhile(predicate: (value: T) => boolean): T[] {
    let index = 0;
    while (predicate(this.items[index])) {
      index++;
    }
    return this.items.slice(0, index);
  }

  /**
   * Collects the items in the iterator into an array until the predicate is true.
   * 
   * @param predicate the predicate to collect items.
   * @returns the array of items.
   */
  public collectUntil(predicate: (value: T) => boolean): T[] {
    let index = 0;
    while (!predicate(this.items[index])) {
      index++;
    }
    return this.items.slice(0, index);
  }
}