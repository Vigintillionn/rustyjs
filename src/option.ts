/**
 * Represents an optional value.
 * 
 * @template T the type of the value.
 * 
 * @example
 * const option = Option.Some(42);
 * 
 * if (option.isSome()) {
 *  console.log(option.unwrap());
 * }
 * 
 * @example
 * const option = Option.None();
 * 
 * if (option.isNone()) {
 *  console.log("No value");
 * }
 */
export abstract class Option<T> {
  /**
   * @returns true if the option is a Some value, false otherwise.
   */
  abstract isSome(): this is Some<T>;
  /**
   * @returns true if the option is a None value, false otherwise.
   */
  abstract isNone(): this is None<T>;
  /**
   * Unwraps the option, yielding the content of a Some.
   * 
   * @throws Error if the option is a None value.
   * @returns the content of a Some value.
   */
  abstract unwrap(): T;
  /**
   * Returns the content of a Some value, or a default value if the option is a None value.
   * 
   * @param defaultValue the value to return if the option is a None value.
   * @returns the content of a Some value, or the default value if the option is a None value.
   */
  abstract unwrapOrDefault(defaultValue: T): T;
  /**
   * Unwraps an option, yielding the content of a Some.
   * 
   * @param fn the function to call if the option is a None value.
   * @returns the content of a Some value.
   */
  abstract unwrapOrElse(fn: () => T): T;
  /**
   * Maps an Option<T> to Option<U> by applying a function to a contained value.
   * 
   * @param fn the function to apply to the contained value.
   * @returns an Option<U> containing the result of applying the function to the contained value.
   */
  abstract map<U>(fn: (value: T) => U): Option<U>;
  /**
   * Maps an Option<T> to Option<U> by applying a function to a contained value and flattening the result.
   * 
   * @param fn the function to apply to the contained value.
   * @returns an Option<U> containing the result of applying the function to the contained value.
   */
  abstract flatMap<U>(fn: (value: T) => Option<U>): Option<U>;
  /**
   * Unwraps an option, yielding the content of a Some.
   * 
   * @param message the message to throw if the option is a None value.
   * @throws Error with the given message if the option is a None value.
   * @returns the content of a Some value.
   */
  abstract expect(message: string): T;
  /**
   * @returns the contained value or null.
   */
  abstract get(): T | null;
  /**
   * Maps an Option<T> to Option<U> by applying a function to a contained value and flattening the result.
   * 
   * @param fn the function to apply to the contained value.
   * @returns an Option<U> containing the result of applying the function to the contained value.
   */
  abstract andThen<U>(fn: (value: T) => Option<U>): Option<U>;
  /**
   * Returns None if the option is a None value, otherwise returns the result of applying the predicate to the contained value.
   * 
   * @param predicate the predicate to apply to the contained value.
   * @returns None if the option is a None value, otherwise returns the result of applying the predicate to the contained value.
   */
  abstract filter(predicate: (value: T) => boolean): Option<T>;
  /**
   * @returns true if the option is a Some value and contains the same value as the other option, false otherwise.
   */
  abstract equals(other: Option<T>): boolean;
  /**
   * @returns a JSON representation of the option.
   */
  abstract toJSON(): object;
  /**
   * Applies a function to the contained value or returns a default.
   * 
   * @param onSome the function to apply to the contained value.
   * @param onNone the function to apply if the option is a None value.
   * @returns the result of applying the function to the contained value or the default.
   */
  abstract match<U>(onSome: (value: T) => U, onNone: () => U): U;
  /**
   * Flattens an option of an option into a single option.
   * 
   * @returns a single option.
   */
  abstract flatten(): Option<T>;

  /**
   * Creates a Some value.
   * 
   * @param value the value to wrap in a Some.
   * @returns the Some value.
   */
  public static Some<T>(value: T): Option<T> {
    return new Some(value);
  }

  /**
   * Creates a None value.
   * 
   * @returns a None value.
   */
  public static None<T>(): Option<T> {
    return new None();
  }
}

class Some<T> extends Option<T> {
  constructor (private readonly value: T) { super(); }

  public isSome(): this is Some<T> {
    return true;
  }

  public isNone(): this is None<T> {
    return false;
  }

  public unwrap(): T {
    return this.value;
  }

  public unwrapOrDefault(defaultValue: T): T {
    return this.value;
  }

  public unwrapOrElse(fn: () => T): T {
    return this.value;
  }

  public map<U>(fn: (value: T) => U): Option<U> {
    return Option.Some(fn(this.value));
  }

  public flatMap<U>(fn: (value: T) => Option<U>): Option<U> {
    return fn(this.value);
  }

  public expect(message: string): T {
    return this.value;
  }

  public get(): T | null {
    return this.value;
  }

  public andThen<U>(fn: (value: T) => Option<U>): Option<U> {
    return fn(this.value);
  }

  public filter(predicate: (value: T) => boolean): Option<T> {
    return predicate(this.value) ? this : Option.None();
  }

  public equals(other: Option<T>): boolean {
    return other.isSome() && this.value === other.unwrap();
  }

  public toJSON(): object {
    return { type: "Some", value: this.value };
  }

  public match<U>(onSome: (value: T) => U, onNone: () => U): U {
    return onSome(this.value);
  }

  public flatten(): Option<T> {
    return this.value as any;
  }
}


class None<T> extends Option<T> {
  public isSome(): this is Some<T> {
    return false;
  }

  public isNone(): this is None<T> {
    return true;
  }

  public unwrap(): T {
    throw new Error("Called unwrap on a None value.");
  }

  public unwrapOrDefault(defaultValue: T): T {
    return defaultValue;
  }

  public unwrapOrElse<U>(fn: () => U): U {
    return fn();
  }

  public map<U>(fn: (value: T) => U): Option<U> {
    return Option.None();
  }

  public flatMap<U>(fn: (value: T) => Option<U>): Option<U> {
    return Option.None();
  }

  public expect(message: string): T {
    throw new Error(message);
  }

  public get(): T | null {
    return null;
  }

  public andThen<U>(fn: (value: T) => Option<U>): Option<U> {
    return Option.None();
  }

  public filter(predicate: (value: T) => boolean): Option<T> {
    return Option.None();
  }

  public equals(other: Option<T>): boolean {
    return other.isNone();
  }

  public toJSON(): object {
    return { type: "None" };
  }

  public match<U>(onSome: (value: T) => U, onNone: () => U): U {
    return onNone();
  }

  public flatten(): Option<T> {
    return Option.None();
  }
}