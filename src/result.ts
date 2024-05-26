export abstract class Result<T, E> {
  /**
   * @returns true if the result is an Ok value, false otherwise.
   */
  abstract isOk(): this is Ok<T, E>;
  /**
   * @returns true if the result is an Err value, false otherwise.
   */
  abstract isErr(): this is Err<T, E>;
  /**
   * Unwraps the result, returning the Ok value if the result is an Ok value.
   * Throws an error if the result is an Err value.
   * 
   * @throws an error if the result is an Err value.
   * @returns the Ok value.
   */
  abstract unwrap(): T;
  /**
   * Unwraps the result, returning the Ok value if the result is an Ok value.
   * Otherwise, returns the default value.
   * 
   * @param defaultValue the value to return if the result is an Err value.
   * @returns the Ok value if the result is an Ok value, the default value otherwise.
   * 
   * @example
   * const result = Result.Err(new Error("An error occurred"));
   * 
   * console.log(result.unwrapOr(42)); // 42
   */
  abstract unwrapOrDefault(defaultValue: T): T;
  /**
   * Unwraps the result, returning the Ok value if the result is an Ok value.
   * Otherwise, returns the value from a function.
   * 
   * @param fn the function to call if the result is an Err value.
   * @returns the Ok value if the result is an Ok value, the value from a function otherwise.
   * 
   * @example
   * const result = Result.Err(new Error("An error occurred"));
   * 
   * console.log(result.unwrapOrElse(() => 42)); // 42
   */
  abstract unwrapOrElse(fn: (error: E) => T): T;
  /**
   * Unwraps the result, returning the Ok value if the result is an Ok value.
   * Otherwise, an error is thrown with the given message.
   * 
   * @param message the message to throw if the result is an Err value.
   * @throws an error with the given message if the result is an Err value.
   * @returns the Ok value if the result is an Ok value.
   */
  abstract expect(message: string): T;
  /**
   * @returns the error value if the result is an Err value.
   */
  abstract getErr(): E;
  /**
   * Maps a Result<T, E> to Result<U, E> by applying a function to a contained value.
   * 
   * @param fn the function to apply to the contained value.
   * @returns a Result<U, E> containing the result of applying the function to the contained value.
   */
  abstract map<U>(fn: (value: T) => U): Result<U, E>;
  /**
   * Maps a Result<T, E> to Result<U, E> by applying a function to a contained value and flattening the result.
   * 
   * @param fn the function to apply to the contained value.
   * @returns a Result<U, E> containing the result of applying the function to the contained value.
   */
  abstract flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E>;

  /**
   * Creates an Ok result with the given value.
   * 
   * @param value the value to wrap in an Ok result.
   * @returns the Ok result.
   */
  public static Ok<T, E>(value: T): Result<T, E> {
    return new Ok(value);
  }

  /**
   * Creates an Err result with the given error.
   * 
   * @param error the error to wrap in an Err result.
   * @returns the Err result.
   */
  public static Err<T, E>(error: E): Result<T, E> {
    return new Err(error);
  }
}

class Ok<T, E> extends Result<T, E> {
  constructor(private readonly value: T) { super(); }

  public isOk(): this is Ok<T, E> {
    return true;
  }

  public isErr(): this is Err<T, E> {
    return false;
  }

  public unwrap(): T {
    return this.value;
  }

  public unwrapOrDefault(defaultValue: T): T {
    return this.value;
  }

  public unwrapOrElse(fn: (error: E) => T): T {
    return this.value;
  }

  public expect(message: string): T {
    return this.value;
  }

  public getErr(): E {
    throw new Error("Called getErr on an Ok value.");
  }

  public map<U>(fn: (value: T) => U): Result<U, E> {
    return Result.Ok(fn(this.value));
  }

  public flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    return fn(this.value);
  }
}

class Err<T, E> extends Result<T, E> {
  constructor(private readonly error: E) { super(); }

  public isOk(): this is Ok<T, E> {
    return false;
  }

  public isErr(): this is Err<T, E> {
    return true;
  }

  public unwrap(): T {
    throw new Error("Called unwrap on an error.");
  }

  public unwrapOrDefault(defaultValue: T): T {
    return defaultValue;
  }

  public unwrapOrElse(fn: (error: E) => T): T {
    return fn(this.error);
  }

  public expect(message: string): T {
    throw new Error(message);
  }

  public getErr(): E {
    return this.error;
  }

  public map<U>(fn: (value: T) => U): Result<U, E> {
    return Result.Err(this.getErr());
  }

  public flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    return Result.Err(this.getErr());
  }
}

// /**
//  * A Result type that can be either an Ok value or an Err value.
//  * 
//  * @template T The type of the Ok value.
//  * @template E The type of the Err value.
//  * 
//  * @example
//  * const result = Result.Ok(42);
//  * 
//  * if (result.isOk()) {
//  *  console.log(result.unwrap());
//  * }
//  * 
//  * @example
//  * const result = Result.Err(new Error("An error occurred"));
//  * 
//  * if (result.isErr()) {
//  *  console.error(result.getErr());
//  * }
//  */
// export default class Result<T, E extends Error | null> {
//   private ok: T | null;
//   private error: E | null;

//   constructor(ok: T | null, err: E | null) {
//     if (!ok && !err) throw new Error("Result must have a value or an error.");
//     if (ok && err) throw new Error("Result cannot have both a value and an error.");

//     if (ok !== null) {
//       this.ok = ok;
//       this.error = null;
//     } else {
//       this.error = err as E;
//       this.ok = null;
//     }
//   }

//   /**
//    * Creates an Ok result with the given value.
//    * 
//    * @param value the value to wrap in an Ok result.
//    * @returns the Ok result.
//    * 
//    * @example
//    * const result = Result.Ok(42);
//    * 
//    * if (result.isOk()) {
//    *  console.log(result.unwrap());
//    * }
//    */
//   public static Ok<T>(value: T): Result<T, null> {
//     return new Result(value, null);
//   }

//   /**
//    * Creates an Err result with the given error.
//    * 
//    * @param error the error to wrap in an Err result.
//    * @returns the Err result.
//    * 
//    * @example
//    * const result = Result.Err(new Error("An error occurred"));
//    * 
//    * if (result.isErr()) {
//    *  console.error(result.getErr());
//    * }
//    */
//   public static Err<E extends Error>(error: E): Result<null, E> {
//     return new Result(null, error);
//   }

//   /**
//    * @returns true if the result is an Ok value, false otherwise.
//    */
//   public isOk(): this is Result<T, never> {
//     return this.ok !== null;
//   }

//   /**
//    * @returns true if the result is an Err value, false otherwise.
//    */
//   public isErr(): this is Result<never, E> {
//     return this.error !== null;
//   }

//   /**
//    * @returns the error value if the result is an Err value, null otherwise.
//    */
//   public getErr(): this extends Result<never, E> ? E : E | null {
//     return this.error as E;
//   }

//   /**
//    * Unwraps the result, returning the Ok value if the result is an Ok value.
//    * Throws an error if the result is an Err value.
//    * 
//    * @throws an error if the result is an Err value.
//    * @returns the Ok value.
//    */
//   public unwrap(): T {
//     if (this.isOk()) return this.ok as T;
//     throw new Error(`Called unwrap on an error: ${this.error}`);
//   }

//   /**
//    * Unwraps the result, returning the Ok value if the result is an Ok value.
//    * Otherwise, returns the default value.
//    * 
//    * @param defaultValue the value to return if the result is an Err value.
//    * @returns the Ok value if the result is an Ok value, the default value otherwise.
//    * 
//    * @example
//    * const result = Result.Err(new Error("An error occurred"));
//    * 
//    * console.log(result.unwrapOr(42)); // 42
//    */
//   public unwrapOr(defaultValue: T): T {
//     return this.isOk() ? this.ok as T : defaultValue;
//   }

//   /**
//    * Unwraps the result, returning the Ok value if the result is an Ok value.
//    * Otherwise, an error is thrown with the given message.
//    * 
//    * @param message the message to throw if the result is an Err value.
//    * @throws an error with the given message if the result is an Err value.
//    * @returns the Ok value if the result is an Ok value.
//    */
//   public expect(message: string): T {
//     if (this.isOk()) return this.ok as T;
//     throw new Error(message);
//   }

//   // public map<U>(fn: (value: T) => U): this extends Result<T, never> ? Result<U, null> : Result<never, E> {
//   //   if (this.isOk()) return Result.Ok(fn(this.ok as T));
//   //   return Result.Err(this.error as E);
//   // }
// }